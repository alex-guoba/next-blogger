"use client";

import { cn } from "@/lib/utils";
import RichText from "../text";
import { Icons } from "@/components/icons";
import { UrlData, useUnfurlUrl } from "@/lib/unfurl";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import Link from "next/link";

import { PlaceholderImage } from "@/components/placeholder-image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
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
      className={cn(className, "inline-flex w-full items-center flex-wrap")}
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
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
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
      <Link href={url}>
        <div className="border border-gray-200 flex overflow-hidden w-full max-w-full">
          {/* <span className="sr-only">{url}</span> */}

          <div className="flex-[4_1_180px] space-y-2 p-4">
            <CardHeader className="p-0">
              <CardContent className="line-clamp-1 font-normal p-0 text-sm">
                {title}
              </CardContent>
            </CardHeader>
            <CardDescription className="text-xs">{desc}</CardDescription>
            <CardContent className="text-xs p-0">
              {url}
            </CardContent>
          </div>
          <div className="flex-[1_1_180px] relative hidden md:flex max-h-32">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={url}
                className="object-cover"
                // priority={i <= 1}
              />
            ) : (
              <PlaceholderImage asChild />
            )}
          </div>
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
    id,
    bookmark: { caption, url },
  } = block;
  const { status, data } = useUnfurlUrl(url);

  console.log(status, data);
  if (status == "error") {
    return <BookmarkRender block={block} className={className} />;
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
