// import Head from "next/head";
// import Link from "next/link";
// import { Fragment } from "react";
// import { Metadata } from "next";

// import { renderBlock } from "@/app/notion/render";
// import { QueryDatabase, queryPageBySlug, retrieveBlockChildren, retrievePage } from "@/app/notion/api";
import Shell from "@/components/shells/shell";
import React from "react";
// import { cn } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";
// import { ChevronLeftIcon } from "@radix-ui/react-icons";
// import { formatDate } from "@/lib/utils";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

// import { env } from "@/env.mjs";
import { QueryDatabase, RetrieveDatabase } from "@/app/notion/api";
import { DatabaseRenderer } from "@/app/notion/_components/db/database";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
// export const revalidate = parseInt(process.env.NEXT_REVALIDATE_PAGES || "", 10) || 300; // revalidate the data interval

export default async function Page({ params }: { params: { row: string[] } }) {
  const dbID = params.row[0];
  const columns: any = await RetrieveDatabase(dbID);
  if (!columns) {
    return null;
  }

  const data = await QueryDatabase(dbID);

  return (
    <Shell as="article" className="relative flex min-h-screen flex-col">
      <PageHeader>
        {/* <PageHeaderDescription variant="sm">{formatDate(lastEditTime)}</PageHeaderDescription> */}
        <PageHeaderHeading>Table renderer</PageHeaderHeading>
      </PageHeader>
      <Separator className="mb-2.5" />

      {/* <section className="w-full">
        {blocks.map((block: any) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </section> */}
      <DatabaseRenderer property={columns} data={data}></DatabaseRenderer>
    </Shell>
  );
}
