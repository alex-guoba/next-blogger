import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import Link from "next/link";

interface SubPageProps {
  block: any;
  className?: string | undefined;
}

export function SubPageRender({ block, className }: SubPageProps) {
  const {
    id,
    child_page: { title },
  } = block;

  // Subpage not in blog list. page ID shouldn't be empty
  const slug = `/article/${title}/${id}`;

  return (
    <div key={id} className={cn(className, "inline-flex w-full flex-wrap items-center")}>
      <Icons.textFile className="h-6 w-6 p-[0.8] text-gray-400" />
      <Link
        href={slug}
        className="truncate whitespace-pre-wrap break-words font-semibold underline underline-offset-4 decoration-1 decoration-slate-300"
      >
        {title}
      </Link>
    </div>
  );
}
