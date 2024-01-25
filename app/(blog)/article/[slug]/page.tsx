// import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import Text from "@/app/ui/text";
import { Metadata, ResolvingMetadata } from "next";

// import styles from "@/app/ui/post.module.css";

import { renderBlock } from "@/app/ui/notion/render";
import { QueryDatabase, getPageFromSlug, getBlocks } from "@/app/api/notion";
import Shell from "@/components/shells/shell";
import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { formatDate } from "@/lib/utils";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate =
  parseInt(process.env.NEXT_REVALIDATE_PAGES || "", 10) || 300; // revalidate the data interval

// export const dynamicParams = true; // true | false,

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const database = await QueryDatabase();
  return database.map((page: any) => {
    const slug = page.properties.Slug?.rich_text[0].plain_text;
    return { slug };
  });
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for this page.
// TODO: add more fields and site name
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  return {
    title: params.slug,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  console.log(params, "environment variables:", revalidate);
  const page: any = await getPageFromSlug(params.slug);
  const blocks = page && (await getBlocks(page.id));

  if (!page || !blocks) {
    return <div />;
  }

  const title = page.properties?.Title.title[0].text.content;

  return (
    <Shell as="article">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {page.last_edited_time && (
            <time dateTime={page.last_edited_time}>
              {formatDate(page.last_edited_time)}
            </time>
          )}
          {/* {page.last_edited_time ? <div>•</div> : null} */}
          {/* <div>{post.readingTime}min</div> */}
        </div>
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {title}
          {/* <Text title={page.properties.Title?.title} /> */}
        </h1>
      </div>

      {/* <Separator className="mb-2.5" /> */}
      {/* <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
      {/* <React.Suspense
          fallback={Array.from({ length: 4 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        > */}
      {/* <div> */}
      {/* <article className={styles.container}> */}

      <section>
        {blocks.map((block: any) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </section>
      {/* </div> */}

      {/* </React.Suspense> */}
      {/* </section> */}
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" })
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        See all posts
        <span className="sr-only">See all posts</span>
      </Link>
    </Shell>
  );
}
