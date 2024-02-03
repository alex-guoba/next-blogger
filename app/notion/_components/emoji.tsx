// import { cn } from "@/lib/utils";

import { cn } from "@/lib/utils";
import Image from "next/image";


interface IconProps {
  type: string;
  emoji?: string | undefined;
  external?:
    | {
        url: string;
      }
    | undefined;
  file?:
    | {
        url: string;
        expiry_time: string;
      }
    | undefined;
}

export function IconRender(
  { type, emoji, external, file }: IconProps,
  className?: string | undefined
) {
  if (type == "emoji") {
    return (
      <div
        className={cn(className, "self-start w-6 h-6 text-xl leading-[1em]")}
      >
        {emoji}
      </div>
    );
  }
  const url = external?.url || file?.url;
  if (!url) {
    return null;
  }

  // TODO: use nextconfig.js to get the base path
  const u = new URL(url || "");
  if (
    u.hostname.endsWith("s3.us-west-2.amazonaws.com") ||
    u.hostname.startsWith("www.notion.so")
  ) {
    return (
      <Image
        src={url}
        className={cn("self-start w-6 h-6 text-[1em] leading-[1em]", className)}
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        alt="external icon"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      className={cn("self-start w-6 h-6 text-[1em] leading-[1em]", className)}
      loading="lazy"
      decoding="async"
      alt="external icon"
    />
  );
}
