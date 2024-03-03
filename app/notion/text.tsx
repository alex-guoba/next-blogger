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

const linkTextStyle = "text-gray-500 underline";

// https://developers.notion.com/reference/rich-text#the-annotation-object
function AnnotationStyle(annotations: any, extended?: string) {
  const { bold, code, color, italic, strikethrough, underline } = annotations;
  const names = [
    bold ? "font-bold" : "",
    code ? "text-red-600 bg-slate-200	px-1" : "",
    italic ? "italic" : "",
    strikethrough ? "line-through" : "",
    underline ? "underline" : "",
    color ? ColorMap.get(color) : "",
    extended ? extended : "",
  ];

  return names.filter((el) => el != "" && el != undefined).join(" ");
}

function Text(rt: any, extended?: string, index?: number) {
  const { annotations, text } = rt;
  const styels = AnnotationStyle(annotations, extended);
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
function Mention(rt: any, extended?: string, index?: number) {
  const { annotations, href, plain_text } = rt;
  const styels = AnnotationStyle(annotations, extended);

  return (
    <span className={cn(styels, "font-medium")} key={index}>
      {href ? (
        <a className="underline" href={href}>
          {plain_text}
        </a>
      ) : (
        plain_text
      )}
    </span>
  );
}

function Equation(rt: any, extended?: string, index?: number) {
  const { annotations } = rt;
  const styels = AnnotationStyle(annotations, extended);
  // console.log("quation", equation.expression)
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
export default function RichText({ title, extended }: any) {
  // empmty lines should be rendered with &emsp
  if (!title || title?.length == 0) {
    return <span>&nbsp;</span>;
  }

  return (
    <React.Fragment>
      {title.map((value: any, index: number) => {
        const { type } = value;
        if (type == "text") {
          return Text(value, extended, index);
        } else if (type == "mention") {
          return Mention(value, extended, index);
        } else if (type == "equation") {
          return Equation(value, extended, index);
        }
        return null;
      })}
    </React.Fragment>
  );
}
