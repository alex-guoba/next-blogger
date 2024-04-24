import React from "react";
import { RenderBlock } from "../render";

export function IndentChildren({ cb, level = 0, blanket = true }: { cb: any; level: number; blanket?: boolean }) {
  if (!cb) {
    return null;
  }

  return (
    <div className="flex w-full max-w-full">
      {blanket && <div className="h-auto w-6"></div>}
      <div className="flex w-full max-w-full flex-col gap-y-0.5">
        {/* {cb && cb.map((child: any) => renderBlock(child, level))} */}
        {cb &&
          cb.map((child: any) => (
            // <React.Fragment key={index}>{RenderBlock(child, level)}</React.Fragment>
            <RenderBlock key={child.id} block={child} level={level}></RenderBlock>
          ))}
      </div>
    </div>
  );
}
