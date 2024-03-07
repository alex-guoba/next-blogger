import { cn } from "@/lib/utils";
import { RenderBlock } from "../render";

interface SyncedBlocksProp {
  block: any;
  className?: string | undefined;
  level?: number;
}

// https://developers.notion.com/reference/block#synced-block
export function SyncedBlockRenderer({ block, className, level = 1 }: SyncedBlocksProp) {
  const {
    id,
    children,
    synced_block: { synced_from },
  } = block;

  if (!children) {
    return null;
  }

  const hover = synced_from ? "hover:border-red-200 " : "hover:border-red-400";
  return (
    <div
      key={id}
      className={cn(className, `flex flex-1 flex-col overflow-hidden rounded-md border border-white p-1 ${hover}`)}
    >
      {children.map((child: any) => (
        <RenderBlock key={child.id} block={child} level={level + 1}></RenderBlock>
      ))}
    </div>
  );
}
