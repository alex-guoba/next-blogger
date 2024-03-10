// import Head from "next/head";
import Link from "next/link";
// import { Fragment } from "react";
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
import { Separator } from "@/components/ui/separator";

// import { env } from "@/env.mjs";
import { siteMeta } from "@/config/meta";
import { rawText } from "@/app/notion/block-parse";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = parseInt(process.env.NEXT_REVALIDATE_PAGES || "", 10) || 300; // revalidate the data interval
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// export const dynamicParams = true; // true | false,

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const database = await QueryDatabase(env.NOTION_DATABASE_ID);
//   return database.map((page: any) => {
//     const slug = [page.properties.Slug?.rich_text[0].plain_text];
//     return { slug };
//   });
// }

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for this page.
// TODO: add more fields and site name
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
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
    if (page) {
      lastEditTime = page?.last_edited_time;
      summary = rawText(page?.properties?.Summary?.rich_text);
      // May be linked from child-page not in database list which still have a default title property
      title = rawText(page?.properties?.Title?.title || page?.properties?.title?.title);
    }
  }
  return { pageID, lastEditTime, title, summary };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  // retrieve page meta info by page ID
  const { pageID, lastEditTime, title } = await parseSlug(params.slug);
  if (!pageID || !title) {
    console.log("empty page", pageID, title);
    return <div />;
  }

  const blocks = await retrieveBlockChildren(pageID);
  if (!blocks) {
    return <div />;
  }

  return (
    <Shell as="article" className="relative flex min-h-screen flex-col">
      <PageHeader>
        <PageHeaderDescription variant="sm">{formatDate(lastEditTime)}</PageHeaderDescription>
        <PageHeaderHeading>{title}</PageHeaderHeading>
      </PageHeader>
      <Separator className="mb-2.5" />

      <section className="flex w-full flex-col gap-y-0.5">
        {blocks.map((block: any) => (
          <RenderBlock key={block.id} block={block}></RenderBlock>
        ))}
      </section>
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
