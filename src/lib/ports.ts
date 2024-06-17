import { parse } from "yaml";
import { PropertyBasedSet } from "./propertyBasedSet";
import { getIcon } from "./getIcon";
import type { ColorName } from "@catppuccin/palette";

// Mostly auto-generated but have made manual edits to the types
// to stop TypeScript from complaining about the types. Future
// Hammy can deal with the consequences of this decision.

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
