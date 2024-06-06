import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";

import { defaultMeta } from "@/lib/seo";
import { AllLocales } from "@/config/locale";
// import { SiteHeader } from "@/components/layouts/site-header";
// import { SiteFooter } from "@/components/layouts/site-footer";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return await defaultMeta(locale);
}

export function generateStaticParams() {
  const locales = AllLocales;
  return locales.map((locale) => ({ locale }));
}

// By using APIs like useTranslations from next-intl in Server Components, your pages will currently opt into dynamic rendering.
// This is a limitation that we aim to remove in the future, but as a stopgap solution, next-intl provides a temporary API that
// can be used to enable static rendering:
// see: https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
export default async function LobyLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
      <main>{children}</main>
  );
}
