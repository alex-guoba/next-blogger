// "use client";

import { TypePostList } from "@/app/notion/api/api-stat";
import React from "react";
import { rawText } from "@/app/notion/block-parse";
import Link from "next/link";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { PostTags } from "../post-tags";

interface PostRowLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TypePostList;
  gridClassName?: string;
}

function PostRowGrid({ post, className }: { post: any; className?: string }) {
  const title = rawText(post.properties?.Title?.title);
  const slug = post.id; // + "/" + post.properties?.Summary?.rich_text[0]?.plain_text;
  const edit_time = post?.properties?.PublishDate?.date?.start || post?.last_edited_time;
  //   const image = extractFileUrl(post.cover);
  const desc = rawText(post.properties?.Summary?.rich_text);
  const tags = post.properties?.Tags?.multi_select;
  return (
    <div key={slug} className={cn(className, "group rounded px-4")}>
      <article className="flex flex-1 flex-col space-y-2">
        <CardDescription className="inline-block">{formatDate(edit_time)}</CardDescription>
        <span className="sr-only">{title}</span>
        <Link href={`/article/${slug}`} prefetch={false}>
          <CardHeader className="px-0 py-1 font-serif group-hover:text-primary">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        </Link>
        <CardDescription className="line-clamp-2 h-12 overflow-hidden py-1 text-sm">{desc}</CardDescription>
        <PostTags tags={tags}></PostTags>
      </article>
    </div>
  );
}

export function PostRowsLayout({ items, gridClassName, className }: PostRowLayoutProps) {
  if (items.length == 0) {
    return null;
  }
  return (
    <section className={cn("grid grid-cols-1", className)}>
      {items.map((post: any) => {
        return <PostRowGrid key={post?.id} post={post} className={gridClassName}></PostRowGrid>;
      })}
    </section>
  );
}
