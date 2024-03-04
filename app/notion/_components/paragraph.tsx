import { cn } from "@/lib/utils";
import RichText, { ColorMap } from "../text";

interface ParagraphProps {
  block: any;
  className?: string | undefined;
}

export function ParagraphRender({ block, className }: ParagraphProps) {
  const {
    id,
    paragraph: { rich_text, color },
  } = block;

  const style = ColorMap.get(color) || "";
  return (
    <div key={id} className={cn(className, style)}>
      <p className="p-1">
        <RichText title={rich_text} extended="whitespace-pre-wrap" />
      </p>
    </div>
  );
}
