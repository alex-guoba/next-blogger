import Link from "next/link"

import React from 'react'
import Shell from '../shells/shell'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/app/config/site"
import { ModeToggle } from "@/components/layouts/mode-toggle"
import { buttonVariants } from "@/components/ui/button"


export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
        <Shell>
            <div>SiteFooter</div>

            <section
              id="footer-bottom"
              aria-labelledby="footer-bottom-heading"
              className="flex items-center space-x-4"
            >
              <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
                Built by{" "}
                <Link
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold transition-colors hover:text-foreground"
                >
                  gelco
                  <span className="sr-only">Twitter</span>
                </Link>
                .
              </div>
              <div className="flex items-center space-x-1">
                <Link
                  href={siteConfig.links.github}
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
  )
}
