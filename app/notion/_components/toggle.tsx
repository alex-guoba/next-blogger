import { cn } from "@/lib/utils";
import RichText, { ColorMap } from "../text";
import React from "react";
import { RenderBlock } from "../render";

interface ToggleProps {
  block: any;
  level?: number;
  className?: string | undefined;
}

export function ToggleRender({ block, className, level = 0 }: ToggleProps) {
  const {
    id,
    children,
    toggle: { rich_text, color },
  } = block;

  const style = ColorMap.get(color) || "";
  return (
    <div key={id} className={cn(className, style)}>
      <details key={id} className="my-1">
        <summary>
          <RichText title={rich_text} />
        </summary>

        <div className="ml-2">
          {children?.map((child: any) => <RenderBlock key={child.id} block={child} level={level + 1}></RenderBlock>)}
        </div>
      </details>
    </div>
  );
}
