import type { MainNavItem } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  mainNav: [
    {
      id: "Articles",
      items: [
        {
          id: "Tags",
          href: "/tags",
          items: [],
        },
        {
          id: "MDX",
          href: "/page/mdx",
          items: [],
        },
      ],
    },
    {
      id: "Notes",
      href: "/notes",
    },
    {
      id: "Project",
      href: "/project",
    },
    {
      id: "IndieDev",
      href: "/page/indiehackers",
    },
    {
      id: "About",
      href: "/page/about",
    },
  ] satisfies MainNavItem[],
};
