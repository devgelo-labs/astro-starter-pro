import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import remarkReadingTime from "remark-reading-time";

export default defineConfig({
  site: "https://astrostarterpro.com/",
  integrations: [sitemap(), icon(), mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkReadingTime,
        () => {
          return function (_tree, file) {
            file.data.astro.frontmatter.minutesRead =
              file.data.readingTime.minutes;
          };
        },
      ],
    }),
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
