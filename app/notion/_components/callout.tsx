import { cn } from "@/lib/utils";
import { IconRender } from "./emoji";
import RichText from "../text";
import { IndentChildren } from "../helper/render-helper";

interface CalloutBlockProps {
  block: any;
  level?: number;
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
      className={cn(className, "my-0.5 flex w-full items-center rounded-md border border-none bg-muted p-4 ")}
    >
      {icon && <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file} />}
      <div className="ml-3 w-full whitespace-pre-wrap break-words">
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
