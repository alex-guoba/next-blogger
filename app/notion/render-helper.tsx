import { renderBlock } from "./render";


export function IndentChildren({ cb, level = 0 }: { cb: any; level: number }) {
  if (!cb) {
    return null;
  }
  
  return (
    <div className="flex w-full max-w-full">
      <div className="h-auto w-6"></div>
      <div className="flex w-full max-w-full flex-col gap-y-0.5">
        {cb && cb.map((child: any, index: number) => renderBlock(child, level, index))}
      </div>
    </div>
  );
}
