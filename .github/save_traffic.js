import fs from "node:fs";

async function saveTraffic() {
  const token = process.env.GRAPH_TOKEN?.trim();
  if (!token) throw new Error("GRAPH_TOKEN is not set");
  if (/\s/.test(token))
    throw new Error("GRAPH_TOKEN contains whitespace or line breaks");
  const repo =
    process.env.GITHUB_REPOSITORY || "devgelo-labs/astro-starter-pro";
  const filePath = "./.github/data/clones.json";

  const response = await fetch(
    `https://api.github.com/repos/${repo}/traffic/clones`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    const hint =
      response.status === 401
        ? " (GRAPH_TOKEN is invalid or expired)"
        : response.status === 403
          ? " (GRAPH_TOKEN lacks Administration: read permission)"
          : "";
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}${hint}`,
    );
  }

  const apiData = await response.json();

  let localData = { count: 0, uniques: 0, clones: [] };

  // 1. Si el archivo ya existe, leerlo
  if (fs.existsSync(filePath)) {
    try {
      localData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {
      console.warn(
        "⚠️ Warning: Error reading existing clones.json, starting fresh.",
      );
    }
  }

  // 2. Unir (Merge) los clones nuevos con los viejos sin duplicar fechas
  const combinedClones = [...localData.clones];

  apiData.clones.forEach((newClone) => {
    const index = combinedClones.findIndex(
      (c) => c.timestamp === newClone.timestamp,
    );
    if (index !== -1) {
      // Si el día ya existe, actualizamos los números (por si subieron durante el día)
      combinedClones[index] = newClone;
    } else {
      // Si el día es nuevo, lo agregamos
      combinedClones.push(newClone);
    }
  });

  // 3. Ordenar por fecha y actualizar totales globales
  combinedClones.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const totalCount = combinedClones.reduce((sum, c) => sum + c.count, 0);
  const totalUniques = combinedClones.reduce((sum, c) => sum + c.uniques, 0);

  const finalData = {
    count: totalCount,
    uniques: totalUniques,
    clones: combinedClones,
  };

  if (!fs.existsSync("./.github/data"))
    fs.mkdirSync("./.github/data", { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2));

  console.log(
    `✅ Historial actualizado: ${combinedClones.length} días registrados.`,
  );
}

saveTraffic().catch((err) => {
  console.error(err);
  process.exit(1);
});
