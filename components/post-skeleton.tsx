import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";

interface PlaceholderImageProps extends React.ComponentPropsWithoutRef<typeof AspectRatio> {
  isSkeleton?: boolean;
  asChild?: boolean;
}

export function PlaceholderImage({ isSkeleton = false, asChild = false, className, ...props }: PlaceholderImageProps) {
  const Comp = asChild ? Slot : AspectRatio;

  return (
    <Comp ratio={16 / 9} {...props} className={cn("overflow-hidden rounded-lg", className)}>
      <Skeleton
        aria-label="Placeholder"
        role="img"
        aria-roledescription="placeholder"
        className={cn("flex h-full w-full items-center justify-center", isSkeleton ? "animate-pulse" : "animate-none")}
      >
        <Icons.placeholder className="h-9 w-9 text-muted-foreground" aria-hidden="true" />
      </Skeleton>
    </Comp>
  );
}

export function ContentLoadingSkeleton() {
  return (
    <div
      className="text-surface inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
