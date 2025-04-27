import type { CategoryKey } from "@catppuccin/catppuccin/resources/types/ports.porcelain.schema";
import type { PlatformKey, PortWithIcons } from "@data/ports";
import Fuse from "fuse.js";

const url = new URL(window.location.href);

const fuse = new Fuse([] as PortWithIcons[], {
  keys: [
    { name: "key", weight: 1 },
    { name: "name", weight: 0.5 },
    { name: "categories.name", weight: 0.25 },
    { name: "repository.current-maintainers.username", weight: 0.1 },
  ],
  includeScore: false,
  threshold: 0.2,
});

export const searchParams = $state({
  searchText: url.searchParams.get("q") ?? "",
  platforms: url.searchParams.getAll("p") as PlatformKey[],
  categories: url.searchParams.getAll("c") as CategoryKey[],
});

export function scrollToTop() {
  document.body.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
}

export function debounce<T, D extends any[]>(deps: () => D, action: () => T, initialValue: T, delay: number): () => T {
  let value = $state<T>(initialValue);
  let timer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    deps();

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      value = action();
    }, delay);

    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  return () => value;
}

export function performSearch(searchTerm: string, ports: PortWithIcons[]) {
  fuse.setCollection(ports);

  if (searchTerm === "") {
    url.searchParams.delete("q");
  } else {
    url.searchParams.set("q", searchTerm);
  }

  window.history.pushState(null, "", url.toString());

  return searchTerm ? fuse.search(searchTerm).map((result) => result.item) : ports;
}

export function filterPorts(
  ports: PortWithIcons[],
  platforms: PlatformKey[],
  categories: CategoryKey[],
): PortWithIcons[] {
  let filtered = ports;

  if (platforms.length > 0) {
    filtered = ports.filter((port) =>
      platforms.every((platform) => (port.platform as PlatformKey[]).includes(platform)),
    );
  }

  if (categories.length > 0) {
    filtered = filtered.filter((port) =>
      categories.every((category) => port.categories.map((c) => c.key).includes(category)),
    );
  }

  url.searchParams.delete("p");
  if (platforms.length > 0) {
    platforms.forEach((platform) => {
      url.searchParams.append("p", platform);
    });
  }

  url.searchParams.delete("c");
  if (categories.length > 0) {
    categories.forEach((category) => {
      url.searchParams.append("c", category);
    });
  }

  window.history.pushState(null, "", url.toString());

  return filtered;
}
