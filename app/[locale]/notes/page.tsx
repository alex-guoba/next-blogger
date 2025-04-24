import "@/app/styles/globals.css";
import Shell from "@/components/shells/shell";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header";
import React from "react";
import { env } from "@/env.mjs";
import { CacheQueryDatabase } from "../../notion/api/cache-wrapper";
import { noteDbQueryParams } from "../../notion/fitler";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NoteGrid } from "@/components/layouts/list-note-row";
import { PostPagination } from "@/components/pagination";
import { rawText } from "@/app/notion/block-parse";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const revalidate = env.REVALIDATE_PAGES; // revalidate the data interval

function ConfigError() {
  return (
    <Shell variant="centered" className="md:pb-10">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Database for book not specified.</AlertDescription>
      </Alert>
    </Shell>
  );
}

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  if (!env.NOTION_NOTE_DATABASE_ID) {
    return <ConfigError />;
  }

  const queryParams = noteDbQueryParams(env.NOTION_NOTE_DATABASE_ID);
  const posts = await CacheQueryDatabase(env.NOTION_NOTE_DATABASE_ID, queryParams);

  const total = posts.length;
  const page = Number(searchParams["page"]) || 1;
  const subpost = posts.slice((page - 1) * env.POST_PAGE_SIZES, page * env.POST_PAGE_SIZES);

  if (page > 1 && page > Math.ceil(total / env.POST_PAGE_SIZES)) {
    return notFound();
  }

  const t = await getTranslations("Notes");

  return (
    <Shell className="md:pb-10">
      <PageHeader>
        <PageHeaderHeading>{t("Title")}</PageHeaderHeading>
        <PageHeaderDescription>{t("Description")}</PageHeaderDescription>
      </PageHeader>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-1">
        {subpost.map((post: any) => {
          return (
            <NoteGrid
              key={post?.id}
              className="bg-muted py-4"
              title={rawText(post.properties?.BookName?.title)}
              author={rawText(post.properties?.Author?.rich_text)}
              category={rawText(post.properties?.Category?.rich_text)}
              intro={rawText(post.properties?.Intro?.rich_text)}
              slug={"/notes/" + post.id}
              cover={post.icon?.external?.url}
            ></NoteGrid>
          );
        })}
      </section>
      {/* <NoteRowsLayout items={subpost} className="" gridClassName="py-8 bg-muted"></NoteRowsLayout> */}
      {/* <Separator className="mt-10" /> */}
      <PostPagination total={total} pageSize={env.POST_PAGE_SIZES}></PostPagination>
    </Shell>
  );
}
