import type { IconifyIcon, IconifyJSONIconsData } from "@iconify/types";

import customIconsJson from "./icons.json" with { type: "json" };
import simpleIconsJson from "@iconify-json/simple-icons/icons.json" with { type: "json" };
import phIconsJson from "@iconify-json/ph/icons.json" with { type: "json" };

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

const customIcon = (name: string): IconifyIcon => {
  const icon = customIcons.icons[name];
  return {
    body: icon.body,
    width: icon.width ?? customIcons.width ?? DEFAULT_VIEWBOX,
    height: icon.height ?? customIcons.height ?? DEFAULT_VIEWBOX,
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

export const icon = (identifier: string): IconifyIcon => {
  const [prefix, name] = identifier.split(":");
  const lib = [customIcons, simpleIcons, phIcons].find((lib) => lib.prefix === prefix);
  if (lib) {
    const icon = lib.icons[name];
    if (icon) {
      return {
        body: icon.body,
        width: icon.width ?? lib.width ?? DEFAULT_VIEWBOX,
        height: icon.height ?? lib.height ?? DEFAULT_VIEWBOX,
      };
    }
  }
  throw new Error(`Icon '${name}' for identifier '${identifier}' could not be found.`);
};
