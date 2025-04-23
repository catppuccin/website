import { PropertyBasedSet } from "./propertyBasedSet";
import { portIcon } from "./icons";
import type { IconifyIcon } from "@iconify/types";
import type {
  Collaborator,
  Collaborators,
  Port,
  PortsPorcelainSchema,
} from "@catppuccin/catppuccin/resources/types/ports.porcelain.schema";

export type PortWithIcons = Port & { icon: IconifyIcon };

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

// We need the current maintainers for both userstyles and ports
export const currentMaintainers: Collaborators = new PropertyBasedSet<Collaborator>(
  (m) => m.url,
  [...porcelain.ports.map((p) => p.repository)].flatMap((p) => p["current-maintainers"]),
).sorted();
