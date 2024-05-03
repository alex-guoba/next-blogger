import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { H1, H2, H3 } from "./mdx-components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Shell from "@/components/shells/shell";
import { Icons } from "@/components/icons";
import { FeatureCard } from "@/components/feature-card";
import { PriceCard } from "@/components/price-card";
import * as Accordion from "@/components/ui/accordion";

interface MdxProps {
  source: string;
  className?: string | undefined;
}

export async function MdxRenderer({ source, className }: MdxProps) {
  return (
    <Suspense>
      <div className={cn(className, "w-full max-w-full flex-col overflow-hidden rounded-md text-sm")}>
        <MDXRemote
          source={source}
          components={{ H1, H2, H3, Button, Link, Shell, Icons, FeatureCard, PriceCard, Accordion }}
        ></MDXRemote>
      </div>
    </Suspense>
  );
}
