// import Link from "next/link";

// import { QueryDatabase } from "@/app/notion/api";
import "@/app/styles/globals.css";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header";
// import { Separator } from "@/components/ui/separator";
import React from "react";
import { env } from "@/env.mjs";
import { PostPagination } from "@/components/pagination";
import { PostCardLayout } from "@/components/layouts/list-postcard";
import { NotionApiCache } from "@/app/notion/cache";
import { ArticleProject, dbQueryParams } from "@/app/notion/fitler";

export const revalidate = env.REVALIDATE_PAGES; // revalidate the data interval

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  const queryParams = dbQueryParams(env.NOTION_DATABASE_ID, ArticleProject);
  const posts = await NotionApiCache.QueryDatabase(env.NOTION_DATABASE_ID, queryParams);
  const total = posts.length;

  const page = Number(searchParams["page"]) || 1;
  const subpost = posts.slice((page - 1) * env.POST_PAGE_SIZES, page * env.POST_PAGE_SIZES);

  return (
    <Shell variant="centered" className="md:pb-10">
      <PageHeader>
        <PageHeaderHeading size="lg" className="text-center">
          Project
        </PageHeaderHeading>
        <PageHeaderDescription size="xs" className="py-4">
          Showcase your project.
        </PageHeaderDescription>
      </PageHeader>
      <PostCardLayout items={subpost}></PostCardLayout>
      {total > env.POST_PAGE_SIZES ? (
        <PostPagination total={total} pageSize={env.POST_PAGE_SIZES}></PostPagination>
      ) : null}
    </Shell>
  );
}
