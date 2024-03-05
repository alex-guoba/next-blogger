import { cn } from "@/lib/utils";
import { renderBlock } from "../render";
import RichText, { ColorMap } from "../text";
import { IndentChildren } from "../render-helper";

export const numberListStyle = (level: number): string => {
  const dep = ((level + 1) / 2) % 3;
  if (dep == 0) {
    return "list-roman";
  }
  if (dep == 1) {
    return "list-decimal";
  }
  return "list-alpha";
};

export const bulletListStyle = (level: number): string => {
  const dep = ((level + 1) / 2) % 2;
  if (dep == 0) {
    return "list-circle";
  }
  return "list-disc";
};

interface ListProps {
  block: any;
  level?: number;
  className?: string | undefined;
}

export function ListRenderer({ block, level = 0, className }: ListProps) {
  const { id, type } = block;
  const value = block[type];

  if (type == "bulleted_list") {
    return (
      <ul key={id} className={cn(className, bulletListStyle(level), "list-inside space-y-0.5")}>
        {value?.children && value.children.map((child: any, index: number) => renderBlock(child, level + 1, index))}
      </ul>
    );
  }

  if (type == "numbered_list") {
    return (
      <ol key={id} className={cn(className, numberListStyle(level), "list-inside space-y-0.5")}>
        {value?.children && value.children.map((child: any, index: number) => renderBlock(child, level + 1, index))}
      </ol>
    );
  }
  return null;
}

export function ListItemRenderer({ block, level = 0, className }: ListProps) {
  const { id, type } = block;
  const value = block?.[type];

  const color = ColorMap.get(value?.color);
  return (
    <li key={id} className={cn(className, color, "pl-1 pt-1")}>
      {value?.rich_text && <RichText title={value.rich_text} className="whitespace-pre-wrap" />}
      {block.children && <IndentChildren cb={block.children} level={level+1}></IndentChildren>}
    </li>
  );
}

// function renderNestedList(blocks: any, level: number) {
//   const { type } = blocks;
//   const value = blocks[type];

//   if (!value) return null;

//   const isNumberedList = blocks.children[0].type === "numbered_list_item";
//   if (isNumberedList) {
//     // style not neccessary for grand-child lists as it will inherit from parent
//     return <div>{blocks.children.map((block: any, index: number) => renderBlock(block, level, index))}</div>;
//   }
//   return <div>{blocks.children.map((block: any, index: number) => renderBlock(block, level, index))}</div>;
// }
