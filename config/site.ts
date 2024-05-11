import type { MainNavItem } from "@/types";


export type SiteConfig = typeof siteConfig;

export const siteConfig = {

  mainNav: [
    {
      title: "Articles",
      items: [
        {
          title: "Tags",
          href: "/tags",
          description: "All the posts group by tag.",
          items: [],
        },
        {
          title: "Saas Templates",
          href: "/page/mdx",
          description: "Use MDX in Notion to build your own SaaS templates.",
          items: [],
        },
      ],
    },
    {
      title: "BookNotes",
      href: "/notes",
    },
    {
      title: "Project",
      href: "/project",
    },
    {
      title: "About",
      href: "/page/about",
    },
  ] satisfies MainNavItem[],
  // footerNav: [
  //   {
  //     title: "Credits",
  //     items: [
  //       {
  //         title: "Taxonomy",
  //         href: "https://tx.shadcn.com/",
  //         external: true,
  //       },
  //       {
  //         title: "shadcn/ui",
  //         href: "https://ui.shadcn.com",
  //         external: true,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Help",
  //     items: [
  //       {
  //         title: "About",
  //         href: "/page/about",
  //         external: false,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Social",
  //     items: [
  //       {
  //         title: "Twitter",
  //         href: siteMeta.twitter,
  //         external: true,
  //       },
  //       {
  //         title: "GitHub",
  //         href: siteMeta.github,
  //         external: true,
  //       },
  //     ],
  //   },
  // ] satisfies FooterItem[],
};
