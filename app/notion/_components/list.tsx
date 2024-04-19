import { cn } from "@/lib/utils";
import { RenderBlock } from "../render";
import RichText, { ColorMap } from "../text";
// import { IndentChildren } from "../render-helper";

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

// notion应该是使用了div来代替li，样式上会有差别。为保留html语义，这里保留list实现
// see https://stackoverflow.com/questions/4373046/css-control-space-between-bullet-and-li
export function ListRenderer({ block, level = 0, className }: ListProps) {
  const { id, type } = block;
  const value = block[type];

  if (type == "bulleted_list") {
    return (
      <ul key={id} className={cn(className, bulletListStyle(level), "list-outside space-y-1 pl-6 marker:text-lg")}>
        {value?.children &&
          value.children.map((child: any) => (
            <RenderBlock key={child.id} block={child} level={level + 1}></RenderBlock>
          ))}
      </ul>
    );
  }

  if (type == "numbered_list") {
    return (
      <ol key={id} className={cn(className, numberListStyle(level), "list-outside space-y-1 pl-6")}>
        {value?.children &&
          value.children.map((child: any) => (
            <RenderBlock key={child.id} block={child} level={level + 1}></RenderBlock>
          ))}
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
    <li key={id} className={cn(className, color, "pl-2 pt-0.5")}>
      {value?.rich_text && <RichText title={value.rich_text} className="whitespace-pre-wrap" />}
      {/* {block.children && <IndentChildren cb={block.children} level={level + 1}></IndentChildren>} */}
      {block.children &&
        block.children.map((child: any) => <RenderBlock key={child.id} block={child} level={level + 1}></RenderBlock>)}
    </li>
  );
}
