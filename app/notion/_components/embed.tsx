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
    <figure
      key={id}
      className={cn(
        className,
        "max-w-full min-w-full self-center flex flex-col mx-0 my-2"
      )}
    >
      <div className="flex justify-center self-center w-full max-w-full ">
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
        
        <figcaption className="px-1.5 font-normal text-sm text-slate-600 self-center">
          <RichText title={caption} />
        </figcaption>
      )}
    </figure>
  );
}
