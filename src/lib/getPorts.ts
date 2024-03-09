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

export type Port = {
  categories: string[];
  name: string;
  platform: Platform[];

  color?: ColorName;
  icon?: string;
  alias?: string;
  url?: string;
  links?: Link[];
  upstreamed?: boolean;
};

const portsYAML = await fetch("https://raw.githubusercontent.com/catppuccin/catppuccin/main/resources/ports.yml").then(
  (r) => r.text(),
);

export const ports = parse(portsYAML).ports as Record<string, Port>;
export const categories = parse(portsYAML).categories as Array<Category>;
