<script lang="ts">
  import type { Port, Userstyle } from "../lib/ports";
  import SearchBar from "./SearchBar.svelte";
  import PortGrid from "./PortGrid.svelte";
  import Fuse from "fuse.js";

  export let ports: Array<Port | Userstyle>;
  let portGrid: Array<Port | Userstyle> | undefined = undefined;
  let debounceTimeout: NodeJS.Timeout;

  const fuse = new Fuse(ports, {
    keys: [
      { name: "key", weight: 1 },
      { name: "categories.name", weight: 0.8 },
      { name: "name", weight: 0.4 },
    ],
    includeScore: false,
    threshold: 0.4,
  });

  const url = new URL(window.location.href);
  let searchTerm = url.searchParams.get("q") ?? "";
  handleInput();

  function handleInput() {
    // Keep the URL in sync with the search bar
    url.searchParams.set("q", searchTerm);
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
