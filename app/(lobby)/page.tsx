// import Link from "next/link";

import { QueryDatabase } from "@/app/notion/api";
import "@/app/styles/globals.css";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { PostCard, PostCardSkeleton } from "@/components/post-card";
import { extractFileUrl } from "@/app/notion/block-parse";
import { env } from "@/env.mjs";

export default async function Home() {
  const posts = await QueryDatabase(env.NOTION_DATABASE_ID);

  return (
    <div>
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
              const title = post.properties?.Title.title[0].text.content;
              const slug = post.properties?.Slug?.rich_text[0].plain_text + "/" + post.id;
              const edit_time = post.last_edited_time;
              const image = extractFileUrl(post.cover);
              const desc = post.properties?.Summary?.rich_text[0]?.plain_text;

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
      </Shell>
    </div>
  );
}
