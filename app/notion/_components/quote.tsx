import { cn } from "@/lib/utils";
import RichText from "../text";
import { RenderBlock } from "../render";

interface QuoteBlockProps {
  block: any;
  level: number;
  className?: string | undefined;
}

export function QuoteRender({ block, level = 1, className }: QuoteBlockProps) {
  const {
    id,
    children,
    quote: { rich_text },
  } = block;

  return (
    <blockquote key={id} className={cn(className, "my-1.5 whitespace-pre-wrap border-l-[3px] border-black pl-4")}>
      <RichText title={rich_text} />
      {children &&
        children.map((child: any) => <RenderBlock key={child.id} block={child} level={level + 1}></RenderBlock>)}
    </blockquote>
  );
}
