import { TypePostList } from "@/app/notion/api/api-stat";
import React from "react";
import { PostCard, PostCardSkeleton } from "../post-card";
import { extractFileUrl, rawText } from "@/app/notion/block-parse";

interface PostCardLayoutProps {
  items: TypePostList;
}

export function PostCardLayout({ items }: PostCardLayoutProps) {
  if (items.length == 0) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <React.Suspense
        fallback={Array.from({ length: 2 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      >
        {items.map((post: any, i) => {
          const title = rawText(post.properties?.Title?.title);
          const slug = post.id; // + "/" + post.properties?.Summary?.rich_text[0]?.plain_text;
          // const edit_time = post?.properties?.PublishDate?.date?.start || post?.last_edited_time;
          const image = extractFileUrl(post.cover);
          const desc = rawText(post.properties?.Summary?.rich_text);

          return (
            <PostCard
              key={slug}
              title={title}
              slug={`/article/${slug}`}
              // edit_time={edit_time}
              desc={desc}
              image={image}
              prefetch={false}
              i={i}
            />
          );
        })}
      </React.Suspense>
    </section>
  );
}
