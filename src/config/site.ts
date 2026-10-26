import ogImage from "@/assets/og-image.png";

export const siteConfig = {
  name: "Astro Starter Pro",
  description:
    "Starter template optimized for SEO and performance. A solid foundation to start your projects with best practices.",
  url: "https://astrostarterpro.com",
  lang: "en",
  locale: "en_US",
  author: "Devgelo",
  twitter: "@Devgelo",
  ogImage: ogImage,
  socialLinks: {
    twitter: "https://twitter.com",
    github: "https://github.com/devgelo-labs/astro-starter-pro",
    discord: "https://discord.com",
  },
  navLinks: [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Pricing", href: "/pricing" },
    { text: "Blog", href: "/blog" },
    { text: "Contact", href: "/contact" },
    { text: "Widgets", href: "/widgets" },
    {
      text: "Templates",
      href: "/templates",
      links: [
        { text: "Personal Portfolio", href: "/templates/portfolio" },
        { text: "SaaS Landing", href: "/templates/saas" },
        { text: "Agency", href: "/templates/agency" },
      ],
    },
  ],
};
