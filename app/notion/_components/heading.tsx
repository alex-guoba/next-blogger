import { cn } from "@/lib/utils";
import RichText, { ColorMap } from "../text";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { RenderBlock } from "../render";

const headingVariants = cva("font-bold dark:text-white mt-1.5", {
  variants: {
    variant: {
      heading_1: "py-4 text-3xl",
      heading_2: "py-3 text-2xl",
      heading_3: "py-2 text-1xl",
    },
  },
  defaultVariants: {
    variant: "heading_1",
  },
});

interface HeadingBlockProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof headingVariants> {
  as?: React.ElementType;
  block: any;
  level: number;
}

export function HeadingRender({
  block,
  level = 1,
  className,
  as: Comp = "section",
  variant,
  ...props
}: HeadingBlockProps) {
  const { id, children } = block;
  if (!variant) {
    return null;
  }

  const { is_toggleable, rich_text, color } = block[variant];
  const style = ColorMap.get(color) || "";

  if (!is_toggleable) {
    return (
      <Comp key={id} id={id} className={cn(headingVariants({ variant }), className, style)} {...props}>
        <RichText title={rich_text} />
      </Comp>
    );
  }

  // child blocks when the is_toggleable property is true
  return (
    // <div key={id} =>
    <details key={id} className={cn(className, style)}>
      <summary>
        <Comp key={id} id={id} className={cn(headingVariants({ variant }), "inline-block")} {...props}>
          <RichText title={rich_text} />
        </Comp>
      </summary>

      <div className="ml-2">
        {children?.map((child: any) => <RenderBlock key={child.id} block={child} level={level + 1}></RenderBlock>)}
      </div>
    </details>
  );
}
