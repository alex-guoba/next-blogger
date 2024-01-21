import type { FooterItem, MainNavItem } from "@/types"

// import { productCategories } from "@/config/products"
// import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: "https://twitter.com/gelco",
  github: "https://github.com/alex-guoba",
  githubAccount: "https://github.com/alex-guoba",
}

export const siteConfig = {
  name: "Utopian",
  description:
    "An open source blog build with everything new in Next.js.",
  url: "https://skateshop.sadmn.com",
  ogImage: "https://skateshop.sadmn.com/opengraph-image.png",
  links,
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
          href: "/project",
          description: "About the project behind Utopian.",
          items: [],
        },
        {
          title: "Author",
          href: "/author",
          description: "About author of Utopian.",
          items: [],
        },
      ],
    },
    // ...productCategories.map((category) => ({
    //   title: category.title,
    //   items: [
    //     {
    //       title: "All",
    //       href: `/categories/${slugify(category.title)}`,
    //       description: `All ${category.title}.`,
    //       items: [],
    //     },
    //     ...category.subcategories.map((subcategory) => ({
    //       title: subcategory.title,
    //       href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
    //       description: subcategory.description,
    //       items: [],
    //     })),
    //   ],
    // })),
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
          href: "/pages/about",
          external: false,
        },
        {
          title: "Privacy",
          href: "/pages/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
      ],
    },
    // {
    //   title: "Lofi",
    //   items: [
    //     {
    //       title: "beats to study to",
    //       href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    //       external: true,
    //     },
    //     {
    //       title: "beats to chill to",
    //       href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
    //       external: true,
    //     },
    //     {
    //       title: "a fresh start",
    //       href: "https://www.youtube.com/watch?v=rwionZbOryo",
    //       external: true,
    //     },
    //     {
    //       title: "coffee to go",
    //       href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
    //       external: true,
    //     },
    //   ],
    // },
  ] satisfies FooterItem[],
}
