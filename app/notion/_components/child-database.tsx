import Link from "next/link";

import { QueryDatabase, RetrieveDatabase } from "../api";
import { cn } from "@/lib/utils";
import RichText from "../text";
import { IconRender } from "./emoji";
import { DatabaseRenderer } from "./db/database";
import { filterBase } from "../block-parse";

interface ChildDatabaseBlockProps {
  block: any;
  className?: string | undefined;
}

export async function ChildDatabaseRenderer({ block, className }: ChildDatabaseBlockProps) {
  const { id } = block;

  // Note: database view in Notion client can't be retrieved, as it's has a invliad id which has no relationship with the original one
  const columns: any = await RetrieveDatabase(id);
  if (!columns) {
    return null;
  }

  const { is_inline, icon, title } = columns;
  if (!is_inline) {
    // link to the database
    const slug = `/db/${id}`;
    return (
      <Link key={id} href={slug} className={cn(className, "flex")}>
        {icon && <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file} />}
        <div className="underline decoration-1 underline-offset-4">
          <RichText title={title} />
        </div>
        <span className="sr-only">Inner database</span>
      </Link>
    );
  }

  const queryParam = filterBase(id);
  const data = await QueryDatabase(id, queryParam);
  return (
    <div>
      <div className="text-lg font-bold">
        {icon && <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file} />}
        <RichText title={title} />
      </div>
      <DatabaseRenderer property={columns} data={data} className="py-1"></DatabaseRenderer>
    </div>
  );
}
