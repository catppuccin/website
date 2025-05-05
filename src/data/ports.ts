import { PropertyBasedSet } from "./propertyBasedSet";
import { portIcon } from "./icons";
import type { IconifyIcon } from "@iconify/types";
import type {
  Category,
  Collaborator,
  Collaborators,
  PlatformKey,
  Port,
  PortsPorcelainSchema,
} from "@catppuccin/catppuccin/resources/types/ports.porcelain.schema";

export type PortWithIcons = Port & { icon: IconifyIcon };
export type CategoryWithPortCount = Category & { portCount: number };
export type Platforms = Array<{
  key: PlatformKey;
  name: string;
}>;

// Trust upstream (catppuccin/catppuccin) has validated against the JSONSchema
export const porcelain = (await fetch(
  "https://raw.githubusercontent.com/catppuccin/catppuccin/main/resources/ports.porcelain.json",
)
  .then((r) => r.text())
  .then((t) => JSON.parse(t))) as PortsPorcelainSchema;

// Sort items & get the icon strings for each port
export const ports = [...porcelain.ports]
  .sort((a, b) => a.key.localeCompare(b.key))
  .map((port) => {
    return {
      ...port,
      icon: portIcon(port.icon),
    } as PortWithIcons;
  });

export const platforms: Platforms = [
  { key: "linux", name: "Linux" },
  { key: "macos", name: "macOS" },
  { key: "windows", name: "Windows" },
  { key: "android", name: "Android" },
  { key: "ios", name: "iOS" },
  { key: "web", name: "Web" },
];

export const categories = porcelain.categories.map((category) => {
  const portCount = ports.filter((port) => port.categories.some((c) => c.key === category.key)).length;
  return {
    ...category,
    portCount,
  };
});
categories.sort((a, b) => b.portCount - a.portCount);

// We need the current maintainers for both userstyles and ports
export const currentMaintainers: Collaborators = new PropertyBasedSet<Collaborator>(
  (m) => m.url,
  [...porcelain.ports.map((p) => p.repository)].flatMap((p) => p["current-maintainers"]),
).sorted();
