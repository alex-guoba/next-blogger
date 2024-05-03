import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("break-words dark:text-white mt-1.5 scroll-mt-16 tracking-tight", {
  variants: {
    variant: {
      heading_1: "py-4 text-3xl font-extrabold",
      heading_2: "py-3 text-2xl font-bold",
      heading_3: "py-2 text-1xl font-bold",
    },
  },
  defaultVariants: {
    variant: "heading_1",
  },
});

export function H1({ children }: { children?: React.ReactNode }) {
  return <h1 className={cn(headingVariants({ variant: "heading_1" }))}>{children}</h1>;
}

export function H2({ children }: { children?: React.ReactNode }) {
  return <h2 className={cn(headingVariants({ variant: "heading_2" }))}>{children}</h2>;
}

export function H3({ children }: { children?: React.ReactNode }) {
  return <h3 className={cn(headingVariants({ variant: "heading_3" }))}>{children}</h3>;
}
