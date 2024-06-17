import type { IconifyJSON } from "@iconify/types";

import customIconsJson from "./iconify/icons.json";
import simpleIconsJson from "@iconify-json/simple-icons/icons.json";
const customIcons = customIconsJson as IconifyJSON;
const simpleIcons = simpleIconsJson as IconifyJSON;

// For whatever reason, importing ph-icons.json doesn't work, so I'm just going to copy the contents of the icon here.
const cubeFillIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 256 256"><path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,120,47.65,76,128,32l80.35,44Zm8,99.64V133.83l80-43.78v85.76Z"></path>';

export const getIcon = (icon: string | undefined) => {
  // When there's no icon provided
  if (!icon) return cubeFillIcon;
  // When a custom icon is provided
  if (icon.endsWith(".svg")) {
    return customIcons.icons[icon.split(".")[0]].body;
  }
  // When a simple icon exists for the port
  if (icon in simpleIcons.icons) {
    return simpleIcons.icons[icon].body;
  }
  // When a simple icon exists as an alias for the port, the parent must be used to get the body of the SVG.
  if (simpleIcons.aliases && icon in simpleIcons.aliases) {
    return simpleIcons.icons[simpleIcons.aliases[icon].parent].body;
  }
  // If all else fails, return the cube fill icon
  return cubeFillIcon;
};
