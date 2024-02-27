// "use client";

import React from "react";
// import { highlightElement } from "prismjs";
// import { languages as Lan } from "prismjs";

// TODO: make it to dynamic
// import "prismjs/components/prism-c.min.js";
// import "prismjs/components/prism-cpp.min.js";
// import "prismjs/components/prism-css-extras.min.js";
// import "prismjs/components/prism-css.min.js";
// import "prismjs/components/prism-javascript.min.js";
// import "prismjs/components/prism-js-extras.min.js";
// import "prismjs/components/prism-json.min.js";
// import "prismjs/components/prism-jsx.min.js";
// import "prismjs/components/prism-tsx.min.js";
// import "prismjs/components/prism-typescript.min.js";
// import "prismjs/components/prism-go.js";
// import "prismjs/components/prism-ini.js";
// import "prismjs/components/prism-shell-session.js";
// import "prismjs/components/prism-bash.min.js";
// import "prismjs/components/prism-java.min.js";
// import "prismjs/components/prism-python.min.js";

// import "prismjs/themes/prism-tomorrow.css";
import { cn } from "@/lib/utils";

import RichText from "../text";
import { bundledLanguages, getHighlighter } from "shiki";
// import type { Highlighter, Lang, Theme } from 'shiki'

// import type { BundledLanguage, BundledTheme } from "shiki"; // Import the types from shiki

interface CodeBlockProps {
  block: any;
  defaultLanguage?: string | undefined;
  className?: string | undefined;
}

// export function CodeRender({ block, defaultLanguage, className }: CodeBlockProps) {
//   const codeRef = React.useRef<HTMLDivElement>(null);
//   React.useEffect(() => {
//     if (codeRef.current) {
//       try {
//         highlightElement(codeRef.current);
//       } catch (err) {
//         console.warn("prismjs highlight error", err);
//       }
//     }
//   }, [codeRef]);

//   const { code, id, type } = block;
//   if (type != "code" || !code) {
//     return null;
//   }

//   let lang = (code.language || defaultLanguage).toLowerCase();
//   if (lang == "c++") {
//     lang = "cpp";
//   }
//   const caption = code.caption;

//   // Text cann't be nested in code element. So there are two ways to render code
//   // Solution 1: Replace code with div tag.
//   // Solution 2: Render all raw plain-text
//   let codes = "";
//   code.rich_text?.map((item: any) => {
//     codes += item?.plain_text;
//   });

//   // TODO: 1. add copy to clipboard feature
//   // TODO: 2. support mermaid diagram. see https://stackblitz.com/edit/react-ts-mermaid?file=Mermaid.tsx
//   return (
//     <div key={id} className={cn(className, "text-sm")}>
//       <pre className="rounded py-8">
//         <code className={`language-${lang}`} ref={codeRef}>
//           {codes}
//         </code>
//       </pre>

//       {caption && caption.length > 0 && (
//         <figcaption className="px-1.5 text-sm font-normal text-slate-600">
//           <RichText title={caption} />
//         </figcaption>
//       )}
//     </div>
  // );

  // Solution 3:  https://drupal-way.com/blog/nextjs-and-prismjs-integration
  // const highlightedCode = Prism.highlight(codes, Lan[lang], lang);
  // return <div
  //   dangerouslySetInnerHTML={{__html: `<pre class="language-${lang}" tabIndex="0"><code class="language-${lang}">${highlightedCode}</code></pre>`}}
  //   />
// }

// let highlighter: Highlighter;

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
    throw new Error('Unsupported language "' + lang + '"');
  }

  const theme = 'github-dark';
  let codes = "";
  code.rich_text?.map((item: any) => {
    codes += item?.plain_text;
  });

  const highlighter = await getHighlighter({
      langs: [lang],
      themes: [theme],
    });

  const html = await highlighter.codeToHtml(codes, {
    lang: lang,
    theme: theme,
  });
  // console.log(html);

  const caption = code.caption;

  return (
    <div key={id} className={cn(className, "text-sm flex-col w-full max-w-full overflow-hidden")}>
      <div
        dangerouslySetInnerHTML={{
          __html: `<pre class="language-${lang}" style="background: #24292e; padding: 1em; margin: 0.5em 0px; overflow: auto;" tabIndex="0"><code class="language-${lang}">${html}</code></pre>`,
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
