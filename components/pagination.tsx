"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Head from "next/head";
import Link from "next/link";

import { usePathname, useSearchParams } from "next/navigation";
import { Icons } from "./icons";
import { getPageNumbers } from "@/lib/page-numbers";
import { cn } from "@/lib/utils";

interface PaginationProps {
  /**
   * The total number of pages
   */
  total: number;

  /**
   * The max number of per pages
   */
  pageSize: number;
  /**
   * Extra props to pass to the next.js links
   */
  linkProps?: { [key: string]: any };
}

export function PostPagination({ total, pageSize, linkProps }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const isLastPage = currentPage * pageSize >= total;

  const pageNumbers = getPageNumbers({ currentPage, pageSize, total });

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination aria-label="pagination">
      <Head>
        {/* SEO pagination helpers */}
        {currentPage !== 1 ? <link rel="prev" href={`${createPageURL(currentPage - 1)}`} /> : null}
        {!isLastPage ? <link rel="next" href={`${createPageURL(currentPage + 1)}`} /> : null}
      </Head>

      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            rel="prev"
            href={createPageURL(currentPage - 1)}
            prefetch={false}
            className={cn(currentPage == 1 ? "pointer-events-none" : "")}
          ></PaginationPrevious>
        </PaginationItem>

        {pageNumbers.map((pageNumber, i) =>
          pageNumber === "..." ? (
            <PaginationItem key={`${pageNumber}${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={createPageURL(pageNumber)}
                prefetch={false}
                isActive={currentPage == i+1}
              > {i+1} </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            rel="prev"
            href={createPageURL(currentPage + 1)}
            prefetch={false}
            className={cn(isLastPage ? "pointer-events-none" : "")}
          ></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
  
}
