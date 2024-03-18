// import Link from "next/link";

import { QueryDatabase } from "@/app/notion/api";
import "@/app/styles/globals.css";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { PostCard, PostCardSkeleton } from "@/components/post-card";
import { extractFileUrl, filterBase, filterSelect, rawText, sorterProperties } from "@/app/notion/block-parse";
import { env } from "@/env.mjs";
import { PostPagination } from "@/components/pagination";

function dbParams() {
  const defaultParam = filterBase(env.NOTION_DATABASE_ID);
  const filters = {
    filter: {
      and: [filterSelect("Status", "Published").filter, filterSelect("Type", "Post").filter],
    },
  };
  const sorter = sorterProperties([{ property: "PublishDate", direction: "descending" }]);

  return { ...defaultParam, ...filters, ...sorter };
}

export default async function Home() {
  const queryParams = dbParams();
  const posts = await QueryDatabase(env.NOTION_DATABASE_ID, queryParams);
  const total = posts.length;

  return (
    <Shell className="md:pb-10">
      <PageHeader>
        <PageHeaderHeading>Blog</PageHeaderHeading>
        <PageHeaderDescription>Explore the latest blogs.</PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 4 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        >
          {posts.map((post: any, i) => {
            const title = rawText(post.properties?.Title?.title);
            const slug = post.id; // + "/" + post.properties?.Summary?.rich_text[0]?.plain_text;
            const edit_time = post?.properties?.PublishDate?.date?.start || post?.last_edited_time;
            const image = extractFileUrl(post.cover);
            const desc = rawText(post.properties?.Summary?.rich_text);

            return (
              <PostCard
                key={slug}
                title={title}
                slug={`/article/${slug}`}
                edit_time={edit_time}
                desc={desc}
                image={image}
                i={i}
              />
            );
          })}
        </React.Suspense>
      </section>
      <Separator className="mt-10" />
      <PostPagination total={total} pageSize={8} ></PostPagination>
    </Shell>
  );
}
