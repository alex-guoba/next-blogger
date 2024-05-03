import React from "react";
import { cn } from "@/lib/utils";

// import RichText from "../text";
import { bundledLanguages, codeToHtml } from "shiki";
import { rawText } from "../block-parse";
import CopyToClipboard from "../helper/copy-to-clipboard";
import { MdxRenderer } from "./mdx/mdx";
import { env } from "@/env.mjs";

interface CodeBlockProps {
  block: any;
  defaultLanguage?: string | undefined;
  className?: string | undefined;
}

// shiki render
export async function ShikiCodeRender({ block, defaultLanguage, className }: CodeBlockProps) {
  const { code, id, type } = block;
  if (type != "code" || !code) {
    return null;
  }

  let lang = (code.language || defaultLanguage).toLowerCase();

  // https://shiki.style/languages
  if (lang == "c++") {
    lang = "cpp";
  } else if (lang == "assembly") {
    lang = "asm";
  }
  if (!(lang in bundledLanguages)) {
    lang = "text"; // fallback language
  }

  const codes = rawText(code?.rich_text);
  if (codes.length == 0) {
    return null;
  }

  if (lang == "markdown" && env.RENDER_MDX) {
    return <MdxRenderer className={className} source={codes}></MdxRenderer>;
  }

  // const highlighter = await getHighlighter({
  //   langs: [lang],
  //   themes: [theme],
  // });

  // const html = await highlighter.codeToHtml(codes, {
  //   lang: lang,
  //   theme: theme,
  // });

  const theme = "github-dark";
  const html = await codeToHtml(codes, {
    lang,
    theme,
  });

  let caption = `[${lang}] ${rawText(code?.caption)}`;

  return (
    <div key={id} className={cn(className, "w-full max-w-full flex-col overflow-hidden rounded-md text-sm")}>
      <div className="flex items-center justify-between bg-gradient-to-r from-neutral-800 to-neutral-700">
        <span className="px-4 text-primary-foreground">{caption}</span>
        <CopyToClipboard code={codes} />
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: `<pre class="language-${lang}" style="overflow: auto; background: #24292e; padding: 1em; " tabIndex="0"><code class="language-${lang}">${html}</code></pre>`,
        }}
      />
      {/* {caption && caption.length > 0 && (
        <figcaption className="px-1.5 text-sm font-normal text-slate-600">
          <RichText title={caption} />
        </figcaption>
      )} */}
    </div>
  );
}
