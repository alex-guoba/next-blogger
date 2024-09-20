import { siteMeta } from "@/config/meta";
import type { Metadata } from "next";
import { env } from "@/env.mjs";

import { getTranslations } from "next-intl/server";

export async function defaultMeta(locale: string): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "Meta",
  });
  const title = env.SITE_TITLE || t("Title");
  const metadata: Metadata = {
    metadataBase: new URL(siteMeta.siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: t("Description"),
    keywords: ["Next.js", "Notion", "Blog", "SEO", "Next SEO"],
    creator: siteMeta.author,
    authors: [
      {
        name: siteMeta.author,
        url: siteMeta.github,
      },
    ],
    openGraph: {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description: t("Description"),
      url: "./",
      siteName: title,
      images: [siteMeta.socialBanner],
      locale: locale,
      type: "website",
    },

    twitter: {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      card: "summary_large_image",
      images: [siteMeta.socialBanner],
      creator: siteMeta.twitter,
    },

    icons: {
      icon: siteMeta.siteLogo,
    },

    // alternates: {
    //   canonical: './',
    //   types: {
    //     'application/rss+xml': `${siteMeta.siteUrl}/feed.xml`,
    //   },
    // },
    // robots: {
    //   index: true,
    //   follow: true,
    //   googleBot: {
    //     index: true,
    //     follow: true,
    //     'max-video-preview': -1,
    //     'max-image-preview': 'large',
    //     'max-snippet': -1,
    //   },
    // },
  };

  return metadata;
}
