// common types defination

import type { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}
export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;
export type SidebarNavItem = NavItemWithChildren;

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

// unfurl response
export type UnfurlSuccessResponse = {
  from: "iframely" | "unfurl" | "skeleton";
  error?: string;

  title?: string | null;
  description?: string | null;
  favicon?: string | null;
  imageSrc?: string | null;

  // raw response from iframely or unfurl
  raw?: any;
};
