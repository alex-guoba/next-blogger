import { cn } from "@/lib/utils";
import RichText from "../text";
import { Icons } from "@/components/icons";

interface BookmarkBlockProps {
  block: any;
  className?: string | undefined;
}

export function BookmarkRender({ block, className }: BookmarkBlockProps) {
  const {
    id,
    bookmark: { caption, url },
  } = block;
  if (!url) {
    return null;
  }

  return (
    <div className={cn(className, "inline-flex w-full items-center flex-wrap")} title="bookmark">
      <Icons.bookmark className="h-6 w-6 p-[0.5]"/>
      <a
        id={id}
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="whitespace-pre-wrap break-words font-normal truncate"
      >
        {caption && caption.length > 0 ? (
          <div>
            <RichText title={caption} />
          </div>
        ) : (
          url
        )}
      </a>
    </div>
  );
}
