import type { IconifyIcon, IconifyJSON, IconifyJSONIconsData } from "@iconify/types";

import customIconsJson from "./icons.json";
import simpleIconsJson from "@iconify-json/simple-icons/icons.json";
import phIconsJson from "@iconify-json/ph/icons.json";

const customIcons = customIconsJson as IconifyJSONIconsData;
const simpleIcons = simpleIconsJson as IconifyJSONIconsData;
const phIcons = phIconsJson as IconifyJSONIconsData;

const DEFAULT_VIEWBOX = 16;

const phosphorIcon = (name: string) => {
  const icon = phIcons.icons[name];
  return {
    body: icon.body,
    width: icon.width ?? phIcons.width ?? DEFAULT_VIEWBOX,
    height: icon.height ?? phIcons.height ?? DEFAULT_VIEWBOX,
  };
};

const simpleIcon = (name: string) => {
  const icon = simpleIcons.icons[name];
  return {
    body: icon.body,
    width: icon.width ?? simpleIcons.width ?? DEFAULT_VIEWBOX,
    height: icon.height ?? simpleIcons.height ?? DEFAULT_VIEWBOX,
  };
};

export const portIcon = (name: string | undefined): IconifyIcon => {
  if (!name) {
    return phosphorIcon("cube-fill");
  }
  if (name.endsWith(".svg")) {
    return customIcon(name.split(".")[0]);
  }
  if (name in simpleIcons.icons) {
    return simpleIcon(name);
  }
  // When a simple icon exists as an alias for the port, the parent must be used to get the body of the SVG.
  if (simpleIcons.aliases && name in simpleIcons.aliases) {
    return simpleIcon(simpleIcons.aliases[name].parent);
  }
  return phosphorIcon("cube-fill");
};

export const customIcon = (name: string): IconifyIcon => {
  const icon = customIcons.icons[name];
  return {
    body: icon.body,
    width: icon.width ?? customIcons.width ?? DEFAULT_VIEWBOX,
    height: icon.height ?? customIcons.height ?? DEFAULT_VIEWBOX,
  };
};
