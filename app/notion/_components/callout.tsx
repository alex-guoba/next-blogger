import { cn } from "@/lib/utils";
import { IconRender } from "./emoji";
import RichText from "../text";

interface CalloutBlockProps {
  block: any;
  className?: string | undefined;
}

export function CalloutRender({ block, className }: CalloutBlockProps) {
  const {id, callout: {icon, rich_text}} = block;
  return (
    <div id={id} 
      className={cn(
        className,
        "inline-flex w-full items-center box-border border rounded-[4px] border-none p-4 bg-stone-100"
      )}
    >
      {icon && (
        <IconRender type={icon.type} emoji={icon.emoji} external={icon.external} file={icon.file}/>
      )}
      <div className="whitespace-pre-wrap break-words ml-3">
         <RichText title={rich_text} />
      </div>
    </div>
  );
}
