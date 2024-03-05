import { cn } from "@/lib/utils";
import { IconRender } from "./emoji";
import RichText from "../text";
import { RenderBlock } from "../render";
import { IndentChildren } from "../render-helper";

interface CalloutBlockProps {
  block: any;
  level: number;
  className?: string | undefined;
}

export function CalloutRender({ block, className, level = 1 }: CalloutBlockProps) {
  const {
    id,
    children,
    callout: { icon, rich_text },
  } = block;
  return (
    <div
      key={id}
      className={cn(
        className,
        "flex my-0.5 w-full items-center rounded-md border border-none bg-stone-100 p-4 dark:bg-stone-500"
      )}
    >
      {icon && <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file} />}
      <div className="ml-3 whitespace-pre-wrap break-words w-full">
        <div>
          <RichText title={rich_text} />
        </div>
        {children && <IndentChildren cb={children} level={level} blanket={false}></IndentChildren>}
        {/* {children && children.map((child: any) => (
          <RenderBlock key={child.id} block={child} level={level}></RenderBlock>
        ))} */}
      </div>
      </div>
      
  );
}
