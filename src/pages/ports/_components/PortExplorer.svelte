<script lang="ts">
  import type { CategoryWithPortCount, Platforms, PortWithIcons } from "@data/ports";
  import SearchBar from "./SearchBar.svelte";
  import PortGrid from "./PortGrid.svelte";
  import { scrollToTop, debounce, performSearch, filterPorts, searchParams } from "./state.svelte";

  interface Props {
    ports: Array<PortWithIcons>;
    platforms: Platforms;
    categories: CategoryWithPortCount[];
  }

  let { ports, platforms, categories }: Props = $props();

  // we need to recreate the port grid from search params so that it doesn't
  // flash the page with the wrong ports when the user refreshes the page
  const initialPortGrid = performSearch(
    searchParams.searchText,
    filterPorts(ports, searchParams.platforms, searchParams.categories),
  );

  // these are separate so that only searching is debounced.
  // it means that ticking checkboxes is snappy, and searches are debounced to improve user experience
  const filteredPorts = $derived.by(() => filterPorts(ports, searchParams.platforms, searchParams.categories));
  const searchedPorts = $derived.by(
    debounce(
      () => [searchParams.searchText, filteredPorts],
      () => performSearch(searchParams.searchText, filteredPorts),
      initialPortGrid,
      25,
    ),
  );
  // only debounce when the user has searched for something
  const portGrid = $derived(searchParams.searchText.length > 0 ? searchedPorts : filteredPorts);
  const numOfSearchResults = $derived(portGrid.length);
  const userInteracted = $derived(
    searchParams.searchText.length > 0 || searchParams.categories.length > 0 || searchParams.platforms.length > 0,
  );
</script>

<div class="explorer">
  <form class="search-filters">
    <SearchBar {numOfSearchResults} />
    <fieldset>
      <legend>Platforms</legend>
      {#each platforms as platform}
        <input
          id={platform.key}
          value={platform.key}
          type="checkbox"
          bind:group={searchParams.platforms}
          onchange={scrollToTop} />
        <label for={platform.key}>{platform.name}</label>
      {/each}
    </fieldset>
    <fieldset>
      <legend>Categories</legend>
      {#each categories as category}
        <input
          id={category.key}
          value={category.key}
          type="checkbox"
          bind:group={searchParams.categories}
          onchange={scrollToTop} />
        <label for={category.key}>{category.name}</label>
      {/each}
    </fieldset>
  </form>
  <div class="grid">
    <PortGrid {portGrid} {userInteracted} />
  </div>
</div>

<style lang="scss">
  @use "../../../styles/utils";

  .explorer {
    position: relative;
    @media (min-width: 56rem) {
      display: grid;
      align-items: start;
      grid-template-columns: 4fr 6fr;
      gap: var(--space-sm);
    }
  }

  .search-filters {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    margin-block-end: var(--space-sm);

    input {
      display: none;
    }

    label {
      padding: 2px;
    }

    input:checked + label {
      background-color: var(--blue);
      color: var(--base);
    }

    legend {
      color: var(--text);
    }
    fieldset {
      display: none;
      background-color: var(--base);
      border-color: var(--overlay2);
      border-radius: var(--border-radius-normal);
    }

    @media (min-width: 56rem) {
      position: sticky;
      top: var(--space-sm);
      fieldset {
        display: block;
      }
    }
  }
</style>
