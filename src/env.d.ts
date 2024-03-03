/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type accent =
  | "rosewater"
  | "flamingo"
  | "pink"
  | "mauve"
  | "red"
  | "maroon"
  | "peach"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "sapphire"
  | "blue"
  | "lavender";


interface Category {
  key: string;
  name: string;
  description: string;
  emoji: string;
}

type Platform = "android" | "windows" | "ios" | "linux" | "macos";

interface Link {
  name: string;
  color: string;
  icon: string;
  url: string;
}

interface Port {
  categories: string[];
  name: string;
  platform: Platform[];

  color?: string;
  icon?: string;
  alias?: string;
  url?: string;
  links?: Link[];
  upstreamed?: boolean;
}
