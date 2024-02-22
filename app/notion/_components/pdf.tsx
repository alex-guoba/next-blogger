"use client";

import { cn } from "@/lib/utils";
import React from "react";
// import RichText from "../text";
import { Document, Page, pdfjs } from "react-pdf";
import { Icons } from "@/components/icons";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.js",
//     import.meta.url,
//   ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PDFBlockProps {
  block: any;
  className?: string | undefined;
}

export function PDFRender({ block, className }: PDFBlockProps) {
  const {
    id,
    pdf: { file, external, caption },
  } = block;

  const [numPages, setNumPages] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState<number>(1); // start on first page
  const [loading, setLoading] = React.useState(true);
  const [pageWidth, setPageWidth] = React.useState(0);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }

//   const options = {
//     cMapUrl: "cmaps/",
//     cMapPacked: true,
//     standardFontDataUrl: "standard_fonts/",
//   };

  // Go to next page
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  const url = external?.url || file?.url;
  if (!url) {
    return null;
  }

  let title = "bookmark";
  if (caption && caption.length > 0) {
    title = caption[0].plain_text;
  }

  return (
    <div key={id} className={cn(className, "w-full max-w-ful min-w-full")}>
      <Nav pageNumber={pageNumber} numPages={numPages} title={title} />
      <div
        hidden={loading}
        style={{ height: "calc(100vh - 192px)" }}
        className="flex items-center"
      >
        <div
          className={`flex items-center justify-between w-full max-w-full absolute z-10 px-2`}
        >
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="relative h-[calc(100vh - 192px)] px-2  text-gray-400 hover:text-gray-50 focus:z-20"
          >
            {/* <span className="sr-only">Previous</span> */}
            <Icons.caretLeft className="h-10 w-10" aria-hidden="true" />
          </button>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages!}
            className="relative h-[calc(100vh - 192px)] px-2 text-gray-400 hover:text-gray-50 focus:z-20"
          >
            {/* <span className="sr-only">Next</span> */}
            <Icons.caretRight className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="flex justify-center mx-auto h-full">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            // options={options}
            renderMode="canvas"
            className=""
          >
            <Page
              className=""
              key={pageNumber}
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={onPageLoadSuccess}
              onRenderError={() => setLoading(false)}
              // width={Math.max(pageWidth * 0.75, 320)}
            />
          </Document>
        </div>
      </div>
      {/* <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
        <Page key=""></Page>
      </Document> */}
    </div>
  );
}

function Nav({
  pageNumber,
  numPages,
  title,
}: {
  pageNumber: number;
  numPages: number;
  title: string;
}) {
  return (
    <nav className="bg-gray-400 rounded-md">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="text-2xl font-bold tracking-tighter text-white">
                {title}
              </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
              <span>{pageNumber}</span>
              <span className="text-gray-400"> / {numPages}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}