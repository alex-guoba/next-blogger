import { cn } from "@/lib/utils";
import { renderBlock } from "../render";

interface ColumnListBlockProps {
  block: any;
  level: number,
  className?: string | undefined;
}

export function ColumnListRender({ block, level, className }: ColumnListBlockProps) {
  const {
    id,
    children
  } = block;

  return (
    <div key={id} className={cn(className, "flex overflow-hidden w-full max-w-full md:gap-8 flex-col md:flex-row")}>
        {children.map((childBlock: any) => renderBlock(childBlock, level))}
    </div>
  );
}


export function ColumnRender({ block, level, className }: ColumnListBlockProps) {
    const {
      id,
      children
    } = block;
  
    return (
      <div key={id} className={cn(className, "flex flex-1 flex-col py-3 overflow-hidden ")}>
          {children.map((childBlock: any) => renderBlock(childBlock, level))}
      </div>
    );
  }
  