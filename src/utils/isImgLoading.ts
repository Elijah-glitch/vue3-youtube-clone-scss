export const isImgLoading = (imgEl: HTMLImageElement) => {
  if (!imgEl.complete) {
    return true;
  }

  return false;
};
