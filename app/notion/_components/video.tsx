"use client";
// import { cn } from "@/lib/utils";

import { cn } from "@/lib/utils";
// import Image from "next/image";
import RichText from "../text";
// import { useUnfurlUrl } from "@/lib/unfurl";
import { Skeleton } from "@/components/ui/skeleton";
import { useIFramelyURL } from "@/lib/iframely";

interface VideoProps {
  block: any;
  className?: string | undefined;
}

function LoadingSkeleton() {
  return (
    <div className="flex w-full max-w-full overflow-hidden border border-gray-200">
      <div className="flex-[4_1_180px] space-y-2 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="relative hidden max-h-32 flex-[1_1_180px] md:flex" />
    </div>
  );
}

function VideoOmbed({ block }: VideoProps) {
  const {
    // id,
    video: { external, file },
  } = block;

  const url = external?.url || file?.url;
  const { status, data } = useIFramelyURL(url);

  //   console.log(status, data);

  if (status == "error") {
    // default iframe fallback
    return (
      <iframe
        width="100%"
        height="600"
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        // sandbox=""
        sandbox="allow-same-origin allow-scripts allow-forms"
        title="video"
      />
    );
  }
  if (status == "success") {
    const html = data?.html;
    if (html) {
      return <div className="w-full max-w-full" dangerouslySetInnerHTML={{ __html: html }}></div>;
    }
    return (
      <iframe
        width="95%"
        height="600"
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        // sandbox=""
        sandbox="allow-same-origin allow-scripts allow-forms"
        title="video"
      />
    );
  }
  return <LoadingSkeleton />;
}

export function VideoRender({ block, className }: VideoProps) {
  const {
    id,
    video: { caption, type, external, file },
  } = block;

  const url = external?.url || file?.url;
  if (!url) {
    return null;
  }

  return (
    <figure key={id} className={cn(className, "mx-0 my-2 flex min-w-full max-w-full flex-col self-center")}>
      <div className="flex w-full max-w-full justify-center self-center ">
        {type == "external" ? (
          <VideoOmbed block={block} />
        ) : (
          <video playsInline controls preload="metadata" src={url} className={cn("block")} title="video" />
        )}
      </div>

      {caption && caption.length > 0 && (
        <figcaption className="self-center px-1.5 text-sm font-normal text-slate-600">
          <RichText title={caption} />
        </figcaption>
      )}
    </figure>
  );
}
