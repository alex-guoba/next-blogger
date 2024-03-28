import { TypePostList } from "@/app/notion/api";
import { TagList } from "@/components/layouts/tag";
import { Separator } from "@/components/ui/separator";

export function TagFooter({ posts }: { posts: TypePostList }) {
  if (!posts || posts.length == 0) {
    return <div />;
  }

  const tagCounter = new Map<string, number>();
  posts.forEach((post: any) => {
    post.properties.Tags.multi_select?.forEach((tag: any) => {
      tagCounter.set(tag.name, (tagCounter.get(tag.name) || 0) + 1);
    });
  });

  return (
    <div>
      <Separator className="my-8" />
      <p className="py-6 font-bold antialiased">Explore articles by category:</p>
      <TagList tagCounter={tagCounter} className="grid-cols-3 gap-0.5 md:grid-cols-4 lg:grid-cols-5" />;
    </div>
  );
}
