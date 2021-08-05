/** Check blank of right to the element. */
export const isRightBlankHaveEnoughSpace = (
  targetElement: HTMLElement,
  elementWidth: number
): boolean => {
  const screenWidth = window.innerWidth;
  const offsetLeft = targetElement.getBoundingClientRect().left;
  //   console.log(screenWidth, "screenWidth");
  //   console.log(offsetLeft, "offsetLeft");
  //   console.log(elementWidth, "elementWidth");
  if (screenWidth - offsetLeft >= elementWidth) {
    return true;
  }
  return false;
};
