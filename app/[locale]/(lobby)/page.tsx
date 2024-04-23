// import Link from "next/link";

import "@/app/styles/globals.css";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { env } from "@/env.mjs";
import { PostPagination } from "@/components/pagination";
// import { PostCardLayout } from "@/components/layouts/list-postcard";
import { PostRowsLayout } from "@/components/layouts/list-post-row";
import { CacheQueryDatabase } from "../../notion/api/cache-wrapper";
import { TagFooter } from "@/components/tag-footer";
import { ArticlePost, dbQueryParams } from "../../notion/fitler";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  const queryParams = dbQueryParams(env.NOTION_DATABASE_ID, ArticlePost);
  const posts = await CacheQueryDatabase(env.NOTION_DATABASE_ID, queryParams);
  const total = posts.length;

  const page = Number(searchParams["page"]) || 1;
  const subpost = posts.slice((page - 1) * env.POST_PAGE_SIZES, page * env.POST_PAGE_SIZES);

  const t = await getTranslations("Posts");

  return (
    <Shell className="md:pb-10">
      <PageHeader>
        <PageHeaderHeading>{t("Title")}</PageHeaderHeading>
        <PageHeaderDescription>{t("Description")}</PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <PostRowsLayout items={subpost} className="gap-4 md:grid-cols-2" gridClassName="py-8 bg-muted"></PostRowsLayout>
      {/* <Separator className="mt-10" /> */}
      <PostPagination total={total} pageSize={env.POST_PAGE_SIZES}></PostPagination>
      {page == 1 && <TagFooter posts={posts}></TagFooter>}
    </Shell>
  );
}
