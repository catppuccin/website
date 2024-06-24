<script lang="ts">
  import type { Port } from "../lib/ports";
  import SearchBar from "./SearchBar.svelte";
  import PortGrid from "./PortGrid.svelte";
  import Fuse from "fuse.js";

  export let ports: Array<Port & { icon: string }>;
  let portGrid: Array<Port & { icon: string }> | undefined = undefined;
  let debounceTimeout: ReturnType<typeof setTimeout> | undefined;

  const fuse = new Fuse(ports, {
    keys: [
      { name: "key", weight: 1 },
      { name: "categories.name", weight: 0.8 },
      { name: "name", weight: 0.4 },
      { name: "repository.current-maintainers.username", weight: 0.1 },
      { name: "repository.current-maintainers.name", weight: 0.1 },
    ],
    includeScore: false,
    threshold: 0.3,
  });

  const url = new URL(window.location.href);
  let searchTerm = url.searchParams.get("q") ?? "";
  handleInput();

  function handleInput() {
    // Keep the URL in sync with the search bar
    if (searchTerm === "") {
      url.searchParams.delete("q");
    } else {
      url.searchParams.set("q", searchTerm);
    }
    window.history.pushState(null, "", url.toString());

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      searchTerm ? (portGrid = fuse.search(searchTerm).map((key) => key.item)) : (portGrid = ports);
    }, 25);
  }
</script>

<SearchBar bind:searchTerm {handleInput} />
<PortGrid bind:portGrid bind:searchTerm>
  <svelte:fragment slot="no-results">
    <slot name="no-results" />
  </svelte:fragment>
</PortGrid>
