"use client";

import { cn } from "@/lib/utils";
import React from "react";
// import RichText from "../text";
import { Document, Page, pdfjs } from "react-pdf";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, ChevronUp, Loader2, RotateCw, Search } from "lucide-react";
import SimpleBar from "simplebar-react";
import { useResizeDetector } from "react-resize-detector";
import { zodResolver } from "@hookform/resolvers/zod";

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

// export function PDFRender({ block, className }: PDFBlockProps) {
//   const {
//     id,
//     pdf: { file, external, caption },
//   } = block;

//   const [numPages, setNumPages] = React.useState(0);
//   const [pageNumber, setPageNumber] = React.useState<number>(1); // start on first page
//   const [loading, setLoading] = React.useState(true);
//   const [pageWidth, setPageWidth] = React.useState(0);

//   function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
//     setNumPages(nextNumPages);
//   }

//   function onPageLoadSuccess() {
//     setPageWidth(window.innerWidth);
//     setLoading(false);
//   }

//   // Go to next page
//   function goToNextPage() {
//     setPageNumber((prevPageNumber) => prevPageNumber + 1);
//   }

//   function goToPreviousPage() {
//     setPageNumber((prevPageNumber) => prevPageNumber - 1);
//   }

//   const url = external?.url || file?.url;
//   if (!url) {
//     return null;
//   }

//   let title = "bookmark";
//   if (caption && caption.length > 0) {
//     title = caption[0].plain_text;
//   }

//   return (
//     <div key={id} className={cn(className, "max-w-ful w-full min-w-full flex-wrap")}>
//       <Nav pageNumber={pageNumber} numPages={numPages} title={title} />
//       <div hidden={loading} style={{ height: "calc(100vh - 192px)" }} className="flex items-center">
//         <div className={`absolute z-10 flex w-full max-w-full items-center justify-between px-2`}>
//           <button
//             onClick={goToPreviousPage}
//             disabled={pageNumber <= 1}
//             className="h-[calc(100vh - 192px)] relative px-2  text-gray-400 hover:text-gray-50 focus:z-20"
//           >
//             {/* <span className="sr-only">Previous</span> */}
//             <Icons.caretLeft className="h-10 w-10" aria-hidden="true" />
//           </button>
//           <button
//             onClick={goToNextPage}
//             disabled={pageNumber >= numPages!}
//             className="h-[calc(100vh - 192px)] relative px-2 text-gray-400 hover:text-gray-50 focus:z-20"
//           >
//             {/* <span className="sr-only">Next</span> */}
//             <Icons.caretRight className="h-10 w-10" aria-hidden="true" />
//           </button>
//         </div>
//         <div className="mx-auto flex h-full justify-center">
//           <Document
//             file={url}
//             onLoadSuccess={onDocumentLoadSuccess}
//             // options={options}
//             renderMode="canvas"
//             className=""
//           >
//             <Page
//               className=""
//               key={pageNumber}
//               pageNumber={pageNumber}
//               renderAnnotationLayer={false}
//               renderTextLayer={false}
//               onLoadSuccess={onPageLoadSuccess}
//               onRenderError={() => setLoading(false)}
//               width={Math.max(pageWidth * 0.75, 320)}
//             />
//           </Document>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Nav({ pageNumber, numPages, title }: { pageNumber: number; numPages: number; title: string }) {
//   return (
//     <nav className="rounded-md bg-gray-400">
//       <div className="mx-auto px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-12 items-center justify-between">
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex flex-shrink-0 items-center">
//               <p className="text-2xl font-bold tracking-tighter text-white">{title}</p>
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <div className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
//               <span>{pageNumber}</span>
//               <span className="text-gray-400"> / {numPages}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
// */

export function PdfRenderer({ block, className }: PDFBlockProps) {
  const {
    id,
    pdf: { file, external, caption },
  } = block;

  const { toast } = useToast();

  const [numPages, setNumPages] = React.useState<number>();
  const [currPage, setCurrPage] = React.useState<number>(1);
  const [scale, setScale] = React.useState<number>(1);
  const [rotation, setRotation] = React.useState<number>(0);
  const [renderedScale, setRenderedScale] = React.useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  const CustomPageValidator = z.object({
    page: z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  // console.log(errors)

  const { width, ref } = useResizeDetector();

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  const url = external?.url || file?.url;
  if (!url) {
    return null;
  }

  return (
    <div key={id} className={cn(className, "flex w-full flex-col items-center rounded-md border bg-white shadow")}>
      <div className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
        <div className="flex items-center gap-1.5">
          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(currPage - 1));
            }}
            variant="ghost"
            aria-label="previous page"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn("h-8 w-12", errors.page && "focus-visible:ring-red-500")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className="space-x-1 text-sm text-zinc-700">
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>

          <Button
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) => (prev + 1 > numPages! ? numPages! : prev + 1));
              setValue("page", String(currPage + 1));
            }}
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1.5" aria-label="zoom" variant="ghost">
                <Search className="h-4 w-4" />
                {scale * 100}%
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(0.8)}>80%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1)}>100%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>150%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>200%</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            variant="ghost"
            className="hidden md:inline"
            aria-label="rotate 90 degrees"
          >
            <RotateCw className="h-4 w-4" />
          </Button>

          {/* <PdfFullscreen fileUrl={url} /> */}
        </div>
      </div>

      <div className="max-h-screen w-full flex-1">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading PDF",
                  description: "Please try again later",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={url}
              className="max-h-full"
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  key={"@" + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width ? width : 1}
                pageNumber={currPage}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                scale={scale}
                rotate={rotation}
                key={"@" + scale}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
