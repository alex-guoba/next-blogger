import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
  tagCounter: Map<string, number>;
}

export function TagList({ tagCounter, className }: TagListProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
      {Array.from(tagCounter).map((value) => {
        return (
          <div key={value[0]} className="px-4 py-1 font-serif text-base">
            <Link
              href={`/tags/${encodeURI(value[0])}/`}
              className="font-medium leading-tight hover:text-red-500"
              aria-label={`View posts tagged ${value[0]}`}
              prefetch={false}
            >
              {value[0]}
            </Link>
            <span className="text-gray-400">&nbsp;({value[1]})</span>
          </div>
        );
      })}
    </div>
  );
}
