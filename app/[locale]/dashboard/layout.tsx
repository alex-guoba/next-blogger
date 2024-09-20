import React from "react";
import { redirect } from "next/navigation";
import { getCacheUser } from "@/lib/supabase/user";
import { SidebarProvider } from "@/components/layouts/sidebar-provider";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import DashboardHeader from "./_components/dashboard-header";
import { DashboardSidebarSheet } from "./_components/dashboard-sidebar-sheet";

// By using APIs like useTranslations from next-intl in Server Components, your pages will currently opt into dynamic rendering.
// This is a limitation that we aim to remove in the future, but as a stopgap solution, next-intl provides a temporary API that
// can be used to enable static rendering:
// see: https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
export default async function LobyLayout({ children }: { children: React.ReactNode }) {
  const user = await getCacheUser();
  if (!user) {
    redirect("auth/signin");
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
        <DashboardSidebar className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block"></DashboardSidebar>

        <div className="flex flex-col">
          <DashboardHeader user={user}>
            <DashboardSidebarSheet className="lg:hidden">
              <DashboardSidebar></DashboardSidebar>
            </DashboardSidebarSheet>
          </DashboardHeader>
          <main className="flex-1 overflow-hidden px-6 lg:max-w-3xl">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
