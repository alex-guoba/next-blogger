import { Fragment } from "react";
import React from "react";

import RichText from "./text";
import { bulletListStyle, numberListStyle } from "./tools";
import { cn } from "@/lib/utils";

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

export function renderBlock(block: any, level: number = 1, index: number = 0) {
  const { type, id } = block;
  const value = block[type];

  // console.log(type, id);

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
    case "bulleted_list": {
      return (
        <ul key={id} className={cn(bulletListStyle(level), "pl-5 space-y-2")}>
          {value.children.map((child: any, index: number) => renderBlock(child, level + 1, index))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol key={id} className={cn(numberListStyle(level), "pl-5 space-y-2")}>
          {value.children.map((child: any) => renderBlock(child, level + 1, index))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={id}>
          <div className={index == 0 ? "mt-2" : ""}>
          <RichText title={value.rich_text}/>
          </div>
          {!!block.children && renderNestedList(block, level + 1)}
        </li>
      );

    case "to_do":
      return (
        <div key={id} >
          <label htmlFor={id}>
            <input
              className="mr-2 h-4 w-4 rounded-none border-8 align-middle"
              type="checkbox"
              id={id}
              defaultChecked={value.checked}
            />
            {value.checked ? (
              <RichText title={value.rich_text} extended="text-gray-500 line-through" />
            ) : (
              <RichText title={value.rich_text} />
            )}
          </label>
        </div>
      );

    case "toggle":
      return (
        <details key={id} className="">
          <summary>
              <RichText title={value.rich_text} />
          </summary>
          <div className="ml-2">
            {block.children?.map((child: any) => <Fragment key={child.id}>{renderBlock(child, level + 1)}</Fragment>)}
          </div>
        </details>
      );

    case "child_page":
      return <SubPageRender block={block} ></SubPageRender>;

    case "image":
      return <ImageRender block={block} ></ImageRender>;

    case "divider":
      return <hr key={id} className="mt-1.5 border-gray-200" />;

    case "embed":
      return <EmbedRender block={block} ></EmbedRender>;

    case "quote":
      return <QuoteRender block={block}  level={level + 1}></QuoteRender>;

    case "code":
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ShikiCodeRender block={block} ></ShikiCodeRender>
        </React.Suspense>
      );

    case "file":
      return <FileRender block={block} ></FileRender>;

    case "pdf":
      return <PdfRenderer block={block} ></PdfRenderer>;

    case "bookmark":
      return <BookmarkPreviewRender block={block}></BookmarkPreviewRender>;

    case "link_preview":
      return <LinkPreviewRender block={block} ></LinkPreviewRender>;

    case "table":
      return <TableRenderer block={block} ></TableRenderer>;

    case "column_list":
      return <ColumnListRender block={block}  level={level + 1}></ColumnListRender>;

    case "column":
      return <ColumnRender block={block} level={level + 1}></ColumnRender>;

    case "callout":
      return <CalloutRender block={block} ></CalloutRender>;

    case "equation":
      return <EquationRender block={block}  displayMode={true}></EquationRender>;

    case "video":
      return <VideoRender block={block} ></VideoRender>;

    case "synced_block":
      return <SyncedBlockRenderer block={block} ></SyncedBlockRenderer>;

    case "child_database":
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ChildDatabaseRenderer block={block} ></ChildDatabaseRenderer>
        </React.Suspense>
      );

    default:
      return (
        <p key={id} >
          {`❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`}
        </p>
      );
  }
}

export function renderNestedList(blocks: any, level: number) {
  const { type } = blocks;
  const value = blocks[type];

  if (!value) return null;

  const isNumberedList = blocks.children[0].type === "numbered_list_item";
  if (isNumberedList) {
    // style not neccessary for grand-child lists as it will inherit from parent
    return <div>{blocks.children.map((block: any, index: number) => renderBlock(block, level, index))}</div>;
  }
  return <div>{blocks.children.map((block: any, index: number) => renderBlock(block, level, index))}</div>;
}
