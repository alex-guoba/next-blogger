import { Fragment } from "react";
// import Link from 'next/link';

import RichText from "./text";
// import styles from './post.module.css';
import { bulletListStyle, numberListStyle } from "./tools";
import { cn } from "@/lib/utils";
import React from "react";
import { CodeRender } from "./_components/code";
import { CalloutRender } from "./_components/callout";
import { ImageRender } from "./_components/image";
import { BookmarkPreviewRender } from "./_components/bookmark";
import { FileRender } from "./_components/file";
import { ColumnListRender, ColumnRender } from "./_components/column";
import { QuoteRender } from "./_components/quote";
import { TableRender } from "./_components/table";
import { EquationRender } from "./_components/equation";
import { LinkPreviewRender } from "./_components/link-preview";
import { PDFRender } from "./_components/pdf";
import { SubPageRender } from "./_components/sub_page";
import { VideoRender } from "./_components/video";
import { EmbedRender } from "./_components/embed";

export function renderBlock(block: any, level: number = 1) {
  const { type, id } = block;
  const value = block[type];

  // console.log(type, id);

  switch (type) {
    // https://developers.notion.com/reference/block#paragraph
    // RichText:
    // - 当包含多段不同样式的文本时，会被拆分为对应的多个 paragraph.rich_text[]，包括：带link、bold、strikethrough、italic、code（使用``包裹）的文本
    // - 空白换行
    // - mention: no rich_text exist
    case "paragraph":
      return (
        <p key={id} className="mt-1.5">
          <RichText title={value.rich_text} extended="whitespace-pre-wrap" />
        </p>
      );
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
        <ul key={id} className={cn(bulletListStyle(level), level == 1 ? "mt-1.5" : "", "pl-5")}>
          {value.children.map((child: any) => renderBlock(child, level + 1))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol key={id} className={cn(numberListStyle(level), level == 1 ? "mt-1.5" : "", "pl-5")}>
          {value.children.map((child: any) => renderBlock(child, level + 1))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={id} className="mt-1.5">
          <RichText title={value.rich_text} />
          {!!block.children && renderNestedList(block, level + 1)}
        </li>
      );

    case "to_do":
      return (
        <div key={id} className="mt-1.5">
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
        <details key={id} className="mt-1.5">
          <summary>
            <RichText title={value.rich_text} />
          </summary>
          <div className="ml-4">
            {block.children?.map((child: any) => <Fragment key={child.id}>{renderBlock(child, level + 1)}</Fragment>)}
          </div>
        </details>
      );

    case "child_page":
      return <SubPageRender block={block} className="mt-1.5"></SubPageRender>;

    case "image":
      return <ImageRender block={block} className="mt-1.5"></ImageRender>;

    case "divider":
      return <hr key={id} className="mt-1.5 border-gray-200"/>;

    case "embed":
      return <EmbedRender block={block} className="mt-1.5"></EmbedRender>;

    case "quote":
      return <QuoteRender block={block} className="mt-1.5" level={level + 1}></QuoteRender>;

    case "code":
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <CodeRender block={block} className="mt-1.5"></CodeRender>
        </React.Suspense>
      );

    case "file":
      return <FileRender block={block} className="mt-1.5"></FileRender>;

    case "pdf":
      return <PDFRender block={block} className="mt-1.5"></PDFRender>;

    case "bookmark":
      return <BookmarkPreviewRender block={block} className="mt-1.5"></BookmarkPreviewRender>;

    case "link_preview":
      return <LinkPreviewRender block={block} className="mt-1.5"></LinkPreviewRender>;

    case "table":
      return <TableRender block={block} className="mt-1.5"></TableRender>;

    case "column_list":
      return <ColumnListRender block={block} className="mt-1.5" level={level + 1}></ColumnListRender>;

    case "column":
      return <ColumnRender block={block} level={level + 1}></ColumnRender>;

    case "callout":
      return <CalloutRender block={block} className="mt-1.5"></CalloutRender>;

    case "equation":
      return <EquationRender block={block} className="mt-1.5" displayMode={true}></EquationRender>;

    case "video":
      return <VideoRender block={block} className="mt-1.5"></VideoRender>;

    default:
      return <p key={id} className="mt-1.5">
        {`❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`}
      </p>;
  }
}

export function renderNestedList(blocks: any, level: number) {
  const { type } = blocks;
  const value = blocks[type];

  if (!value) return null;

  const isNumberedList = blocks.children[0].type === "numbered_list_item";
  if (isNumberedList) {
    // style not neccessary for grand-child lists as it will inherit from parent
    return <div>{blocks.children.map((block: any) => renderBlock(block, level))}</div>;
  }
  return <div>{blocks.children.map((block: any) => renderBlock(block, level))}</div>;
}
