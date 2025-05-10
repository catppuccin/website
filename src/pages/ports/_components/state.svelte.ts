import type { CategoryKey, PlatformKey } from "@catppuccin/catppuccin/resources/types/ports.porcelain.schema";
import type { PortWithIcons } from "@data/ports";
import Fuse from "fuse.js";

type UrlParamsState = {
  query: string | null;
  platforms: PlatformKey[];
  category: CategoryKey | null;
};

export const url = new URL(window.location.href);

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

export const urlParams: UrlParamsState = $state({
  query: url.searchParams.get("q"),
  platforms: url.searchParams.getAll("p") as PlatformKey[],
  category: url.searchParams.get("c") as CategoryKey | null,
});

export const updateQueryUrlParams = () => {
  if (urlParams.query) {
    url.searchParams.set("q", urlParams.query);
  } else {
    url.searchParams.delete("q");
  }
  window.history.replaceState(null, "", url.toString());
};

export const updatePlatformsUrlParams = () => {
  url.searchParams.delete("p");
  if (urlParams.platforms.length > 0) {
    urlParams.platforms.forEach((platform) => {
      url.searchParams.append("p", platform);
    });
  }
  window.history.replaceState(null, "", url.toString());
};

export const updateCategoryUrlParams = () => {
  if (urlParams.category) {
    url.searchParams.set("c", urlParams.category);
  } else {
    url.searchParams.delete("c");
  }
  window.history.replaceState(null, "", url.toString());
};

export function queryPorts(ports: PortWithIcons[]) {
  fuse.setCollection(ports);
  return urlParams.query ? fuse.search(urlParams.query).map((result) => result.item) : ports;
}

export function filterPorts(ports: PortWithIcons[]): PortWithIcons[] {
  const { platforms, category } = urlParams;
  let filtered = ports;

  if (platforms.length > 0) {
    filtered = filtered.filter((port) => platforms.every((platform) => port.platform.includes(platform)));
  }

  if (category) {
    filtered = filtered.filter((port) => port.categories.map((c) => c.key).includes(category));
  }

  return filtered;
}

/**
  Scroll to the top of the ports explorer if it's not already in view.

  The bottom edge of the ports description is used because the filters
  box has top padding which can cause layout shifts when the user is
  typing in the search box.
  */
export function scrollToTop() {
  const portsExplorer = document.getElementById("ports-explorer");
  const portsDescription = document.getElementById("ports-description");

  if (!portsExplorer || !portsDescription) {
    return;
  }

  if (portsExplorer.getBoundingClientRect().top < 0) {
    window.scrollTo({
      top: window.scrollY + portsDescription.getBoundingClientRect().bottom,
      behavior: "auto",
    });
  }
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
