import type { ColorName } from "@catppuccin/palette";
import { parse } from "yaml";

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

type UserstyleReadme = {
  "current-maintainers": CurrentMaintainer[];
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
  readme: UserstyleReadme;
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

export const currentMaintainers: CurrentMaintainer[] = Array.from(
  new Set(
    Object.values(ports).flatMap((port: Port | Userstyle) => {
      // Need to be defensive with the checks, should be less verbose once userstyles.yml is updated to match ports.yml
      // (Also we can remove this code with schema validation, but that's for a later PR)
      const portMaintainers = "current-maintainers" in port ? port["current-maintainers"] : [];
      if ("readme" in port) {
        portMaintainers.push(...port.readme["current-maintainers"]);
      }
      return portMaintainers;
    }),
  ),
).sort((a, b) => a.url.toLowerCase().localeCompare(b.url.toLowerCase()));

export const { categories } = portsYml;
