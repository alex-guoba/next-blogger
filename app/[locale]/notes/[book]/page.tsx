import Link from "next/link";
import { Metadata } from "next";

import { RenderBlock } from "@/app/notion/render";
import Shell from "@/components/shells/shell";
import React, { cache } from "react";
import { absoluteUrl, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";

import { siteMeta } from "@/config/meta";
import { rawText } from "@/app/notion/block-parse";
import { notFound } from "next/navigation";
import { env } from "@/env.mjs";
import { ContentLoadingSkeleton } from "@/components/post-skeleton";
import { noteDbQueryParams } from "@/app/notion/fitler";
import { getTableOfContents } from "@/app/notion/toc";
import { DashboardTableOfContents } from "@/components/layouts/toc";
import { ShareBar } from "@/components/share-bar";
import { logger } from "@/lib/logger";
import { CacheQueryDatabase, CacheRetrievePage, CacheRetrieveBlockChildren } from "@/app/notion/api/cache-wrapper";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
// export const revalidate = env.REVALIDATE_PAGES; // revalidate the data interval

/**
 * SSG for Homepage
 */
export async function generateStaticParams() {
  if (!env.NOTION_NOTE_DATABASE_ID) {
    return [];
  }
  const queryParams = noteDbQueryParams(env.NOTION_NOTE_DATABASE_ID);
  const posts = await CacheQueryDatabase(env.NOTION_NOTE_DATABASE_ID, queryParams);

  const subpost = posts.slice(0, env.POST_PAGE_SIZES);

  return subpost.map((page) => {
    const book = page.id;
    return { book };
  });
}

type Props = {
  params: { book: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for this page.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageInfo = await parseBook(params.book);

  return {
    title: pageInfo.title,
    description: pageInfo.title,

    openGraph: {
      description: pageInfo.intro,
      type: "article",
      url: absoluteUrl("/notes/" + params.book),
      // image: pageInfo.cover,
    },
    twitter: {
      card: "summary_large_image",
      title: pageInfo.title,
      description: pageInfo.intro,
    },
  };
}

const parseBook = cache(async (book: string) => {
  let pageID, title, author, category, intro, url, rating, note_count, review_count;
  pageID = book;

  const page: any = await CacheRetrievePage(pageID);
  if (page && page?.properties?.Published?.select?.name == "Y") {
    // May be linked from child-page not in database list which still have a default title property
    title = rawText(page?.properties?.BookName?.title || page?.properties?.title?.title);
    author = rawText(page?.properties?.Author?.rich_text);
    category = rawText(page?.properties?.Category?.rich_text);
    intro = rawText(page?.properties?.Intro?.rich_text);
    url = page?.properties?.URL?.url;
    rating = page?.properties?.Rating?.number;
    note_count = page?.properties?.NoteCount?.number;
    review_count = page?.properties?.ReviewCount?.number;
  } else {
    pageID = null;
  }

  return { pageID, title, author, category, intro, url, rating, note_count, review_count };
});

function BookDetail({
  author,
  category,
  url,
  rating,
  note_count,
  review_count,
}: {
  author?: string;
  category?: string;
  url?: string;
  rating?: number;
  note_count?: number;
  review_count?: number;
}) {
  return (
    <Table className="border border-solid border-inherit">
      <TableBody>
        <TableRow>
          <TableCell className="w-1/12 bg-secondary">作者</TableCell>
          <TableCell className="w-5/12">{author}</TableCell>
          <TableCell className="w-1/12 bg-secondary">分类</TableCell>
          <TableCell>{category}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-1/12 bg-secondary">推荐值</TableCell>
          <TableCell className="w-5/12">{rating && rating * 100} %</TableCell>
          <TableCell className="w-1/12 bg-secondary">来源</TableCell>
          <TableCell>
            {url && (
              <Link href={url} prefetch={false} className="text-gray-500 underline decoration-1 underline-offset-4">
                微信读书
              </Link>
            )}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-1/12 bg-secondary">笔记数量</TableCell>
          <TableCell className="w-5/12">{note_count}</TableCell>
          <TableCell className="w-1/12 bg-secondary">评论数量</TableCell>
          <TableCell> {review_count} </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default async function Page({ params }: { params: { book: string; locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const { pageID, title, author, category, url, intro, rating, note_count, review_count } = await parseBook(
    params.book
  );
  if (!pageID || !title) {
    logger.info(`Post not found ${pageID} ${title}`);
    return notFound();
  }
  const blocks = await CacheRetrieveBlockChildren(pageID);
  if (!blocks) {
    return <div />;
  }
  const share_url = absoluteUrl("/notes/" + params.book);

  const toc = getTableOfContents(blocks);
  const has_toc = toc.items.length > 0;

  const t = await getTranslations("Notes");

  return (
    <section className={cn("lg:gap-8 xl:grid", has_toc ? "xl:grid-cols-[1fr_400px]" : "")}>
      <Shell
        as="article"
        className={cn(
          "relative mx-auto flex min-h-screen flex-col items-start",
          has_toc ? "xl:pl-[250px]" : "xl:px-[100px]"
        )}
      >
        <PageHeader>
          <PageHeaderHeading>{title}</PageHeaderHeading>
        </PageHeader>
        <BookDetail
          author={author}
          category={category}
          url={url}
          rating={rating}
          note_count={note_count}
          review_count={review_count}
        ></BookDetail>

        {intro && <div className="pt-2 text-muted-foreground">简介：{intro}</div>}

        <React.Suspense fallback={<ContentLoadingSkeleton></ContentLoadingSkeleton>}>
          <section className="mt-4 flex w-full flex-col gap-y-0.5">
            {blocks.map((block: any) => (
              <RenderBlock key={block.id} block={block}></RenderBlock>
            ))}
          </section>
        </React.Suspense>

        <ShareBar url={share_url} title={title} image={absoluteUrl(siteMeta.socialBanner)}></ShareBar>

        <Link href="/notes" className={cn(buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" }))}>
          <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          {t("SeeAllButtonLabel")}
          <span className="sr-only">{t("SeeAllButtonLabel")}</span>
        </Link>
      </Shell>

      {has_toc && (
        <aside className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pb-5 pt-10">
            <DashboardTableOfContents toc={toc} />
          </div>
        </aside>
      )}
    </section>
  );
}
