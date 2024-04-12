// "use client";

import React from "react";
import { cn } from "@/lib/utils";

import RichText from "../text";
import { bundledLanguages, getHighlighter } from "shiki";
import { rawText } from "../block-parse";

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

  const theme = "github-dark";
  const codes = rawText(code?.rich_text);

  const highlighter = await getHighlighter({
    langs: [lang],
    themes: [theme],
  });

  const html = await highlighter.codeToHtml(codes, {
    lang: lang,
    theme: theme,
  });

  const caption = code.caption;

  return (
    <div key={id} className={cn(className, "w-full max-w-full flex-col overflow-hidden text-sm")}>
      <div
        dangerouslySetInnerHTML={{
          __html: `<pre class="language-${lang}" style="background: #24292e; padding: 1em; margin: 0.5em 0px; border-radius: 0.375rem; overflow: auto;" tabIndex="0"><code class="language-${lang}">${html}</code></pre>`,
        }}
      />
      {caption && caption.length > 0 && (
        <figcaption className="px-1.5 text-sm font-normal text-slate-600">
          <RichText title={caption} />
        </figcaption>
      )}
    </div>
  );
}
