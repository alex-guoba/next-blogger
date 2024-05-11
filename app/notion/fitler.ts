import { filterBase, filterSelect, sorterProperties } from "@/app/notion/block-parse";

export const ArticlePost = "Post";
export const ArticleProject = "Project";

export function dbQueryParams(database_id: string, type: string) {
  const defaultParam = filterBase(database_id);
  const filters = {
    filter: {
      and: [filterSelect("Status", "Published").filter, filterSelect("Type", type).filter],
    },
  };
  const sorter = sorterProperties([{ property: "PublishDate", direction: "descending" }]);

  return { ...defaultParam, ...filters, ...sorter };
}


export function noteDbQueryParams(database_id: string) {
  const defaultParam = filterBase(database_id);
  const filters = {
    filter: {
      and: [filterSelect("Published", "Y").filter],
    },
  };
  const sorter = sorterProperties([{ property: "PublishDate", direction: "descending" }]);

  return { ...defaultParam, ...filters, ...sorter };
}
