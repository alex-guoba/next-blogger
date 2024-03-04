import Link from "next/link";

import { QueryDatabase, RetrieveDatabase } from "../api";
import { cn } from "@/lib/utils";
import RichText from "../text";
import { IconRender } from "./emoji";
import { DatabaseRenderer } from "./db/database";

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
    console.log(slug);
    return (
      <Link key={id} href={slug} className={cn(className, "flex")}>
        {icon && <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file} />}
        <div className="underline">
          <RichText title={title} />
        </div>
        <span className="sr-only">Inner database</span>
      </Link>
    );
  }

  const data = await QueryDatabase(id);
  return <DatabaseRenderer property={columns} data={data}></DatabaseRenderer>;

  // true if the database appears in the page as an inline block.

  //   if (db?.is_inline) {
  //     return null
  //   }

  //   return (
  //     <div
  //       key={id}
  //       className={cn(
  //         className,
  //         "inline-flex w-full items-center rounded-md border border-none bg-stone-100 p-4 dark:bg-stone-500"
  //       )}
  //     >
  //       {icon && <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file} />}
  //       <div className="ml-3 whitespace-pre-wrap break-words">
  //         <RichText title={rich_text} />
  //       </div>
  //     </div>
  //   );
}
