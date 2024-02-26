import { cn } from "@/lib/utils";
import RichText from "../text";

interface EmbedProps {
  block: any;
  className?: string | undefined;
}

export function EmbedRender({ block, className }: EmbedProps) {
  const {
    id,
    embed: { caption, url },
  } = block;

  if (!url) {
    return null;
  }

  return (
    <figure key={id} className={cn(className, "mx-0 my-2 flex min-w-full max-w-full flex-col self-center")}>
      <div className="flex w-full max-w-full justify-center self-center ">
        <iframe
          width="95%"
          height="540"
          src={url}
          loading="lazy"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-forms"
          title="video"
        />
      </div>

      {caption && caption.length > 0 && (
        <figcaption className="self-center px-1.5 text-sm font-normal text-slate-600">
          <RichText title={caption} />
        </figcaption>
      )}
    </figure>
  );
}
