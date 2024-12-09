import type { IconifyIcon, IconifyJSON } from "@iconify/types";

import customIconsJson from "./icons/ports/icons.json";
import simpleIconsJson from "@iconify-json/simple-icons/icons.json";
import phIconsJson from "@iconify-json/ph/icons.json";

const customIcons = customIconsJson as IconifyJSON;
const simpleIcons = simpleIconsJson as IconifyJSON;
const phIcons = phIconsJson as IconifyJSON;

const cubeFillIcon = {
  body: phIcons.icons["cube-fill"].body,
  width: 256,
  height: 256,
};

const simpleIcon = (name: string) => ({
  body: simpleIcons.icons[name].body,
  width: 24,
  height: 24,
});

/**
 * Equivalent to a simpleIcon()
 */
const customIcon = (name: string) => ({
  body: customIcons.icons[name.split(".")[0]].body,
  width: 24,
  height: 24,
});

export const getIcon = (name: string | undefined): IconifyIcon => {
  if (!name) {
    return cubeFillIcon;
  }
  if (name.endsWith(".svg")) {
    return customIcon(name);
  }
  if (name in simpleIcons.icons) {
    return simpleIcon(name);
  }
  // When a simple icon exists as an alias for the port, the parent must be used to get the body of the SVG.
  if (simpleIcons.aliases && name in simpleIcons.aliases) {
    return simpleIcon(simpleIcons.aliases[name].parent);
  }
  return cubeFillIcon;
};
