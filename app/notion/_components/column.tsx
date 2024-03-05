import { cn } from "@/lib/utils";
import { RenderBlock } from "../render";
import React from "react";

interface ColumnListBlockProps {
  block: any;
  level: number;
  className?: string | undefined;
}

export function ColumnListRender({ block, level, className }: ColumnListBlockProps) {
  const { id, children } = block;

  return (
    <div key={id} className={cn(className, "flex w-full max-w-full flex-col overflow-hidden md:flex-row md:gap-8")}>
      {children.map((child: any) => (
        <RenderBlock key={child.id} block={child} level={level+1}></RenderBlock>
      ))}
    </div>
  );
}

export function ColumnRender({ block, level, className }: ColumnListBlockProps) {
  const { id, children } = block;

  return (
    <div key={id} className={cn(className, "flex flex-1 flex-col overflow-hidden py-3")}>
      {children.map((child: any) => (
        <RenderBlock key={child.id} block={child} level={level+1}></RenderBlock>
      ))}
    </div>
  );
}
