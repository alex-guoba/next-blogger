
import { QueryDatabase, RetrieveDatabase } from "../api";

interface ChildDatabaseBlockProps {
  block: any;
  className?: string | undefined;
}

export async function ChildDatabaseRenderer({ block, className }: ChildDatabaseBlockProps) {
  const {
    id,
    child_database: { title },
  } = block;

  const dbInfo: any = await RetrieveDatabase(id);
  if (!dbInfo) {
    return null;
  }

  const dbData = await QueryDatabase(id);
  console.log(dbData);

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
