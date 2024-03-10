import type { Metadata, Viewport } from "next";
// import { Inter } from 'next/font/google'
import React from "react";
import "@/app/styles/globals.css";
import { cn } from "@/lib/utils";

// const inter = Inter({ subsets: ['latin'] })
import { fontMono, fontSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers";
import TailwindIndicator from "@/components/helpers/tailwind-indicator";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";

import { defaultMeta } from "@/lib/seo";

export const metadata: Metadata = defaultMeta();

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head /> */}
      {/* <body className={`${inter.className} min-h-screen bg-background antialiased`}> */}
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontMono.variable)}>
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
