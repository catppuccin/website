import * as icons from "simple-icons";
import { getCustomIcon } from "./customIcons.svg";
import { ports } from "./ports";

export function getIcon(slug: string[] | string) {
  const port = Object.values(ports).find(({ name }) => name === slug);
  if (!port) {
    throw new TypeError(`port '${slug}' not found`);
  }

  // ToDo: Remove when updated in ports.yml
  if (port.icon === "minecraft") {
    return getCustomIcon("minecraft");
  }

  if (port.icon && !port.icon.endsWith(".svg")) {
    const siKey = `si${port.icon[0].toUpperCase()}${port.icon.substring(1)}`;
    const si = icons[siKey as keyof typeof icons];

    if (!si) {
      throw new TypeError(`Icon did not exist for port: ${JSON.stringify(port, undefined, 2)}`);
    }

    return {
      path: si.path,
      viewbox: "0 0 24 24",
    };
  }

  if (port.icon && port.icon.endsWith(".svg")) {
    const iconSlug = port.icon.split(".")[0];
    return getCustomIcon(iconSlug);
  }

  return {
    path: "M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,120,47.65,76,128,32l80.35,44Zm8,99.64V133.83l80-43.78v85.76Z",
    viewbox: "0 0 256 256",
  };
}
