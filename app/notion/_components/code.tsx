"use client"

import React from "react";
// import copyToClipboard from 'clipboard-copy'
// import { CodeBlock } from 'notion-types'
// import { getBlockTitle } from 'notion-utils'
import Prism, { highlightElement } from "prismjs";
import { languages as Lan } from "prismjs";

// TODO: make it to dynamic 
import "prismjs/components/prism-clike.min.js";
import "prismjs/components/prism-css-extras.min.js";
import "prismjs/components/prism-css.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-js-extras.min.js";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-tsx.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-go.js";
import "prismjs/components/prism-ini.js";

import "prismjs/themes/prism-tomorrow.css";
import { cn } from '@/lib/utils';

// import { Text } from "../components/text";
// import { useNotionContext } from "../context";
import RichText from "../text";
// import CopyIcon from '../icons/copy'
// import { cs } from "../utils";

interface CodeBlockProps {
  block: any;
  defaultLanguage?: string | undefined;
  className?: string | undefined;
}

// const Code = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, children, ...props }, ref) => (
//   <code
//     ref={ref}
//     className={cn("space-y-1.5", className)}
//     {...props}
//   >
//     {children}
//   </code>
// ))
// Code.displayName = "CardHeader"

// const Code = React.forwardRef((props: any, ref) => {
//   const {className, children, ...prop} = props;
//   return (
//     <code
//       ref={ref}
//       className={cn("space-y-1.5", className)}
//       {...prop}
//     >
//       {children}
//     </code>
//   )
// });
// Code.displayName = "CardHeader"


export function CodeRender({block, defaultLanguage, className} : CodeBlockProps) {


  const codeRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (codeRef.current) {
      try {
        highlightElement(codeRef.current);
      } catch (err) {
        console.warn("prismjs highlight error", err);
      }
    }
  }, [codeRef]);

  const { code, id, type } = block;
  if (type != "code" || !code) {
    return null;
  }

  const lang = (code.language || defaultLanguage).toLowerCase();
  const caption = code.caption;
  
  // Text cann't be nested in code element. So there are two ways to render code
  // Solution 1: Replace code with div tag.
  // Solution 2: Render all raw plain-text
  let codes = ""
  code.rich_text?.map((item: any) => {
    codes += item?.plain_text
  })
  return (
    <div id={id} className={cn(className, "text-sm")}>
      <pre className="rounded py-8">
        <code className={`language-${lang}`} ref={codeRef}>
          {/* <RichText title={code.rich_text} /> */}
          {codes}
        </code>
      </pre>

      {caption && caption.length > 0 && (
        <figcaption className="font-normal">
          <RichText title={caption} />
        </figcaption>
      )}
    </div>
  );

  // Solution 3:  https://drupal-way.com/blog/nextjs-and-prismjs-integration
  // const highlightedCode = Prism.highlight(codes, Lan[lang], lang);
  // return <div 
  //   dangerouslySetInnerHTML={{__html: `<pre class="language-${lang}" tabIndex="0"><code class="language-${lang}">${highlightedCode}</code></pre>`}} 
  //   />
};
