"use client";

import React from "react";

import { cn } from "@/lib/utils";
// import RichText from "../text";
import katex from "katex";
import "katex/dist/katex.min.css";
import "katex/dist/contrib/mhchem.mjs";

interface EquationProps {
  block: any;
  className?: string | undefined;

  /**
   * If `true`, math will be rendered in display mode
   * (math in display style and center math on page)
   *
   * If `false`, math will be rendered in inline mode
   * @default false
   */
  displayMode: boolean;
}

export function EquationRender({ block, className, displayMode = true }: EquationProps) {
  const katexTextRef = React.useRef<HTMLDivElement>(null);
  const {
    equation: { expression },
    id,
    type,
  } = block;

  React.useEffect(() => {
    if (katexTextRef.current) {
      katex.render(expression, katexTextRef.current, {
        displayMode: displayMode,
        throwOnError: false,
        strict: false,
      });
    }
  }, [displayMode, expression]);

  if (type != "equation" || !expression) {
    return null;
  }

  // TODO: add copy to clipboard feature
  return (
    <span
      key={id}
      ref={katexTextRef}
      className={cn(className, "text-base hover:bg-slate-200 dark:hover:bg-stone-500", displayMode ? "my-6" : "")}
    >
      {expression}
    </span>
  );
}
