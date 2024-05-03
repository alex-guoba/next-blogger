"use client"; // Error components must be Client Components

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import Shell from "@/components/shells/shell";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <Shell as="article" className="relative flex min-h-screen flex-col">
        <PageHeader>
          <PageHeaderHeading>Error</PageHeaderHeading>
          <PageHeaderDescription size="sm" className="text-center">
            Something went wrong, try again later
          </PageHeaderDescription>
        </PageHeader>

        <Link href="/" className={cn(buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" }))}>
          <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          See all posts
          <span className="sr-only">See all posts</span>
        </Link>
      </Shell>
      {/* <h2>Something went wrong, try again later!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button> */}
    </div>
  );
}
