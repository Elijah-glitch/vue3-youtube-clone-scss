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
  buttonElement?: HTMLElement
) => {
  const screenHeight = window.innerHeight;
  const offsetBottom = (buttonElement || targetElement).getBoundingClientRect()
    .bottom;
  // console.log(targetElement.clientHeight);
  // console.log(screenHeight, "screenHeight");
  // console.log(offsetBottom, "offsetBottom");
  if (screenHeight - offsetBottom >= targetElement.clientHeight) {
    return true;
  }
  return false;
};
