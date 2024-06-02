import type { ColorName } from "@catppuccin/palette";
import { parse } from "yaml";
import { PropertyBasedSet } from "./propertyBasedSet";

export type Category = {
  key: string;
  name: string;
  description: string;
  emoji: string;
};

type Platform = "android" | "windows" | "ios" | "linux" | "macos";

type Link = {
  name: string;
  color: string;
  icon: string;
  url: string;
};

type CurrentMaintainer = {
  name?: string;
  url: string;
};

export type Port = {
  categories: string[];
  name: string;
  platform: Platform[];
  color: ColorName;
  icon?: string;
  alias?: string;
  url?: string;
  links?: Link[];
  upstreamed?: boolean;
  "current-maintainers": CurrentMaintainer[];
};

export type Userstyle = {
  name: string[] | string;
  categories: string[];
  color: ColorName;
  icon?: string;
  "current-maintainers": CurrentMaintainer[];
};

export const portsYml = (await fetch("https://github.com/catppuccin/catppuccin/raw/main/resources/ports.yml")
  .then((r) => r.text())
  .then((t) => parse(t))) as {
  ports: Record<string, Port>;
  categories: Array<Category>;
};

export const userstylesYml = (await fetch("https://github.com/catppuccin/userstyles/raw/main/scripts/userstyles.yml")
  .then((r) => r.text())
  .then((t) => parse(t))) as {
  collaborators: Array<{ url: string; name?: string }>;
  userstyles: Record<string, Userstyle>;
};

export const ports = { ...portsYml.ports, ...userstylesYml.userstyles } as Record<string, Port | Userstyle>;

const uniqueMaintainers = new PropertyBasedSet<CurrentMaintainer>(
  (m) => m.url,
  Object.values(ports).flatMap((port: Port | Userstyle) => {
    return port["current-maintainers"];
  }),
);

export const currentMaintainers: CurrentMaintainer[] = uniqueMaintainers.sorted();

export const { categories } = portsYml;
