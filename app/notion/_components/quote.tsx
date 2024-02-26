import { cn } from "@/lib/utils";
import RichText from "../text";
// import { Icons } from "@/components/icons";
import { renderNestedList } from "../render";

interface QuoteBlockProps {
  block: any;
  level: number;
  className?: string | undefined;
}

export function QuoteRender({ block, level, className }: QuoteBlockProps) {
  const {
    id,
    quote: { rich_text },
  } = block;

  return (
    <blockquote key={id} className={cn(className, "whitespace-pre-wrap border-l-4 border-black py-1.5 pl-4")}>
      <RichText title={rich_text} />
      {!!block.children && renderNestedList(block, level + 1)}
    </blockquote>
  );
}
