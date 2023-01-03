export const calculateContrastColor = (
  hexColor: string,
  dark: string = "#000000",
  light: string = "#ffffff"
): string => {
  // clean up the string if necessary
  let rgb = hexColor.replace("#", "");
  let r = parseInt(rgb.slice(0, 2), 16);
  let g = parseInt(rgb.slice(2, 4), 16);
  let b = parseInt(rgb.slice(4, 6), 16);
  // determine the lightness of the color
  let l = (r * 299 + g * 587 + b * 114) / 1000;
  return l >= 128 ? dark : light;
};
