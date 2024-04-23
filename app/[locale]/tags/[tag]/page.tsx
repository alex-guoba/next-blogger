// import Link from "next/link";

// import { QueryDatabase } from "@/app/notion/api";
import "@/app/styles/globals.css";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
// import { Separator } from "@/components/ui/separator";
import React from "react";
import { filterBase, filterMultiSelect, filterSelect, sorterProperties } from "@/app/notion/block-parse";
import { env } from "@/env.mjs";
import { PostPagination } from "@/components/pagination";
import { PostRowsLayout } from "@/components/layouts/list-post-row";
import { CacheQueryDatabase } from "@/app/notion/api/cache-wrapper";
import { Separator } from "@/components/ui/separator";
// import { PostCardLayout } from "@/components/layouts/list-postcard";

export const revalidate = env.REVALIDATE_PAGES; // revalidate the data interval

function dbParams(tag: string) {
  const defaultParam = filterBase(env.NOTION_DATABASE_ID);
  const filters = {
    filter: {
      and: [
        filterSelect("Status", "Published").filter,
        filterSelect("Type", "Post").filter,
        filterMultiSelect("Tags", tag).filter,
      ],
    },
  };
  const sorter = sorterProperties([{ property: "PublishDate", direction: "descending" }]);

  return { ...defaultParam, ...filters, ...sorter };
}

type Props = {
  params: { tag: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ params, searchParams }: Props) {
  const tag = decodeURI(params.tag || "");
  const queryParams = dbParams(tag);
  const posts = await CacheQueryDatabase(env.NOTION_DATABASE_ID, queryParams);
  const total = posts.length;

  const page = Number(searchParams["page"]) || 1;
  const subpost = posts.slice((page - 1) * env.POST_PAGE_SIZES, page * env.POST_PAGE_SIZES);

  return (
    <Shell variant="default" className="md:px-48 md:pb-10">
      <PageHeader>
        <PageHeaderHeading size="lg" className="text-center">
          {tag}
        </PageHeaderHeading>
      </PageHeader>
      <Separator className="mb-2.5" />
      <PostRowsLayout items={subpost} className="gap-2 divide-y" gridClassName="py-6"></PostRowsLayout>
      {total > env.POST_PAGE_SIZES ? (
        <PostPagination total={total} pageSize={env.POST_PAGE_SIZES}></PostPagination>
      ) : null}
    </Shell>
  );
}
