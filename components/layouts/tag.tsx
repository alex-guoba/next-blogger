import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";


interface TagListProps extends React.HTMLAttributes<HTMLDivElement>{
    tagCounter: Map<string, number>;
  }

export function TagList({tagCounter, className}: TagListProps) {
    return (
        <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
          {Array.from(tagCounter).map((value) => {
            return (
              <div key={value[0]} className="px-4 py-1 text-base font-serif">
                <Link
                  href={`/tags/${encodeURI(value[0])}`}
                  className="hover:text-red-500 font-medium leading-tight"
                  aria-label={`View posts tagged ${value[0]}`}
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