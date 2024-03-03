import * as Icons from "simple-icons";
import { parse } from "yaml";
const rawPorts = await fetch("https://raw.githubusercontent.com/catppuccin/catppuccin/main/resources/ports.yml").then(r => r.text());
const ports = parse(rawPorts).ports as Record<string, Port>

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
  categories: Category[];
  name: string;
  platform: Platform[];

  color?: string;
  icon?: string;
  alias?: string;
  url?: string;
  links?: Link[];
  upstreamed?: boolean
}

const overrides: Record<string, unknown> = {}

export function getIcon(slug: string) {
  const portEntry = Object.entries(ports).find(([, v]) => v.name == slug);
  if (!portEntry) {
    throw new TypeError(`port '${slug}' not found`)
  }

  const [, port] = portEntry

  if (port.icon && !port.icon.endsWith(".svg")) {
    const siKey = `si${port.icon[0].toUpperCase()}${port.icon.substring(1)}`
    const si = Icons[siKey as keyof typeof Icons]

    if (!si) {
      throw new TypeError(`Icon did not exist for port: ${JSON.stringify(port, undefined, 2)}`)
    }

    return {
      path: si.path,
      viewbox: "0 0 24 24",
    };
  }
}
