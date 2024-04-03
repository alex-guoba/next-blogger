"use client";

import * as React from "react";

import { TableOfContents } from "@/app/notion/toc";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks/use-mounted";

interface TocProps {
  toc: TableOfContents;
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((heading1) => [
              heading1.id,
              heading1.items?.map((heading2) => [heading2.id, heading2.items?.map((heading3) => [heading3.id])]),
            ])
            .flat(4)
            .filter(Boolean)
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items) {
    return null;
  }

  return mounted ? (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      {/* <Tree tree={toc} activeItem={activeHeading} /> */}
      <ul className={cn("m-0 list-none")}>
        <IndentTree tree={toc} activeItem={activeHeading} />
      </ul>
    </div>
  ) : null;
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // entries.forEach((entry) => {
        //   if (entry.isIntersecting) {
        //     console.log("actived", entry.target.id);
        //     // setActiveId(entry.target.id);
        //   }
        // });

        entries.some((entry) => {
          if (entry.isIntersecting) {
            // console.log("the active", entry.target.id);
            setActiveId(entry.target.id);
            return true;
          }
        });
      },
      { rootMargin: `-64px 0px 0px 0px` }
      // {threshold: 0.5,}
    );

    itemIds?.forEach((id) => {
      if (!id) {
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level <= 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={`#${item.id}`}
              className={cn(
                "inline-block no-underline",
                item.id === `${activeItem}` ? "font-medium text-primary" : "text-sm text-muted-foreground"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? <Tree tree={item} level={level + 1} activeItem={activeItem} /> : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}

function IndentTree({ tree, level = 1, activeItem }: TreeProps) {
  let style = "pl-4";
  if (level == 2) {
    style = "pl-8";
  } else if (level == 3) {
    style = "pl-12";
  }
  return tree?.items?.length && level <= 3 ? (
    <React.Fragment>
      {tree.items.map((item, index) => {
        return (
          <>
            <li key={index} className={cn("mt-0 pt-2", style)}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "inline-block",
                  item.id === `${activeItem}` ? "font-medium text-primary" : "text-sm text-muted-foreground"
                )}
              >
                {item.title}
              </a>
            </li>
            {item.items?.length ? <IndentTree tree={item} level={level + 1} activeItem={activeItem} /> : null}
          </>
        );
      })}
    </React.Fragment>
  ) : null;
}
