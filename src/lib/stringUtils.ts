export const middleEllipsis = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  const half = Math.floor(maxLength / 2);
  return str.slice(0, half) + "..." + str.slice(str.length - half);
};
