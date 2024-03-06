import React from "react";

import RichText from "./text";
// import { bulletListStyle, numberListStyle } from "./tools";
// import { cn } from "@/lib/utils";

import { ShikiCodeRender } from "./_components/code";
import { CalloutRender } from "./_components/callout";
import { ImageRender } from "./_components/image";
import { BookmarkPreviewRender } from "./_components/bookmark";
import { FileRender } from "./_components/file";
import { ColumnListRender, ColumnRender } from "./_components/column";
import { QuoteRender } from "./_components/quote";
import { TableRenderer } from "./_components/table";
import { EquationRender } from "./_components/equation";
import { LinkPreviewRender } from "./_components/link-preview";
import { PdfRenderer } from "./_components/pdf";
import { SubPageRender } from "./_components/sub-page";
import { VideoRender } from "./_components/video";
import { EmbedRender } from "./_components/embed";
import { SyncedBlockRenderer } from "./_components/synced-block";
import { ChildDatabaseRenderer } from "./_components/child-database";
import { ParagraphRender } from "./_components/paragraph";
import { TodoRender } from "./_components/to-do";
import { ListItemRenderer, ListRenderer } from "./_components/list";
import { ToggleRender } from "./_components/toggle";

interface BlockProps {
  block: any;
  level?: number;
}

export function RenderBlock({block, level= 1} : BlockProps) {
  const { type, id } = block;
  const value = block[type];

  // console.log(type, id, level);

  switch (type) {
    case "paragraph":
      return <ParagraphRender block={block}></ParagraphRender>;

    case "heading_1":
      return (
        <h1 key={id} id={id} className="mt-1.5 py-4 text-3xl font-bold dark:text-white">
          <RichText title={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 key={id} id={id} className="mt-1.5 py-3 text-2xl font-bold dark:text-white">
          <RichText title={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={id} id={id} className="text-1xl mt-1.5 py-2 font-bold dark:text-white">
          <RichText title={value.rich_text} />
        </h3>
      );

    // before list rendering, array should be convert into children array. See getBlocks function.
    case "bulleted_list":
    case "numbered_list":
      return <ListRenderer block={block} level={level}></ListRenderer>;

    case "bulleted_list_item":
    case "numbered_list_item":
      return <ListItemRenderer block={block} level={level}></ListItemRenderer>;

    case "to_do":
      return <TodoRender block={block}></TodoRender>;

    case "toggle":
      return <ToggleRender block={block}></ToggleRender>;

    case "child_page":
      return <SubPageRender block={block}></SubPageRender>;

    case "image":
      return <ImageRender block={block}></ImageRender>;

    case "divider":
      return (
        <div className="my-2 border-gray-200">
          <hr key={id} />
        </div>
      );

    case "embed":
      return <EmbedRender block={block}></EmbedRender>;

    case "quote":
      return <QuoteRender block={block} level={level}></QuoteRender>;

    case "code":
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ShikiCodeRender block={block}></ShikiCodeRender>
        </React.Suspense>
      );

    case "file":
      return <FileRender block={block}></FileRender>;

    case "pdf":
      return <PdfRenderer block={block}></PdfRenderer>;

    case "bookmark":
      return <BookmarkPreviewRender block={block}></BookmarkPreviewRender>;

    case "link_preview":
      return <LinkPreviewRender block={block}></LinkPreviewRender>;

    case "table":
      return <TableRenderer block={block}></TableRenderer>;

    case "column_list":
      return <ColumnListRender block={block} level={level}></ColumnListRender>;

    case "column":
      return <ColumnRender block={block} level={level}></ColumnRender>;

    case "callout":
      return <CalloutRender block={block}></CalloutRender>;

    case "equation":
      return <EquationRender block={block} displayMode={true}></EquationRender>;

    case "video":
      return <VideoRender block={block}></VideoRender>;

    case "synced_block":
      return <SyncedBlockRenderer block={block}></SyncedBlockRenderer>;

    case "child_database":
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ChildDatabaseRenderer block={block}></ChildDatabaseRenderer>
        </React.Suspense>
      );

    default:
      return <p key={id}>{`❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`}</p>;
  }
}
