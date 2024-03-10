import { siteMeta } from "@/config/meta";
import type { Metadata } from "next";

export function defaultMeta(): Metadata {
  const metadata: Metadata = {
    metadataBase: new URL(siteMeta.siteUrl),
    title: {
      default: siteMeta.title,
      template: `%s | ${siteMeta.title}`,
    },
    description: siteMeta.description,
    keywords: ["nextjs", "notion"],
    creator: siteMeta.author,
    authors: [
      {
        name: siteMeta.author,
        url: siteMeta.github,
      },
    ],
    openGraph: {
      title: {
        default: siteMeta.title,
        template: `%s | ${siteMeta.title}`,
      },
      description: siteMeta.description,
      url: "./",
      siteName: siteMeta.title,
      images: [siteMeta.socialBanner],
      locale: siteMeta.locale,
      type: "website",
    },

    twitter: {
      title: {
        default: siteMeta.title,
        template: `%s | ${siteMeta.title}`,
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
