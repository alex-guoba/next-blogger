// "use client";

import { TypePostList } from "@/app/notion/api";
import React from "react";
import { rawText } from "@/app/notion/block-parse";
import Link from "next/link";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";

interface PostRowLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TypePostList;
}

function PostRowGrid({ post }: { post: any }) {
  const title = rawText(post.properties?.Title?.title);
  const slug = post.id; // + "/" + post.properties?.Summary?.rich_text[0]?.plain_text;
  const edit_time = post?.properties?.PublishDate?.date?.start || post?.last_edited_time;
  //   const image = extractFileUrl(post.cover);
  const desc = rawText(post.properties?.Summary?.rich_text);
  return (
    <div
      key={slug}
      className="group rounded bg-zinc-100 px-4 py-8 hover:bg-inherit  hover:bg-slate-300 dark:bg-inherit dark:hover:bg-stone-500"
    >
      <article className="flex flex-1 flex-col space-y-2">
        <span className="sr-only">{title}</span>
        <CardDescription>{formatDate(edit_time)}</CardDescription>
        <Link href={`/article/${slug}`} prefetch={false}>
          <CardHeader className="px-0 py-1 group-hover:text-red-500">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        </Link>
        <CardDescription className="py-2 text-base">{desc}</CardDescription>
      </article>
    </div>
  );
}

export function PostRowsLayout({ items, className }: PostRowLayoutProps) {
  if (items.length == 0) {
    return null;
  }
  return (
    <section className={cn("grid grid-cols-1 gap-8 md:grid-cols-2", className)}>
      {items.map((post: any) => {
        return <PostRowGrid key={post?.id} post={post}></PostRowGrid>;
      })}
    </section>
  );
}
