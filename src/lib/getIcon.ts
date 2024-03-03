import * as Icons from "simple-icons";
import * as portsYaml from "../contents/ports/ports.yml";

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
  const ports = portsYaml.ports as Record<string, Port>
  const portEntry = Object.entries(ports).find(([, v]) => v.name == slug);
  if (!portEntry) {
    throw new TypeError(`port '${slug}' not found`)
  }

  const [, port] = portEntry

  if (port.icon && !port.icon.endsWith(".svg")) {
    const siKey = `si${port.icon[0].toUpperCase()}${port.icon.substring(1)}`
    const si = Icons[siKey]

    if (!si) {
      throw new TypeError(`Icon did not exist for port: ${JSON.stringify(port, undefined, 2)}`)
    }

    return {
      path: si.path,
      viewbox: "0 0 24 24",
    };
  }

  return {
    path: "M2133.33,71.526c1144.76,-0 2074.17,929.403 2074.17,2074.17c0,1144.76 -929.403,2074.17 -2074.17,2074.17c-1144.76,0 -2074.17,-929.403 -2074.17,-2074.17c-0,-1144.76 929.403,-2074.17 2074.17,-2074.17Zm774.791,3539.55c524.861,-278.314 882.709,-830.386 882.709,-1465.38c0,-914.8 -742.701,-1657.5 -1657.5,-1657.5c-914.799,-0 -1657.5,742.7 -1657.5,1657.5c0,615.235 335.927,1152.63 834.209,1438.61c24.436,-142.698 56.078,-271.033 94.987,-385.066c-247.365,-127.234 -430.24,-341.194 -472.855,-650.167c-37.162,-269.291 24.295,-583.207 184.363,-805.71c-39.322,-149.313 -92.954,-436.774 -53.888,-599.984c10.295,-43.03 49.258,-71.853 93.418,-69.123c208.556,12.969 377.688,94.959 514.133,253.796c256.731,-95.786 582.433,-94.242 794.385,-32.169c110.919,-154.562 242.474,-237.995 417.01,-280.769c41.021,-10.087 82.3,8.701 101.704,46.222c78.233,151.424 86.522,364.149 46.633,540.895c503.733,487.628 374.958,1197.7 -183.955,1535.25c31.454,153.734 52.186,311.582 62.147,473.596Z",
    viewbox: "0 0 4267 4267",
  };
}
