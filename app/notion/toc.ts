import { rawText } from "./block-parse";

const heading_level_1 = "heading_1";
const heading_level_2 = "heading_2";
const heading_level_3 = "heading_3";

interface Item {
  title: string;
  id: string;
  items: Item[];
}

interface Items {
  items: Item[];
}

export type TableOfContents = Items;

export function getTableOfContents(blocks: Array<any>): TableOfContents {
  const root: TableOfContents = {
    items: new Array(),
  };

  blocks.map((block: any) => {
    const { id, type } = block;
    if (type != heading_level_1 && type != heading_level_2 && type != heading_level_3) {
      return;
    }

    const heading = block[type];
    const raw_context = rawText(heading?.rich_text);
    if (!raw_context) {
      return;
    }

    const item: Item = {
      title: raw_context,
      id: id,
      items: new Array(),
    };

    if (type == heading_level_1) {
      root.items.push(item);
    } else if (type == heading_level_2) {
      const parent = root.items[root.items.length - 1];
      if (parent) {
        parent.items.push(item);
      } else {
        root.items.push(item);
      }
    } else {
      const grandparent = root.items[root.items.length - 1];
      if (grandparent) {
        const parent = grandparent.items[grandparent.items.length - 1];
        if (parent) {
          parent.items.push(item);
        } else {
          grandparent.items.push(item);
        }
      } else {
        root.items.push(item);
      }
    }
  });
  return root;
}
