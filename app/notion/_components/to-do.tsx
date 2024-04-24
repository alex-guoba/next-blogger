import { cn } from "@/lib/utils";
import RichText, { ColorMap } from "../text";
import { IndentChildren } from "../helper/render-helper";

interface TodoProps {
  block: any;
  level?: number;
  className?: string | undefined;
}

export function TodoRender({ block, className, level = 0 }: TodoProps) {
  const {
    id,
    children,
    to_do: { rich_text, checked, color },
  } = block;

  const style = ColorMap.get(color) || "";
  return (
    <div key={id} className={cn(className, style)}>
      <label htmlFor={id}>
        <input
          className="mx-1 my-1.5 h-[1.1rem] w-[1.1rem] rounded-none border-8 border-inherit align-middle"
          type="checkbox"
          id={id}
          defaultChecked={checked}
        />
        {checked ? (
          <RichText title={rich_text} className="text-gray-500 line-through" />
        ) : (
          <RichText title={rich_text} />
        )}
      </label>
      {/**/}
      {children && <IndentChildren cb={children} level={level + 1}></IndentChildren>}
    </div>
  );
}
