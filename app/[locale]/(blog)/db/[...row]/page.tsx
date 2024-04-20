import Shell from "@/components/shells/shell";
import React from "react";

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

// import { env } from "@/env.mjs";
// import { QueryDatabase } from "@/app/notion/api";
import { DatabaseRenderer } from "@/app/notion/_components/db/database";
import { IconRender } from "@/app/notion/_components/emoji";
import RichText from "@/app/notion/text";
import { filterBase } from "@/app/notion/block-parse";
import { CacheQueryDatabase, CacheRetrieveDatabase } from "@/app/notion/api/cache-wrapper";

export default async function Page({ params }: { params: { row: string[] } }) {
  const dbID = params.row[0];
  const columns: any = await CacheRetrieveDatabase(dbID);
  if (!columns) {
    return null;
  }

  const queryParam = filterBase(dbID);
  const data = await CacheQueryDatabase(dbID, queryParam);

  const { icon, title, description } = columns;
  return (
    <Shell as="article" className="relative flex min-h-screen flex-col">
      <PageHeader>
        {/* <PageHeaderDescription variant="sm">{formatDate(lastEditTime)}</PageHeaderDescription> */}
        <PageHeaderHeading className="flex items-center">
          {icon && <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file} />}
          {/* <div> */}
          <RichText title={title} />
          {/* </div> */}
        </PageHeaderHeading>
      </PageHeader>

      <PageHeaderDescription variant="sm">
        <RichText title={description} />
      </PageHeaderDescription>
      <Separator className="mb-2.5" />

      <DatabaseRenderer property={columns} data={data}></DatabaseRenderer>
    </Shell>
  );
}
