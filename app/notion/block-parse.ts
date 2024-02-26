
export const extractFileUrl = (obj: any) => {
  if (obj?.type == 'file') {
    return obj?.file?.url;
  }
  if (obj?.type == 'external') {
    return obj?.external?.url;
  }
  return null;
}