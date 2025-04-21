import { Metadata } from "next";

import { RenderBlock } from "@/app/notion/render";
import Shell from "@/components/shells/shell";
import React, { cache } from "react";
import { filterBase, filterSelect, filterText, rawText } from "@/app/notion/block-parse";
import { notFound } from "next/navigation";
import { env } from "@/env.mjs";
import { ContentLoadingSkeleton } from "@/components/post-skeleton";
import { CacheQueryDatabase, CacheRetrieveBlockChildren } from "@/app/notion/api/cache-wrapper";
import { logger } from "@/lib/logger";
import { absoluteUrl } from "@/lib/utils";
import { headers } from "next/headers";

export const revalidate = env.REVALIDATE_PAGES; // revalidate the data interval

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for this page.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageInfo = await filterPageBySlug(params.slug[0]);

  return {
    title: pageInfo.title,
    description: pageInfo.summary,

    openGraph: {
      description: pageInfo.summary,
      type: "article",
      url: absoluteUrl("/page/" + params.slug.join("/"), headers()),
      // image: pageInfo.cover,
    },
    twitter: {
      card: "summary_large_image",
      title: pageInfo.title,
      description: pageInfo.summary,
    },
  };
}

function slugParam(slug: string) {
  const defaultParam = filterBase(env.NOTION_DATABASE_ID);
  const filters = {
    filter: {
      and: [
        filterSelect("Status", "Published").filter,
        filterSelect("Type", "Page").filter,
        filterText("Slug", slug).filter,
      ],
    },
  };

  return { ...defaultParam, ...filters };
}

// cache: If your arguments are not primitives (ex. objects, functions, arrays), ensure you’re passing the same object reference.
const filterPageBySlug = cache(async (slug: string) => {
  const info = {
    pageID: "",
    lastEditTime: "",
    title: "",
    summary: "",
  };

  if (slug) {
    const params = slugParam(slug);

    const posts = await CacheQueryDatabase(env.NOTION_DATABASE_ID, params);
    if (posts.length == 0) {
      return info;
    }
    const post: any = posts[0];

    info.pageID = post?.id;
    info.summary = rawText(post.properties?.Summary?.rich_text);
    info.title = rawText(post?.properties?.Title?.title || post?.properties?.title?.title);
    info.lastEditTime = post?.properties?.PublishDate?.date?.start || post?.last_edited_time;
  }
  return info;
});

async function ContentRender({ pageID }: { pageID: string }) {
  const blocks = await CacheRetrieveBlockChildren(pageID);
  if (!blocks) {
    return <div />;
  }

  return (
    <section className="mt-8 flex w-full flex-col gap-y-0.5">
      {blocks.map((block: any) => (
        <RenderBlock key={block.id} block={block}></RenderBlock>
      ))}
    </section>
  );
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  // retrieve page meta info by page ID
  const { pageID, title } = await filterPageBySlug(params.slug[0]);
  if (!pageID || !title) {
    logger.info(`page not found or unpublished ${pageID} ${title}`);
    return notFound();
  }

  return (
    <Shell as="article" className="relative flex min-h-screen flex-col">
      <React.Suspense fallback={<ContentLoadingSkeleton></ContentLoadingSkeleton>}>
        <ContentRender pageID={pageID}></ContentRender>
      </React.Suspense>
    </Shell>
  );
}
