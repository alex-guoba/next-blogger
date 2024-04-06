import Link from "next/link";

import React from "react";
import Shell from "../shells/shell";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
// import { siteConfig } from "@/config/site";
import { siteMeta } from "@/config/meta";
import { ModeToggle } from "@/components/layouts/mode-toggle";
import { buttonVariants } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell>
        {/* <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section id="footer-branding" aria-labelledby="footer-branding-heading">
            <Link href="/" className="flex w-fit items-center space-x-2">
              <Icons.logonew className="h-6 w-6" aria-hidden="true" />
              <span className="font-bold">{siteMeta.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="xxs:grid-cols-2 grid flex-1 grid-cols-1 gap-10 sm:grid-cols-4"
          >
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="space-y-3">
                <h4 className="text-base font-medium">{item.title}</h4>
                <ul className="space-y-2.5">
                  {item.items.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link?.external ? "_blank" : undefined}
                        rel={link?.external ? "noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section
                id="newsletter"
                aria-labelledby="newsletter-heading"
                className="space-y-3"
              >
                <h4 className="text-base font-medium">
                  Subscribe to our newsletter
                </h4>
                <JoinNewsletterForm />
              </section>
        </section> */}

        <section id="footer-bottom" aria-labelledby="footer-bottom-heading" className="flex items-center justify-between space-x-4">
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
          <div className="text-sm leading-loose font-sans">{siteMeta.copyright}</div>
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
          </div>
        </section>
      </Shell>
    </footer>
  );
}
