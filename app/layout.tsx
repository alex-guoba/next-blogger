import type { Viewport } from "next";
import React from "react";

import "@/app/styles/globals.css";
import { cn } from "@/lib/utils";

// const inter = Inter({ subsets: ['latin'] })
import { fontMono, fontSans, fontSerif } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers";
import TailwindIndicator from "@/components/helpers/tailwind-indicator";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";

import { env } from "@/env.mjs";

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

function Analytics() {
  if (env.NEXT_ANALYTICS_UMAMI_ID) {
    return (
      <script
        defer
        src="https://analytics.us.umami.is/script.js"
        data-website-id={env.NEXT_ANALYTICS_UMAMI_ID}
      ></script>
    );
  }
  return null;
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Analytics></Analytics>
      </head>
      {/* <head /> */}
      {/* <body className={`${inter.className} min-h-screen bg-background antialiased`}> */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable
        )}
      >
        <TailwindIndicator />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          {/* <TailwindIndicator />
          <Analytics /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
