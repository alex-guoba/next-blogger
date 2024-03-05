// import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { Metadata } from "next";

import { renderBlock } from "@/app/notion/render";
import { QueryDatabase, queryPageBySlug, retrieveBlockChildren, retrievePage } from "@/app/notion/api";
import Shell from "@/components/shells/shell";
import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { formatDate } from "@/lib/utils";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

import { env } from "@/env.mjs";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = parseInt(process.env.NEXT_REVALIDATE_PAGES || "", 10) || 300; // revalidate the data interval

// export const dynamicParams = true; // true | false,

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const database = await QueryDatabase(env.NOTION_DATABASE_ID);
  return database.map((page: any) => {
    const slug = [page.properties.Slug?.rich_text[0].plain_text];
    return { slug };
  });
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for this page.
// TODO: add more fields and site name
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  return {
    title: params.slug,
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  console.log(params, "environment variables:", revalidate);
  console.log(params, "page params:", params);

  let pageID, lastEditTime, title;

  // retrieve page meta info by page ID
  if (params.slug.length > 1) {
    pageID = params.slug[1];

    const page: any = await retrievePage(pageID);
    if (!page) {
      return <div />;
    }
    lastEditTime = page?.last_edited_time;
    title = page?.properties?.title?.title[0].plain_text;
  } else {
    // query from database by slug
    const page: any = await queryPageBySlug(env.NOTION_DATABASE_ID, params.slug[0]);
    if (!page) {
      return <div />;
    }
    pageID = page.id;
    title = page.properties?.Title.title[0].plain_text;
    lastEditTime = page.last_edited_time;
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

      <section className="w-full flex flex-col gap-y-0.5">
        {blocks.map((block: any) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
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
