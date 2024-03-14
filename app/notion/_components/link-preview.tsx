"use client";

import Link from "next/link";

import RichText from "../text";
import { useUnfurlUrl } from "@/lib/unfurl";
import { UnfurlSuccessResponse } from "@/types";
import { CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LinkPreviewBlockProps {
  block: any;
  className?: string | undefined;
}

function UnfurledLinkPreview({
  block,
  data,
  className,
}: {
  block: any;
  data: UnfurlSuccessResponse | null;
  className?: string | undefined;
}) {
  const {
    id,
    link_preview: { caption, url },
  } = block;

  // const image = data?.imageSrc;
  const title = data?.title;
  const desc = data?.description;
  const icon = data?.favicon;

  return (
    <div key={id} className={cn(className, "mt-1.5")}>
      <Link href={url} target="_blank">
        <div className="flex w-full max-w-full overflow-hidden rounded-md border border-gray-200 hover:bg-slate-200 dark:hover:bg-stone-500">
          <span className="sr-only">{url}</span>
          {icon ? (
            <div className="my-auto flex max-w-12 justify-center p-2 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt={url} />
            </div>
          ) : null}

          <div className="flex-auto space-y-2 p-2">
            {/* <CardHeader className="p-0"> */}
            <CardContent className="line-clamp-1 overflow-hidden p-0 text-sm font-bold">{title}</CardContent>
            {/* </CardHeader> */}
            <CardDescription className="max-h-4 overflow-hidden text-xs">{desc}</CardDescription>
            {/* <CardContent className="text-xs p-0 max-h-8 overflow-hidden">
              {url}
            </CardContent> */}
          </div>
        </div>
      </Link>

      {caption && caption.length > 0 ? (
        <figcaption className="x-1.5 text-sm font-normal text-slate-600">
          <RichText title={caption} />
        </figcaption>
      ) : null}
    </div>
  );
}

export function LinkPreviewRender({ block, className }: LinkPreviewBlockProps) {
  const {
    link_preview: { url },
  } = block;
  const { status, data } = useUnfurlUrl(url);

  if (status == "success") {
    return <UnfurledLinkPreview block={block} className={className} data={data} />;
  }
  const raw = new URL(url);
  const empty: UnfurlSuccessResponse = {
    from: "skeleton",
    title: raw.hostname,
    description: "",
  };

  return <UnfurledLinkPreview block={block} className={className} data={empty} />;
}
