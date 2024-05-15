import React from "react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface NoteGridProps {
  title: string;
  author: string;
  slug: string;
  className?: string;
  cover?: string;
  category?: string;
  intro?: string;
}

export function NoteGrid({ title, author, slug, className, cover, category, intro }: NoteGridProps) {
  return (
    <Card key={slug} className={cn(className, "flex px-4")}>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img src={cover} alt="" className="object-coverrounded-lg h-32 w-fit shadow-md" />
      </div>
      <article className="flex flex-1 flex-col space-y-2 pl-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="inline">
            <Icons.author className="inline-block h-6 w-6" />
            <span>{author}</span>
          </div>
          <div>{category}</div>
        </div>
        <span className="sr-only">{title}</span>
        <Link href={slug} prefetch={false}>
          <CardHeader className="px-0 py-1 group-hover:text-primary">
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
        </Link>
        {intro && <CardDescription className="line-clamp-2 h-12 overflow-hidden py-1 text-sm">{intro}</CardDescription>}
      </article>
    </Card>
  );
}
