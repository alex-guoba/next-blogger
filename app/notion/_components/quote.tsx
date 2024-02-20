import { cn } from "@/lib/utils";
import RichText from "../text";
// import { Icons } from "@/components/icons";
import { renderNestedList } from "../render";

interface QuoteBlockProps {
  block: any;
  level: number
  className?: string | undefined;
}

export function QuoteRender({ block, level, className }: QuoteBlockProps) {
  const {
    id,
    children,
    quote: { rich_text },
  } = block;

  return (
    <blockquote className={cn(className, "border-black border-l-4 pl-4 py-1.5 whitespace-pre-wrap")} key={id}>
        <RichText title={rich_text} />
        {!!block.children && renderNestedList(block, level + 1)}
    </blockquote>
    );
}
