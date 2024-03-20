import Link from "next/link";
import { Metadata } from "next";

import { RenderBlock } from "@/app/notion/render";
import { retrieveBlockChildren, retrievePage } from "@/app/notion/api";
import Shell from "@/components/shells/shell";
import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { formatDate } from "@/lib/utils";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
// import { Separator } from "@/components/ui/separator";

import { siteMeta } from "@/config/meta";
import { pagePublished, rawText } from "@/app/notion/block-parse";
import { notFound } from "next/navigation";
import { env } from "@/env.mjs";
import { ContentLoadingSkeleton } from "@/components/post-skeleton";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = env.REVALIDATE_PAGES; // revalidate the data interval
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
  const pageInfo = await parseSlug(params.slug);

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

async function parseSlug(slug: string[]) {
  let pageID, lastEditTime, title, summary;
  if (slug.length >= 1) {
    pageID = slug[0];

    const page: any = await retrievePage(pageID);
    if (page && pagePublished(page)) {
      summary = rawText(page?.properties?.Summary?.rich_text);
      // May be linked from child-page not in database list which still have a default title property
      title = rawText(page?.properties?.Title?.title || page?.properties?.title?.title);
      lastEditTime = page?.properties?.PublishDate?.date?.start || page?.last_edited_time;
    }
  }
  return { pageID, lastEditTime, title, summary };
}

async function ContentRender({ pageID }: { pageID: string }) {
  const blocks = await retrieveBlockChildren(pageID);
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
  const { pageID, lastEditTime, title } = await parseSlug(params.slug);
  if (!pageID || !title) {
    console.log("Post not found or unpublished", pageID, title);
    return notFound();
  }

  return (
    <Shell as="article" className="relative flex min-h-screen flex-col">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription size="sm" className="text-center">
          {formatDate(lastEditTime)}
        </PageHeaderDescription>
      </PageHeader>
      {/* <Separator className="mb-2.5" /> */}

      <React.Suspense fallback={<ContentLoadingSkeleton></ContentLoadingSkeleton>}>
        <ContentRender pageID={pageID}></ContentRender>
      </React.Suspense>
      {/* <section className="flex w-full flex-col gap-y-0.5 mt-8">
        {blocks.map((block: any) => (
          <RenderBlock key={block.id} block={block}></RenderBlock>
        ))}
      </section> */}
      {/* </div> */}

      {/* </React.Suspense> */}
      {/* </section> */}
      <Link href="/" className={cn(buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" }))}>
        <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        See all posts
        <span className="sr-only">See all posts</span>
      </Link>
    </Shell>
  );
}
