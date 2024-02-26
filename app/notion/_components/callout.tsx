import { cn } from "@/lib/utils";
import { IconRender } from "./emoji";
import RichText from "../text";

interface CalloutBlockProps {
  block: any;
  className?: string | undefined;
}

export function CalloutRender({ block, className }: CalloutBlockProps) {
  const {
    id,
    callout: { icon, rich_text },
  } = block;
  return (
    <div
      key={id}
      className={cn(
        className,
        "box-border inline-flex w-full items-center rounded-[4px] border border-none bg-stone-100 p-4"
      )}
    >
      {icon && <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file} />}
      <div className="ml-3 whitespace-pre-wrap break-words">
        <RichText title={rich_text} />
      </div>
    </div>
  );
}
