import Link from "next/link";
import { Metadata } from "next";

import { RenderBlock } from "@/app/notion/render";
import Shell from "@/components/shells/shell";
import React, { cache } from "react";
import { absoluteUrl, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { formatDate } from "@/lib/utils";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";

import { siteMeta } from "@/config/meta";
import { pagePublished, rawText } from "@/app/notion/block-parse";
import { notFound } from "next/navigation";
import { env } from "@/env.mjs";
import { ContentLoadingSkeleton } from "@/components/post-skeleton";
import { ArticlePost, dbQueryParams } from "@/app/notion/fitler";
import { getTableOfContents } from "@/app/notion/toc";
import { DashboardTableOfContents } from "@/components/layouts/toc";
import { ShareBar } from "@/components/share-bar";
import { logger } from "@/lib/logger";
import { CacheQueryDatabase, CacheRetrievePage, CacheRetrieveBlockChildren } from "@/app/notion/api/cache-wrapper";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
// export const revalidate = env.REVALIDATE_PAGES; // revalidate the data interval

/**
 * SSG for Homepage
 */
export async function generateStaticParams() {
  const queryParams = dbQueryParams(env.NOTION_DATABASE_ID, ArticlePost);
  const posts = await CacheQueryDatabase(env.NOTION_DATABASE_ID, queryParams);

  const subpost = posts.slice(0, env.POST_PAGE_SIZES);

  return subpost.map((page) => {
    const slug = [page.id];
    return { slug };
  });
}

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
      url: absoluteUrl("/article/" + params.slug.join("/"), headers()),
      // image: pageInfo.cover,
    },
    twitter: {
      card: "summary_large_image",
      title: pageInfo.title,
      description: pageInfo.summary,
    },
  };
}

const parseSlug = cache(async (slug: string[]) => {
  let pageID, lastEditTime, title, summary;
  if (slug.length >= 1) {
    pageID = slug[0];

    const page: any = await CacheRetrievePage(pageID);
    if (page && pagePublished(page)) {
      summary = rawText(page?.properties?.Summary?.rich_text);
      // May be linked from child-page not in database list which still have a default title property
      title = rawText(page?.properties?.Title?.title || page?.properties?.title?.title);
      lastEditTime = page?.properties?.PublishDate?.date?.start || page?.last_edited_time;
    }
  }
  return { pageID, lastEditTime, title, summary };
});

export default async function Page({ params }: { params: { slug: string[]; locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const { pageID, lastEditTime, title } = await parseSlug(params.slug);
  if (!pageID || !title) {
    logger.info(`Post not found or unpublished ${pageID} ${title}`);
    return notFound();
  }
  const blocks = await CacheRetrieveBlockChildren(pageID);
  if (!blocks) {
    return <div />;
  }
  const url = absoluteUrl("/article/" + params.slug.join("/"), headers());

  const toc = getTableOfContents(blocks);
  const has_toc = toc.items.length > 0;

  const t = await getTranslations("Posts");

  return (
    <section className={cn("lg:gap-8 xl:grid", has_toc ? "xl:grid-cols-[1fr_400px]" : "")}>
      <Shell
        as="article"
        className={cn("relative mx-auto flex min-h-screen flex-col", has_toc ? "xl:pl-[250px]" : "xl:px-[100px]")}
      >
        <PageHeader>
          <PageHeaderHeading>{title}</PageHeaderHeading>
          <PageHeaderDescription size="sm" className="pt-4 text-center">
            {formatDate(lastEditTime)}
          </PageHeaderDescription>
        </PageHeader>

        <React.Suspense fallback={<ContentLoadingSkeleton></ContentLoadingSkeleton>}>
          <section className="mt-8 flex w-full flex-col gap-y-0.5">
            {blocks.map((block: any) => (
              <RenderBlock key={block.id} block={block}></RenderBlock>
            ))}
          </section>
        </React.Suspense>

        <ShareBar url={url} title={title} image={absoluteUrl(siteMeta.socialBanner, headers())}></ShareBar>

        <Link href="/" className={cn(buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" }))}>
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
