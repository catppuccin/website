import type { CategoryKey } from "@catppuccin/catppuccin/resources/types/ports.porcelain.schema";
import type { PlatformKey, PortWithIcons } from "@data/ports";
import type Fuse from "fuse.js";

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

export function updatePorts(
  ports: PortWithIcons[],
  fuse: Fuse<PortWithIcons>,
  url: URL,
  searchTerm: string,
  chosenPlatforms: PlatformKey[],
  chosenCategories: CategoryKey[],
) {
  let filteredPorts = ports;

  if (chosenPlatforms.length > 0) {
    filteredPorts = ports.filter((port) =>
      chosenPlatforms.every((platform) => (port.platform as PlatformKey[]).includes(platform)),
    );
  }

  if (chosenCategories.length > 0) {
    filteredPorts = filteredPorts.filter((port) =>
      chosenCategories.every((category) => port.categories.map((c) => c.key).includes(category)),
    );
  }

  fuse.setCollection(filteredPorts);
  updateSearchParams(url, searchTerm, chosenPlatforms, chosenCategories);

  return searchTerm ? fuse.search(searchTerm).map((result) => result.item) : filteredPorts;
}

export function updateSearchParams(
  url: URL,
  searchTerm: string,
  chosenPlatforms: PlatformKey[],
  chosenCategories: CategoryKey[],
) {
  if (searchTerm === "") {
    url.searchParams.delete("q");
  } else {
    url.searchParams.set("q", searchTerm);
  }
  url.searchParams.delete("p");
  if (chosenPlatforms.length > 0) {
    chosenPlatforms.forEach((platform) => {
      url.searchParams.append("p", platform);
    });
  }
  url.searchParams.delete("c");
  if (chosenCategories.length > 0) {
    chosenCategories.forEach((category) => {
      url.searchParams.append("c", category);
    });
  }
  window.history.pushState(null, "", url.toString());
}
