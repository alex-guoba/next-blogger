import Image from "next/image";
import Link from "next/link";

// import { CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { PlaceholderImage } from "@/components/post-skeleton";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export function PostCardSkeleton() {
  return (
    <article className="space-y-4">
      <PlaceholderImage />
      <div className="space-y-2">
        <CardHeader className="space-y-2.5 p-0">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
        </CardHeader>
        <Skeleton className="h-3 w-1/4" />
      </div>
    </article>
  );
}

interface PostCardProps {
  slug: string;
  title: string;
  image?: string;
  desc: string;
  edit_time: string;
  prefetch: boolean;
  i: number;
}

export function PostCard({ slug, title, image, desc, edit_time, prefetch, i }: PostCardProps) {
  return (
    <Link key={slug} href={slug} prefetch={prefetch}>
      <span className="sr-only">{title}</span>
      <article className="space-y-4">
        <AspectRatio ratio={16 / 9}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
              className="rounded-lg object-cover"
              priority={i <= 1}
            />
          ) : (
            <PlaceholderImage asChild />
          )}
        </AspectRatio>
        <div className="space-y-2">
          <CardHeader className="space-y-2.5 p-0">
            <CardTitle className="line-clamp-1">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{desc}</CardDescription>
          </CardHeader>
          <CardDescription>{formatDate(edit_time)}</CardDescription>
        </div>
      </article>
    </Link>
  );
}
