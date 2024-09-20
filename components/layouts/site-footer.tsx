import Link from "next/link";

import React from "react";
import Shell from "../shells/shell";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { siteMeta } from "@/config/meta";
import { ModeToggle } from "@/components/layouts/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import LocaleSwitcher from "../locale-swither";
import { NextIntlClientProvider } from "next-intl";
import { env } from "@/env.mjs";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center justify-between space-x-4"
        >
          <div className="text-left text-sm leading-loose text-muted-foreground">
            Powered by{" "}
            <Link
              href={siteMeta.github}
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              next-blogger
              <span className="sr-only">Twitter</span>
            </Link>
            .
          </div>
          <div className="font-sans text-sm leading-loose">
            <Link href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
              {env.COPYRIGHT}
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href={siteMeta.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })
              )}
            >
              <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </Link>
            <ModeToggle />
            <NextIntlClientProvider>
              <LocaleSwitcher />
            </NextIntlClientProvider>
          </div>
        </section>
      </Shell>
    </footer>
  );
}
