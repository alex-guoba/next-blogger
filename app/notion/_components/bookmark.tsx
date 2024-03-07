"use client";

import RichText from "../text";
import { useUnfurlUrl } from "@/lib/unfurl";
import Link from "next/link";

import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { UnfurlSuccessResponse } from "@/types";

interface BookmarkBlockProps {
  block: any;
  className?: string | undefined;
}

function UnfurledBookmarkPreview({
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
    bookmark: { caption, url },
  } = block;

  const image = data?.imageSrc;
  const title = data?.title;
  const desc = data?.description;
  const icon = data?.favicon;

  return (
    <div key={id} className={cn(className, "space-y-1 py-1")}>
      <Link href={url} target="_blank">
        <div className="flex w-full max-w-full overflow-hidden rounded-md border border-gray-200  hover:bg-slate-200 dark:hover:bg-stone-500">
          {/* <span className="sr-only">{url}</span> */}
          <div className="w-96 flex-auto space-y-2 p-4">
            <CardHeader className="p-0">
              <CardContent className="line-clamp-1 p-0 text-sm font-normal">{title}</CardContent>
            </CardHeader>

            {desc ? (
              <CardDescription className="h-8 max-h-4 overflow-hidden text-xs leading-4">{desc}</CardDescription>
            ) : null}

            <div className="mt-4 flex w-full max-w-full overflow-hidden">
              {icon ? (
                <div className="flex w-6 flex-none justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt={url} className="pr-1" />
                </div>
              ) : null}
              <CardContent className="max-h-4 overflow-hidden p-0 text-xs">{url}</CardContent>
            </div>
          </div>
          {image ? (
            <div className="relative hidden h-full max-h-24 w-32 flex-auto md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={url} className="object-cover" />
            </div>
          ) : // <PlaceholderImage asChild />
          null}
        </div>
      </Link>

      {caption && caption.length > 0 ? (
        <figcaption className="px-1.5 text-sm font-normal text-slate-600">
          <RichText title={caption} />
        </figcaption>
      ) : null}
    </div>
  );
}

export function BookmarkPreviewRender({ block, className }: BookmarkBlockProps) {
  const {
    bookmark: { url },
  } = block;
  const { status, data } = useUnfurlUrl(url);

  if (status == "success") {
    return <UnfurledBookmarkPreview block={block} className={className} data={data} />;
  }

  const raw = new URL(url);
  const empty: UnfurlSuccessResponse = {
    from: "skeleton",
    title: raw.hostname,
    description: "",
  };
  // return <BookmarkRender block={block} className={className} />;
  return <UnfurledBookmarkPreview block={block} className={className} data={empty} />;
}
