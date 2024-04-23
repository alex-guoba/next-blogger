import { cn } from "@/lib/utils";
// import styles from "./post.module.css";
import React from "react";
import { EquationRender } from "./_components/equation";

// convert notion color to tailwind css class name for each annotation style:
// - "blue"
// - "blue_background"
// - "brown"
// - "brown_background"
// - "default"
// - "gray"
// - "gray_background"
// - "green"
// - "green_background"
// - "orange"
// -"orange_background"
// - "pink"
// - "pink_background"
// - "purple"
// - "purple_background"
// - "red"
// - "red_background”
// - "yellow"
// - "yellow_background"
// see: https://davidpiesse.github.io/tailwind-md-colours/
export const ColorMap = new Map<string, string>([
  ["blue", "text-blue-400"],
  ["blue_background", "bg-blue-200"],
  ["brown", "text-[#8d6e63]"],
  ["brown_background", "bg-[#d7ccc8]"],
  ["default", ""],
  ["gray", "text-gray-500"],
  ["gray_background", "bg-gray-200"],
  ["green", "text-green-800"],
  ["green_background", "bg-green-100"],
  ["orange", "text-orange-500"],
  ["orange_background", "bg-orange-100"],
  ["pink", "text-pink-400"],
  ["pink_background", "bg-pink-200"],
  ["purple", "text-purple-400"],
  ["purple_background", "bg-purple-100"],
  ["red", "text-red-600"],
  ["red_background", "bg-red-100"],
  ["yellow", "text-yellow-600"],
  ["yellow_background", "bg-yellow-100"],
]);

const linkTextStyle = "text-gray-500 underline underline-offset-4 decoration-1";

// https://developers.notion.com/reference/rich-text#the-annotation-object
function annotationStyle(annotations: any, className?: string) {
  const { bold, code, color, italic, strikethrough, underline } = annotations;
  const names = [
    bold ? "font-bold" : "",
    code ? "text-ring bg-muted px-1" : "",
    italic ? "italic" : "",
    strikethrough ? "line-through" : "",
    underline ? "underline underline-offset-4 decoration-1" : "",
    color ? ColorMap.get(color) : "",
    className ? className : "",
  ];

  return names.filter((el) => el != "" && el != undefined).join(" ");
}

function text(rt: any, className: string = "", index: number = 0) {
  const { annotations, text } = rt;
  const styels = annotationStyle(annotations, className);
  return (
    <span
      className={styels}
      key={index}
      // key={text.content}
    >
      {text.link ? (
        <a href={text.link.url} className={linkTextStyle}>
          {text.content}
        </a>
      ) : (
        text.content
      )}
    </span>
  );
}

// https://developers.notion.com/reference/rich-text#mention
function mention(rt: any, className: string = "", index: number = 0) {
  const { mention, annotations, href, plain_text } = rt;
  const styels = annotationStyle(annotations, className);
  const color = mention?.type == "date" ? "text-gray-500" : "";
  const plain = mention?.type == "date" ? `@${plain_text}` : plain_text;

  return (
    <span className={cn(styels, "font-medium", color)} key={index}>
      {href ? (
        <a className="underline decoration-1 underline-offset-4" href={href}>
          {plain}
        </a>
      ) : (
        plain
      )}
    </span>
  );
}

function equation(rt: any, className: string = "", index: number = 0) {
  const { annotations } = rt;
  const styels = annotationStyle(annotations, className);
  return (
    <span className={cn(styels, "mt-1.5")} key={index}>
      <EquationRender block={rt} displayMode={false}></EquationRender>
    </span>
  );
}

// Notion uses rich text to allow users to customize their content.
// Rich text refers to a type of document where content can be styled and formatted in a variety of customizable ways.
// This includes styling decisions, such as the use of italics, font size, and font color, as well as formatting,
// such as the use of hyperlinks or code blocks.
// See:  https://developers.notion.com/reference/rich-text
export default function RichText({ title, className }: any) {
  // empmty lines should be rendered with &emsp
  if (!title || title?.length == 0) {
    return <span>&nbsp;</span>;
  }

  return (
    <React.Fragment>
      {title.map((value: any, index: number) => {
        const { type } = value;
        if (type == "text") {
          return text(value, className, index);
        } else if (type == "mention") {
          return mention(value, className, index);
        } else if (type == "equation") {
          return equation(value, className, index);
        }
        return null;
      })}
    </React.Fragment>
  );
}
