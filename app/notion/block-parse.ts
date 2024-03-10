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
