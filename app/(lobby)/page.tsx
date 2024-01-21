// import Image from 'next/image'
import Link from 'next/link';

import { getDatabase } from '@/app/api/notion';
import '@/app/styles/globals.css'
import Text  from '../ui/text';
import Shell from '@/components/shells/shell';
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { PostCard, PostCardSkeleton } from '@/components/post-card';

export default async function Home() {
  console.log('Home getPosts');
  const posts = await getDatabase();

  return (
    <div>
      <Shell className="md:pb-10">
        <PageHeader>
          <PageHeaderHeading>Blog</PageHeaderHeading>
          <PageHeaderDescription>
            Explore the latest news.
          </PageHeaderDescription>
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
              const slug = post.properties?.Slug?.rich_text[0].plain_text;
              const date = post.last_edited_time;

              return <PostCard key={slug} 
                title={title} 
                slug={`/article/${slug}`}
                date={date}
                desc={title}
                image=""
                i={i} />
            })}
          </React.Suspense>
          {/* <h2>All Posts</h2> */}
          {/* <ol>
            {posts.map((post: any) => {
              const date = new Date(post.last_edited_time).toLocaleString(
                'en-US',
                {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                },
              );
              const slug = post.properties?.Slug?.rich_text[0].plain_text;
              return (
                <li key={post.id}>
                  <h3>
                    <Link href={`/article/${slug}`}>
                      <Text title={post.properties?.Title?.title} />
                    </Link>
                  </h3>

                  <p >{date}</p>
                  <Link href={`/article/${slug}`}>Read post →</Link>
                </li>
              );
            })}
          </ol> */}
        </section>
      </Shell>
    </div>
  );
}
