import { cn } from "@/lib/utils";
import Link from "next/link";

interface PostTagProps {
  tags: any[];
  className?: string | undefined;
}

/**
 * 渲染带有标签的文章列表
 *
 * @param tags 标签列表,类型为multi_select
 * @returns 返回渲染后的组件
 */
export function PostTags({ tags, className }: PostTagProps) {
  if (!tags || tags.length == 0) {
    return null;
  }

  return (
    <div className={cn(className, "text-sm")}>
      <ol className="list-none">
        {tags.map((tag: any) => (
          <TagItem key={tag?.id} name={tag?.name}></TagItem>
        ))}
      </ol>
    </div>
  );
}

export function TagItem({ name }: { name: string }) {
  return (
    <li className="inline-block pr-2 font-serif hover:text-accent-foreground">
      <Link
        href={`/tags/${encodeURI(name)}/`}
        className="font-semibold leading-tight hover:text-red-500"
        aria-label={`View posts tagged ${name}`}
        prefetch={false}
      >
        #{name}
      </Link>
    </li>
  );
}
