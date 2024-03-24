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

export const yml = (await fetch("https://github.com/catppuccin/catppuccin/raw/main/resources/ports.yml")
  .then((r) => r.text())
  .then((t) => parse(t))) as {
  ports: Record<string, Port>;
  categories: Array<Category>;
};

export const { ports, categories } = yml;
