import React from "react";
// import { unstable_setRequestLocale } from "next-intl/server";

import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";

// By using APIs like useTranslations from next-intl in Server Components, your pages will currently opt into dynamic rendering.
// This is a limitation that we aim to remove in the future, but as a stopgap solution, next-intl provides a temporary API that
// can be used to enable static rendering:
// see: https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
export default async function LobyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col leading-relaxed">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
