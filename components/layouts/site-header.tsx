// import React from 'react'

import { MobileNav } from "@/components/layouts/mobile-nav";
import { MainNav } from "@/components/layouts/main-nav";
import { siteConfig } from "@/config/site";
import { dashboardConfig } from "@/config/dashboard";

// TODO: sticky can be canceled
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <nav className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav mainNavItems={siteConfig.mainNav} sidebarNavItems={dashboardConfig.sidebarNav} />
      </nav>
    </header>
  );
}
