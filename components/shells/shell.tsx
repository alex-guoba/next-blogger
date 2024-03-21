import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const shellVariants = cva("grid items-center gap-6 pb-8 pt-6 md:py-8", {
  variants: {
    variant: {
      default: "container",
      sidebar: "",
      centered: "container flex h-[80dvh] max-w-4xl flex-col justify-center",
      markdown: "container max-w-4xl py-8 md:py-10 lg:py-10",
      // blog: "conainer flex min-h-screen w-full flex-col",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ShellProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

export default function shell({ className, as: Comp = "section", variant, ...props }: ShellProps) {
  return <Comp className={cn(shellVariants({ variant }), className)} {...props} />;
}
