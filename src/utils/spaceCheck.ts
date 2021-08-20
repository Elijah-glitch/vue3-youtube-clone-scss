/** Check blank of right to the element. */
export const isRightBlankHaveEnoughSpace = (
  targetElement: HTMLElement,
  elementWidth?: number
): boolean => {
  const screenWidth = window.innerWidth;
  const offsetLeft = targetElement.getBoundingClientRect().left;
  //   console.log(screenWidth, "screenWidth");
  //   console.log(offsetLeft, "offsetLeft");
  //   console.log(elementWidth, "elementWidth");
  if (screenWidth - offsetLeft >= (elementWidth || targetElement.clientWidth)) {
    return true;
  }
  return false;
};

/** Check blank of bottom to the element. */
export const isBottomBlankHaveEnoughSpace = (
  targetElement: HTMLElement,
  elementHeight?: number
) => {
  const screenHeight = window.innerHeight;
  const offsetBottom = targetElement.getBoundingClientRect().bottom;
  //   console.log(screenWidth, "screenWidth");
  //   console.log(offsetLeft, "offsetLeft");
  //   console.log(elementWidth, "elementWidth");
  if (
    screenHeight - offsetBottom >=
    (elementHeight || targetElement.clientHeight)
  ) {
    return true;
  }
  return false;
};
