import type { ColorName } from "@catppuccin/palette";
import { parse } from "yaml";
import { PropertyBasedSet } from "./propertyBasedSet";
import type { IconifyJSON } from "@iconify/types";

import customIconsJson from "./icons.json";
import simpleIconsJson from "@iconify-json/simple-icons/icons.json";
const customIcons = customIconsJson as IconifyJSON;
const simpleIcons = simpleIconsJson as IconifyJSON;

export interface Everything {
  ports: Port[];
  collaborators: Collaborator[];
  categories: Category[];
  showcases: Showcase[];
  "archived-ports": ArchivedPort[];
  "userstyles-collaborators": Collaborator[];
  userstyles: Userstyle[];
}

export interface ArchivedPort {
  name: string;
  reason: string;
  categories: Category[];
  platform: PlatformElement[] | "agnostic";
  color: ColorName;
  icon?: string;
  key: string;
  repository: Repository;
}

export interface Category {
  key: string;
  name: string;
  description: string;
  emoji: string;
}

export enum PlatformElement {
  Android = "android",
  Ios = "ios",
  Linux = "linux",
  Macos = "macos",
  Windows = "windows",
}

export interface Repository {
  name: string;
  url: string;
  "current-maintainers": Collaborator[];
  "past-maintainers": Collaborator[];
}

export interface Collaborator {
  username?: string;
  url: string;
  name?: string;
}

export interface Port {
  name: string;
  categories: Category[];
  platform: PlatformElement[] | "agnostic";
  color: ColorName;
  key: string;
  repository: Repository;
  icon?: string;
  alias?: string;
  upstreamed?: boolean;
  links?: Link[];
  "is-userstyle": false;
  link: string;
}

export interface Link {
  name: string;
  icon?: string;
  color?: ColorName;
  url: string;
}

export interface Showcase {
  title: string;
  description: string;
  link: string;
}

export interface Userstyle {
  name: string[] | string;
  categories: Category[];
  icon?: string;
  color: ColorName;
  readme: Readme;
  "current-maintainers": Collaborator[];
  key: string;
  "past-maintainers"?: Collaborator[];
  "is-userstyle": true;
  link: string;
}

export interface Readme {
  "app-link": string[] | string;
  usage?: string;
  faq?: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export const repositoriesYml = (await fetch(
  "https://raw.githubusercontent.com/catppuccin/catppuccin/portscelain/pigeon/ports.porcelain.yml",
)
  .then((r) => r.text())
  .then((t) => parse(t))) as Everything;

const cubeFillIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 256 256"><path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,120,47.65,76,128,32l80.35,44Zm8,99.64V133.83l80-43.78v85.76Z"></path>';
const getIcon = (icon: string | undefined) => {
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

// Sort items; get the icon strings for each port; and account for userstyles for link
export const ports = [...repositoriesYml.ports, ...repositoriesYml.userstyles]
  .sort((a, b) => a.key.localeCompare(b.key))
  .map((port) => {
    return {
      ...port,
      icon: getIcon(port.icon),
      link: port["is-userstyle"]
        ? `https://github.com/catppuccin/userstyles/tree/main/styles/${port.key}`
        : port.repository.url,
    };
  });
// We need the current maintainers for both userstyles and ports
export const currentMaintainers: Collaborator[] = new PropertyBasedSet<Collaborator>(
  (m) => m.url,
  [...repositoriesYml.userstyles, ...repositoriesYml.ports.map((p) => p.repository)].flatMap(
    (p) => p["current-maintainers"],
  ),
).sorted();
