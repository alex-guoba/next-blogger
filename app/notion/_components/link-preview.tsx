"use client";

// import { cn } from "@/lib/utils";
import RichText from "../text";
// import { Icons } from "@/components/icons";
import { UrlData, useUnfurlUrl } from "@/lib/unfurl";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// import { PlaceholderImage } from "@/components/placeholder-image";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CardContent, CardDescription } from "@/components/ui/card";

interface LinkPreviewBlockProps {
  block: any;
  className?: string | undefined;
}

// export function LinkPreviewRender({ block, className }: LinkPreviewBlockProps) {
//   const {
//     id,
//     link_preview: { caption, url },
//   } = block;
//   if (!url) {
//     return null;
//   }

//   return (
//     <div className={cn(className, "inline-flex w-full items-center flex-wrap")} title="link preview">
//       <Icons.linkpreview className="h-6 w-6 p-[0.8] text-gray-600"/>
//       <a
//         id={id}
//         href={url}
//         target="_blank"
//         rel="noreferrer noopener"
//         className="whitespace-pre-wrap break-words font-normal truncate"
//       >
//         {url}
//       </a>
//     </div>
//   );
// }

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

function UnfurledLinkPreview({
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
    link_preview: { caption, url },
  } = block;

  // const image = data?.imageSrc;
  const title = data?.title;
  const desc = data?.description;
  const icon = data?.favicon;

  return (
    <div key={id} className={className}>
      <Link href={url} target="_blank">
        <div className="flex w-full max-w-full overflow-hidden border border-gray-200  hover:bg-slate-200 dark:hover:bg-stone-500 rounded-md">
          <span className="sr-only">{url}</span>
          {icon ? (
            <div className="flex w-12 flex-none justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt={url} className="px-1.5" />
            </div>
          ) : null}

          <div className="w-96 flex-auto space-y-2 p-2">
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

  if (status == "error") {
    const raw = new URL(url);
    const empty: UrlData = {
      title: raw.hostname,
      description: "",
    };

    return <UnfurledLinkPreview block={block} className={className} data={empty} />;
  }
  if (status == "success") {
    return <UnfurledLinkPreview block={block} className={className} data={data} />;
  }
  return <LoadingSkeleton />;
}
