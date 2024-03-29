import Link from "next/link";
import { Metadata } from "next";

import { RenderBlock } from "@/app/notion/render";
// import { QueryDatabase } from "@/app/notion/api";
import Shell from "@/components/shells/shell";
import React, { cache } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
// import { Separator } from "@/components/ui/separator";

import { siteMeta } from "@/config/meta";
import { filterBase, filterSelect, filterText, rawText } from "@/app/notion/block-parse";
import { notFound } from "next/navigation";
import { env } from "@/env.mjs";
import { ContentLoadingSkeleton } from "@/components/post-skeleton";
import { NotionApiCache } from "@/app/notion/cache";

export const revalidate = env.REVALIDATE_PAGES; // revalidate the data interval

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
// export const revalidate = parseInt(process.env.NEXT_REVALIDATE_PAGES || "", 10) || 60; // revalidate the data interval
// // export const dynamic = 'force-dynamic';
// // export const revalidate = 0;
// // export const dynamicParams = true; // true | false,
/**
 * If you want to enable static rendering, uncommment the following function
 */
// export async function generateStaticParams() {
//   const database = await QueryDatabase(env.NOTION_DATABASE_ID);
//   return database.map((page: any) => {
//     const slug = [page.id];
//     return { slug };
//   });
// }

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
      url: siteMeta.siteUrl + "/" + params.slug.join("/"),
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

    const posts = await NotionApiCache.QueryDatabase(env.NOTION_DATABASE_ID, params);
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
  const blocks = await NotionApiCache.RetrieveBlockChildren(pageID);
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
  const { pageID, title, summary } = await filterPageBySlug(params.slug[0]);
  if (!pageID || !title) {
    console.log("page not found or unpublished", pageID, title);
    return notFound();
  }

  return (
    <Shell as="article" className="relative flex min-h-screen flex-col">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription size="sm" className="text-center">
          {summary}
        </PageHeaderDescription>
      </PageHeader>

      <React.Suspense fallback={<ContentLoadingSkeleton></ContentLoadingSkeleton>}>
        <ContentRender pageID={pageID}></ContentRender>
      </React.Suspense>

      <Link href="/" className={cn(buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" }))}>
        <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        See all posts
        <span className="sr-only">See all posts</span>
      </Link>
    </Shell>
  );
}
