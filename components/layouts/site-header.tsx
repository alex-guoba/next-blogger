// import React from 'react'

import { MobileNav } from "@/components/layouts/mobile-nav";
import { MainNav } from "@/components/layouts/main-nav";
import { siteConfig } from "@/config/site";
import { dashboardConfig } from "@/config/dashboard";
import { getTranslations } from "next-intl/server";
import { MainNavItem, NavItem } from "@/types";
import { getCacheUser } from "@/lib/supabase/user";
import { AuthDropdown } from "./auth-dropdown";

export async function SiteHeader() {
  const t = await getTranslations("Headers");
  const navs = siteConfig.mainNav;

  let user = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    user = await getCacheUser();
  }

  // translate on the server side
  navs.map((item: MainNavItem) => {
    const id = item.id;
    item.title = t(id);
    if (item?.items) {
      item.items?.map((subItem: NavItem) => {
        const id = subItem.id;
        subItem.title = t(id);
        subItem.description = t(`${id}_Description`);
      });
    }
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <nav className="container flex h-16 items-center">
        <MainNav items={navs} />
        <MobileNav mainNavItems={navs} sidebarNavItems={dashboardConfig.sidebarNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {process.env.NEXT_PUBLIC_SUPABASE_URL && <AuthDropdown user={user} className="" />}
        </div>
      </nav>
    </header>
  );
}
