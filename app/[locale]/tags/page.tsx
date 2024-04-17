// import Link from "next/link";

import { TypePostList } from "@/app/notion/api";
import "@/app/styles/globals.css";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { env } from "@/env.mjs";
import { ContentLoadingSkeleton } from "@/components/post-skeleton";
import { TagList } from "@/components/layouts/tag";
import { NotionApiCache } from "../../notion/cache";
import { ArticlePost, dbQueryParams } from "../../notion/fitler";

async function TagRender({ posts }: { posts: TypePostList }) {
  if (!posts || posts.length == 0) {
    return <div />;
  }

  const tagCounter = new Map<string, number>();
  posts.forEach((post: any) => {
    post.properties.Tags.multi_select?.forEach((tag: any) => {
      tagCounter.set(tag.name, (tagCounter.get(tag.name) || 0) + 1);
    });
  });

  return <TagList tagCounter={tagCounter} />;
}

export default async function Home() {
  const queryParams = dbQueryParams(env.NOTION_DATABASE_ID, ArticlePost);
  const posts = await NotionApiCache.QueryDatabase(env.NOTION_DATABASE_ID, queryParams);

  return (
    <Shell variant="centered" className="md:pb-10">
      <PageHeader>
        <PageHeaderHeading>Tags</PageHeaderHeading>
        <PageHeaderDescription>Explore articles by category.</PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />

      <React.Suspense fallback={<ContentLoadingSkeleton></ContentLoadingSkeleton>}>
        <TagRender posts={posts}></TagRender>
      </React.Suspense>

      {/* <Separator className="mt-10" /> */}
    </Shell>
  );
}
