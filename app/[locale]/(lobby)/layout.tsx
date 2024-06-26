import React from "react";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";

export default async function LobyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col leading-relaxed">
      <SiteHeader />
      <main>
        <div className="relative flex min-h-[90vh] flex-col">{children}</div>;
      </main>
      <SiteFooter />
    </div>
  );
}
