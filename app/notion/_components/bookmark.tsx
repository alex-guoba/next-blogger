"use client";

import { cn } from "@/lib/utils";
import RichText from "../text";
import { Icons } from "@/components/icons";
import { UrlData, useUnfurlUrl } from "@/lib/unfurl";
import { Skeleton } from "@/components/ui/skeleton";

// import Image from "next/image";
import Link from "next/link";

// import { PlaceholderImage } from "@/components/placeholder-image";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div
      className={cn(className, "inline-flex items-center flex-wrap")}
      title="bookmark"
    >
      <Icons.bookmark className="h-6 w-6 p-[0.8] text-gray-600" />
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

function LoadingSkeleton() {
  return (
    <div className="border border-gray-200 flex overflow-hidden w-full max-w-full">
      <div className="flex-[4_1_180px] space-y-2 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="flex-[1_1_180px] relative hidden md:flex max-h-32" />
    </div>
  );
}

function UnfurledBookmarkPreview({
  block,
  data,
  className,
}: {
  block: any;
  data: UrlData | null;
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
    <div key={id} className={className}>
      <Link href={url} target="_blank">
        <div className="border border-gray-200 flex overflow-hidden w-full max-w-full">
          {/* <span className="sr-only">{url}</span> */}

          <div className="flex-auto w-96 space-y-2 p-4">
            <CardHeader className="p-0">
              <CardContent className="line-clamp-1 font-normal p-0 text-sm">
                {title}
              </CardContent>
            </CardHeader>
            <CardDescription className="text-xs max-h-8 overflow-hidden">
              {desc}
            </CardDescription>
            
            <div className="flex overflow-hidden w-full max-w-full">
              {icon ? (
                <div className="flex-none w-6 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt={url}
                    className="px-1"
                  />
                </div>
              ) : null}
              <CardContent className="text-xs p-0 max-h-4 overflow-hidden">
                {url}
              </CardContent>
            </div>
          </div>
          {image ? (
            <div className="flex-auto w-32 relative md:block hidden max-h-32 h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={url}
                className="object-cover"
                // priority={i <= 1}
              />
            </div>
          ) : // <PlaceholderImage asChild />
          null}
        </div>
      </Link>

      {caption && caption.length > 0 ? (
        <div className="px-1.5 font-light">
          <RichText title={caption} />
        </div>
      ) : null}
    </div>
  );
}

export function BookmarkPreviewRender({
  block,
  className,
}: BookmarkBlockProps) {
  const {
    bookmark: { url },
  } = block;
  const { status, data } = useUnfurlUrl(url);

  if (status == "error") {
    const raw = new URL(url);
    const empty: UrlData = {
      title: raw.hostname,
      description: "",
    };
    // return <BookmarkRender block={block} className={className} />;
    return (
      <UnfurledBookmarkPreview
        block={block}
        className={className}
        data={empty}
      />
    );
  }
  if (status == "success") {
    return (
      <UnfurledBookmarkPreview
        block={block}
        className={className}
        data={data}
      />
    );
  }
  return <LoadingSkeleton />;
}
