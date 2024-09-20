"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { type MainNavItem } from "@/types";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";
import { siteMeta } from "@/config/meta";
import { SidebarNav } from "@/components/layouts/sidebar-nav";

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function DashboardSidebar({ children, className, ...props }: DashboardSidebarProps) {
  const segments = useSelectedLayoutSegments();

  const sidebarNav: MainNavItem[] = [
    {
      title: "Profile",
      href: `/dashboard/profile`,
      icon: "person",
      active: segments.includes("profile"),
    },
    {
      title: "Account",
      href: `/dashboard/account`,
      icon: "credit",
      active: segments.includes("account"),
    },
  ];

  return (
    <aside className={cn("h-screen w-full", className)} {...props}>
      <div className="hidden h-[3.55rem] items-center border-b border-border/60 px-4 lg:flex lg:px-6">
        {/* <Link
          href="/"
          className="font-heading flex w-fit items-center tracking-wider text-foreground/90 transition-colors hover:text-foreground"
        >
          <Icons.logo className="mb-1 mr-2 size-7" aria-hidden="true" />
          {siteMeta.name}
        </Link> */}
        <Link href="/" className="hidden items-center space-x-2 lg:flex">
          <Icons.logo className="h-6 w-6" aria-hidden="true" />
          <span className="hidden font-bold lg:inline-block">{siteMeta.name}</span>
          <span className="sr-only">Home</span>
        </Link>
      </div>
      {children && <div className="flex flex-col gap-2.5 px-4 pt-2 lg:px-6 lg:pt-4">{children}</div>}
      <ScrollArea className="h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5">
        <SidebarNav items={sidebarNav} className="p-1 pt-4" />
      </ScrollArea>
    </aside>
  );
}
