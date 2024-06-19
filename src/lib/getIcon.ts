import type { IconifyJSON } from "@iconify/types";

import customIconsJson from "./iconify/icons.json";
import simpleIconsJson from "@iconify-json/simple-icons/icons.json";
const customIcons = customIconsJson as IconifyJSON;
const simpleIcons = simpleIconsJson as IconifyJSON;

export const getIcon = (icon: string | undefined) => {
  // When there's no icon provided
  if (!icon || icon.endsWith(".svg")) return "ph:cube-fill";

  if (icon in simpleIcons.icons || icon in simpleIcons.aliases!) {
    return "simple-icons:" + icon;
  }

  // If all else fails, return the cube fill icon
  return "ph:cube-fill";
};
