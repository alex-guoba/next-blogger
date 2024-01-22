import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import Text from "@/app/ui/text";

import {renderBlock} from "@/app/ui/notion/render";
import { QueryDatabase, getPageFromSlug, getBlocks } from "@/app/api/notion";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = parseInt(process.env.NEXT_REVALIDATE_PAGES || '', 10) || 300; // revalidate the data interval

// export const dynamicParams = true; // true | false,

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const database = await QueryDatabase();
  return database.map((page: any) => {
    const slug = page.properties.Slug?.rich_text[0].plain_text;
    return ({ slug });
  });
}

export default async function Page({ params }: {params: {slug: string}}) {
  console.log(params, "environment variables:", revalidate)
  const page: any = await getPageFromSlug(params.slug);
  const blocks = page && await getBlocks(page.id);

  if (!page || !blocks) {
    return <div />;
  }

  return (
    <div>
      <Head>
        <title>{page.properties.Title?.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article>
        <h1>
          <Text title={page.properties.Title?.title} />
        </h1>
        <section>
          {blocks.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/">
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  );
}
