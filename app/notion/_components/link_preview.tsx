import { cn } from "@/lib/utils";
import RichText from "../text";
import { Icons } from "@/components/icons";

interface LinkPreviewBlockProps {
  block: any;
  className?: string | undefined;
}

export function LinkPreviewRender({ block, className }: LinkPreviewBlockProps) {
  const {
    id,
    link_preview: { caption, url },
  } = block;
  if (!url) {
    return null;
  }

  return (
    <div className={cn(className, "inline-flex w-full items-center flex-wrap")} title="link preview">
      <Icons.linkpreview className="h-6 w-6 p-[0.5]"/>
      <a
        id={id}
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="whitespace-pre-wrap break-words font-normal truncate"
      >
        {url}
      </a>
    </div>
  );
}
