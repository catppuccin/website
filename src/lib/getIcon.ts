import * as Icons from "simple-icons";
import { parse } from "yaml";
const rawPorts = await fetch(
  "https://raw.githubusercontent.com/catppuccin/catppuccin/main/resources/ports.yml",
).then((r) => r.text());
const ports = parse(rawPorts).ports as Record<string, Port>;

export function getIcon(slug: string) {
  const portEntry = Object.entries(ports).find(([, v]) => v.name == slug);
  if (!portEntry) {
    throw new TypeError(`port '${slug}' not found`);
  }

  const [, port] = portEntry;

  if (port.icon && !port.icon.endsWith(".svg")) {
    const siKey = `si${port.icon[0].toUpperCase()}${port.icon.substring(1)}`;
    const si = Icons[siKey as keyof typeof Icons];

    if (!si) {
      throw new TypeError(
        `Icon did not exist for port: ${JSON.stringify(port, undefined, 2)}`,
      );
    }

    return {
      path: si.path,
      viewbox: "0 0 24 24",
    };
  }

  return {
    path: "M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z",
    viewbox: "0 0 256 256",
  };
}
