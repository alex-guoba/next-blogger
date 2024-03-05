// import { cn } from "@/lib/utils";

import { cn } from "@/lib/utils";
import Image from "next/image";
import RichText from "../text";

// "image": {
//     "caption": [
//         {
//             "type": "text",
//             "text": {
//                 "content": "External Image",
//                 "link": null
//             },
//             "annotations": {
//                 "bold": false,
//                 "italic": false,
//                 "strikethrough": false,
//                 "underline": false,
//                 "code": false,
//                 "color": "default"
//             },
//             "plain_text": "External Image",
//             "href": null
//         }
//     ],
//     "type": "external",
//     "external": {
//         "url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb"
//     }
// }
// "image": {
//     "caption": [
//         {
//             "type": "text",
//             "text": {
//                 "content": "Notion-hosted image",
//                 "link": null
//             },
//             "annotations": {
//                 "bold": false,
//                 "italic": false,
//                 "strikethrough": false,
//                 "underline": false,
//                 "code": false,
//                 "color": "default"
//             },
//             "plain_text": "Notion-hosted image",
//             "href": null
//         }
//     ],
//     "type": "file",
//     "file": {
//         "url": "https://prod-files-secure.s3.us-west-2.amazonaws.com/0bb5601d-5b11-49c2-a0fd-29f4c2b522b6/d61aedd6-da5f-473d-a08a-da664b6c1456/isaac-martin-Apkr4nfK1mU-unsplash.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240201T112113Z&X-Amz-Expires=3600&X-Amz-Signature=112d428a047b0f58c46e0c1a00278728e3099b737b63d25df5ea09f97f5771f4&X-Amz-SignedHeaders=host&x-id=GetObject",
//         "expiry_time": "2024-02-01T12:21:13.031Z"
//     }
// }

// interface ImageProps {
//   id: string;
//   type: string;
//   external?:
//     | {
//         url: string;
//       }
//     | undefined;
//   file?:
//     | {
//         url: string;
//         expiry_time: string;
//       }
//     | undefined;
// }

export function ImageRender({
  block,
  className,
  size = "md",
}: {
  block: any;
  className?: string | undefined;
  size?: string | undefined;
}) {
  const {
    id,
    image: { caption, external, file },
  } = block;

  const url = external?.url || file?.url;
  if (!url) {
    return null;
  }

  // TODO: use nextconfig.js to get the base path
  let hosted = false;
  const u = new URL(url || "");
  if (u.hostname.endsWith("s3.us-west-2.amazonaws.com") || u.hostname.startsWith("www.notion.so")) {
    hosted = true;
  }

  // TODO: Notion API don't return the correct image size. May be we need to set the image size in caption?
  return (
    <figure
      key={id}
      className={cn(className, "mx-0 my-2 flex min-w-full max-w-[100vw] flex-col self-center py-1 text-sm")}
    >
      {hosted ? (
        <Image
          src={url}
          className={cn("w-fit rounded-lg shadow-md")}
          width={448}
          height={448}
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
          alt={caption[0]?.plain_text}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          width="auto"
          className={cn("w-fit rounded-lg shadow-md", {
            "h-32": size === "sxm",
            "h-64": size === "md",
            "h-96": size === "lg",
          })}
          loading="lazy"
          decoding="async"
          alt={caption[0]?.plain_text}
        />
      )}
      {caption && caption.length > 0 && (
        <figcaption className="px-1.5 text-sm font-normal text-slate-600">
          <RichText title={caption} />
        </figcaption>
      )}
    </figure>
  );
}
