import type { FooterItem, MainNavItem } from "@/types";

// import { productCategories } from "@/config/products"
// import { slugify } from "@/lib/utils"

import { siteMeta } from "./meta";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  // name: "Utopian",
  // description: "An open source blog build with everything new in Next.js.",
  // links,
  mainNav: [
    {
      title: "Utopian",
      items: [
        {
          title: "Tags",
          href: "/tags",
          description: "All the products we have to offer.",
          items: [],
        },
        {
          title: "Recent",
          href: "/recent",
          description: "Build your own custom skateboard.",
          items: [],
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          title: "Project",
          href: "/page/project",
          description: "About the project behind Utopian.",
          items: [],
        },
        {
          title: "Author",
          href: "/page/author",
          description: "About author of Utopian.",
          items: [],
        },
      ],
    },
    {
      title: "Contact",
      href: "/page/contact",
    },
  ] satisfies MainNavItem[],
  footerNav: [
    {
      title: "Credits",
      items: [
        {
          title: "Taxonomy",
          href: "https://tx.shadcn.com/",
          external: true,
        },
        {
          title: "shadcn/ui",
          href: "https://ui.shadcn.com",
          external: true,
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/page/about",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Twitter",
          href: siteMeta.twitter,
          external: true,
        },
        {
          title: "GitHub",
          href: siteMeta.github,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
