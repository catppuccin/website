<script lang="ts">
  import type { CategoryWithPortCount, HandleCategory, Platform, Port, Userstyle } from "../lib/ports";
  import SearchBar from "./SearchBar.svelte";
  import PortGrid from "./PortGrid.svelte";
  import Fuse from "fuse.js";
  import CategorySelect from "./dropdowns/CategorySelect.svelte";
  import PlatformSelect from "./dropdowns/PlatformSelect.svelte";

  export let platforms: Array<Platform>;
  export let ports: Array<Port | Userstyle>;
  export let categories: Array<CategoryWithPortCount>;
  let portGrid: Array<Port | Userstyle> | undefined = undefined;
  let debounceTimeout: NodeJS.Timeout;

  const fuse = new Fuse(ports, {
    keys: [
      { name: "name", weight: 1 },
      { name: "key", weight: 0.5 },
    ],
    includeScore: false,
    threshold: 0.3,
  });
  const url = new URL(window.location.href);

  /* --- Category Initial State --- */

  // Default to category "everything"
  const foundCategory = categories.find((c) => c.key === "everything")!;
  let category: HandleCategory = { value: foundCategory.key, label: foundCategory.nameWithCount };
  // If the URL has a category query parameter, use that instead
  if (url.searchParams.has("category")) {
    category.value = url.searchParams.get("category")!;
  } else {
    // Make sure the URL is in sync with the category
    url.searchParams.set("category", category.value);
  }

  // Category is guaranteed to be set to atleast "everything" or another category by now
  if (category.value === "everything") {
    // No need to change the default view if the category is "everything"
    portGrid = ports;
  } else {
    // If the category is not "everything", filter the ports to only show the selected category
    portGrid = ports.filter((port) => port.categories.some((c) => c.key === category.value));
  }
  // Make sure to update the fuse collection to the only the filtered ports
  fuse.setCollection(portGrid);

  /* --- Category Initial State --- */

  /* --- Search Initial State --- */

  // Default to an empty search term
  let searchTerm = "";
  if (url.searchParams.has("q")) {
    searchTerm = url.searchParams.get("q")!;
    // If a search term is present in the URL, search the ports for that term.
    // This is guaranteed to be only the selected category since we did that logic above
    if (searchTerm) {
      portGrid = fuse.search(searchTerm).map((key) => key.item);
    }
  }

  /* --- Search Initial State --- */

  /* --- Category Event Handler --- */

  const handleCategory = (e: { detail: HandleCategory }) => {
    console.log(e);
    // Keep the URL in sync with the category dropdown
    url.searchParams.set("category", e.detail.value);
    window.history.pushState(null, "", url.toString());
    category.value = e.detail.value;

    // If the user selects "everything", show all the ports
    if (category.value === "everything") {
      portGrid = ports;
    } else {
      // Otherwise, filter the ports to only show the selected category
      portGrid = ports.filter((port) => port.categories.some((c) => c.key === category.value));
    }

    // Make sure to update the fuse collection to only the filtered ports
    fuse.setCollection(portGrid);
  };

  /* --- Category Event Handler --- */

  /* --- Search Event Handler --- */

  const handleSearch = () => {
    // Keep the URL in sync with the search input
    url.searchParams.set("q", searchTerm);
    window.history.pushState(null, "", url.toString());

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      // if the search term is empty, filter the ports to only show the selected category
      if (searchTerm === "") {
        if (category.value === "everything") {
          portGrid = ports;
        } else {
          portGrid = ports.filter((port) => port.categories.some((c) => c.key === category.value));
        }
      } else {
        // Otherwise, search within the selected category
        portGrid = fuse.search(searchTerm).map((key) => key.item);
      }
    }, 25);
  };

  /* --- Search Event Handler --- */
</script>

<!-- LAYOUT/CSS TODO -->
<div style="display: flex; gap: 2rem; margin-block-end: var(--space-md); flex-wrap: wrap">
  <div style="flex: 1; min-width: min(100%, 40em);">
    <PlatformSelect {platforms} />
  </div>
  <div style="flex: 2; min-width: min(100%, 20em); height: 100%">
    <CategorySelect {categories} bind:category {handleCategory} />
  </div>
</div>
<SearchBar bind:searchTerm handleInput={handleSearch} />
<PortGrid bind:portGrid bind:searchTerm>
  <svelte:fragment slot="no-results">
    <slot name="no-results" />
  </svelte:fragment>
</PortGrid>
