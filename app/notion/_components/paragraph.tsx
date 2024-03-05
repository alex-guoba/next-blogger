import { cn } from "@/lib/utils";
import RichText, { ColorMap } from "../text";
import { IndentChildren } from "../render-helper";

interface ParagraphProps {
  block: any;
  level?: number;
  className?: string | undefined;
}

export function ParagraphRender({ block, level = 0, className }: ParagraphProps) {
  const {
    id,
    children,
    paragraph: { rich_text, color },
  } = block;

  const style = ColorMap.get(color) || "";
  return (
    <div key={id} className={cn(className, style)}>
      <p className="p-1">
        <RichText title={rich_text} className="whitespace-pre-wrap" />
      </p>
      {children && <IndentChildren cb={children} level={level}></IndentChildren>}
    </div>
  );
}
