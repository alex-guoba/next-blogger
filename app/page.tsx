// import Image from 'next/image'
import Link from 'next/link';
import { getDatabase } from '@/app/lib/notion';
import './globals.css'
import Text  from './ui/text';

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">

//     </main>
//   )
// }

async function getPosts() {
  console.log('Home getPosts');
  const database = await getDatabase();
  return database;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <header>
          <h1>Next.js blog powered by Notion API</h1>
        </header>

        <h2>All Posts</h2>
        <ol>
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
        </ol>
      </main>
    </div>
  );
}
