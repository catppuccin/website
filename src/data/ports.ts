import { parse } from "yaml";
import { PropertyBasedSet } from "./propertyBasedSet";
import { portIcon } from "./icons";
import type { ColorName } from "@catppuccin/palette";
import type { IconifyIcon } from "@iconify/types";

// Mostly auto-generated but have made manual edits to the types
// to stop TypeScript from complaining about the types. Future
// Hammy can deal with the consequences of this decision.

export interface Everything {
  ports: Port[];
  collaborators: Collaborator[];
  categories: Category[];
  showcases: Showcase[];
  "archived-ports": ArchivedPort[];
}

export interface ArchivedPort {
  name: string;
  reason: string;
  categories: Category[];
  platform: Platform[] | "agnostic";
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

export enum Platform {
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
  username: string;
  url: string;
  name?: string;
}

export interface Port {
  name: string;
  categories: Category[];
  platform?: Platform[] | "agnostic";
  color: ColorName;
  key: string;
  repository: Repository;
  icon?: string;
  alias?: string;
  upstreamed?: boolean;
  links?: Link[];
}

export type PortWithIcons = Port & { icon: IconifyIcon };

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

export const repositoriesYml = (await fetch(
  "https://raw.githubusercontent.com/catppuccin/catppuccin/portscelain/pigeon/ports.porcelain.yml",
)
  .then((r) => r.text())
  .then((t) => parse(t))) as Everything;

// Sort items & get the icon strings for each port
export const ports = [...repositoriesYml.ports]
  .sort((a, b) => a.key.localeCompare(b.key))
  .map((port) => {
    return {
      ...port,
      icon: portIcon(port.icon),
    } as PortWithIcons;
  });

// We need the current maintainers for both userstyles and ports
export const currentMaintainers: Collaborator[] = new PropertyBasedSet<Collaborator>(
  (m) => m.url,
  [...repositoriesYml.ports.map((p) => p.repository)].flatMap((p) => p["current-maintainers"]),
).sorted();

// Only needed until collaborators are deduplicated from the ports.porcelain.json
export const collaborators = new PropertyBasedSet<Collaborator>(
  (m) => m.url,
  [
    ...repositoriesYml.ports.flatMap((p) =>
      p.repository["current-maintainers"].concat(p.repository["past-maintainers"]),
    ),
  ],
).sorted();
