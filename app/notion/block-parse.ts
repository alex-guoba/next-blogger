export const extractFileUrl = (obj: any) => {
  if (obj?.type == "file") {
    return obj?.file?.url;
  }
  if (obj?.type == "external") {
    return obj?.external?.url;
  }
  return null;
};

export const rawText = (rich_texts: any) => {
  let raw = "";
  rich_texts?.map((item: any) => {
    raw += item?.plain_text || "";
  });
  return raw;
};

// sub pages doesn't have status field
export const pagePublished = (page: any) => {
  return page?.properties?.Status?.select?.name == "Unpublished" ? false : true;
};

// database id must be included in fitler params as it's the unique key for db cache.
export const filterBase = (dbID: string) => {
  return {
    database_id: dbID,
  };
};

export const filterSelect = (property: string, value: string) => {
  return {
    filter: {
      property: property,
      select: {
        equals: value,
      },
    },
  };
};

export const filterMultiSelect = (property: string, value: string) => {
  return {
    filter: {
      property: property,
      multi_select: {
        contains: value,
      },
    },
  };
};

export const filterText = (property: string, value: string) => {
  return {
    filter: {
      property: property,
      rich_text: {
        equals: value,
      },
    },
  };
};

interface sorterProps {
  property: string;
  direction: "descending" | "ascending";
}

export const sorterProperties = (props: sorterProps[]) => {
  const res = {
    sorts: props,
  };
  return res;
};
