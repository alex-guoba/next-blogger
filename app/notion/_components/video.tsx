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
    <div className="border border-gray-200 flex overflow-hidden w-full max-w-full">
      <div className="flex-[4_1_180px] space-y-2 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="flex-[1_1_180px] relative hidden md:flex max-h-32" />
    </div>
  );
}

function VideoOmbed({ block, className }: VideoProps) {
  const {
    // id,
    video: {external, file },
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
      return (
        <div
          className="w-full max-w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      );
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
    <figure
      key={id}
      className={cn(
        className,
        "max-w-full min-w-full self-center flex flex-col mx-0 my-2"
      )}
    >
      <div className="flex justify-center self-center w-full max-w-full ">
        {type == "external" ? (
          <VideoOmbed block={block} className={className} />
        ) : (
          <video
            playsInline
            controls
            preload="metadata"
            src={url}
            className={cn("block")}
            title="video"
          />
        )}
      </div>

      {caption && caption.length > 0 && (
        <figcaption className="px-1.5 font-normal text-sm text-slate-600 self-center">
          <RichText title={caption} />
        </figcaption>
      )}
    </figure>
  );
}
