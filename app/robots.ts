import { type MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/utils";

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#static-robotstxt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
