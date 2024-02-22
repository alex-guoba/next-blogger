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
    file: { caption, file, external, type, name},
  } = block;

  const url = external?.url || file?.url;
  if (!url) {
    return null;
  }

  const fname = fileName(name, url);

  return (
    <div className={cn(className, "inline-flex w-full items-center flex-wrap")}>
      <Icons.fileblock className="h-6 w-6 p-[0.8] text-gray-600" />
      <a
        id={id}
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="whitespace-pre-wrap break-words font-normal truncate"
      >
        {caption && caption.length > 0 ? (
          <div>
            <RichText title={caption} />
          </div>
        ) : (
          fname
        )}
      </a>
    </div>
  );
}
