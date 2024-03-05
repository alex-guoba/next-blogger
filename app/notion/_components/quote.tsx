import { cn } from "@/lib/utils";
import RichText from "../text";
import { renderBlock } from "../render";

interface QuoteBlockProps {
  block: any;
  level: number;
  className?: string | undefined;
}

export function QuoteRender({ block, level, className }: QuoteBlockProps) {
  const {
    id,
    children,
    quote: { rich_text },
  } = block;

  return (
    <blockquote key={id} className={cn(className, "whitespace-pre-wrap border-l-[3px] border-black my-1.5 pl-4")}>
      <RichText title={rich_text} />
      {children && children.map((child: any, index: number) => renderBlock(child, level, index))}
    </blockquote>
  );
}
