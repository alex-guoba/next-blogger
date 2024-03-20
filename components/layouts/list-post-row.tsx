// "use client";

import { TypePostList } from "@/app/notion/api";
import React from "react";
import { rawText } from "@/app/notion/block-parse";
import Link from "next/link";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
// import { PlaceholderImage } from "../post-skeleton";
// import { AspectRatio } from "@radix-ui/react-aspect-ratio";
// import Image from "next/image";
// import { PostCardSkeleton } from "../post-card";

interface PostRowLayoutProps {
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
      className="group bg-zinc-100 px-4 py-8 hover:bg-inherit hover:bg-slate-300  dark:bg-inherit dark:hover:bg-stone-500"
    >
      <article className="flex flex-1 flex-col space-y-2">
        <span className="sr-only">{title}</span>
        <CardDescription>{formatDate(edit_time)}</CardDescription>
        <Link href={`/article/${slug}`} prefetch={false}>
          <CardHeader className="px-0 py-1 font-serif group-hover:text-red-500">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        </Link>
        <CardDescription className="py-2 text-base">{desc}</CardDescription>

        {/* <CardFooter className="pl-0 py-1 text-base font-medium hidden group-hover:block">
          <Link
            href={`/article/${slug}`}
            className=""
            aria-label={`Read more: "${title}"`}
          >
            Read more &rarr;
          </Link>
        </CardFooter> */}
      </article>
    </div>
  );
}

export function PostRowsLayout({ items }: PostRowLayoutProps) {
  if (items.length == 0) {
    return null;
  }
  return (
    <section className="grid grid-cols-2 gap-8">
      {items.map((post: any) => {
        return <PostRowGrid key={post?.id} post={post}></PostRowGrid>;
      })}
    </section>
  );
}
