import { cn } from "@/lib/utils";
import RichText from "../text";
import { Icons } from "@/components/icons";

interface FileBlockProps {
  block: any;
  className?: string | undefined;
}

function fileName(name: string, url: string) {
  if (name != null) {
    return name;
  }
  const splited = url.split("/");
  const last = splited[splited.length - 1];
  return last.split("?")[0];
}

export function FileRender({ block, className }: FileBlockProps) {
  const {
    id,
    file: { caption, file, external, name },
  } = block;

  const url = external?.url || file?.url;
  if (!url) {
    return null;
  }

  const fname = fileName(name, url);

  return (
    <div key={id} className={cn(className, "flex w-full items-center whitespace-nowrap overflow-hidden text-ellipsis")}>
      <Icons.fileblock className="h-6 min-w-6 p-[0.8] text-gray-600" />
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="truncate font-normal "
      >
        {caption && caption.length > 0 ? (
          <figcaption className="px-1.5 text-sm font-normal text-slate-600">
            <RichText title={caption} />
          </figcaption>
        ) : (
          fname
        )}
      </a>
    </div>
  );
}
