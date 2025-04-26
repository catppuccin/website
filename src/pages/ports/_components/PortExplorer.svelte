<script lang="ts">
  import Fuse from "fuse.js/min-basic";
  import type { CategoryWithPortCount, PlatformKey, Platforms, PortWithIcons } from "@data/ports";
  import type { CategoryKey } from "@catppuccin/catppuccin/resources/types/ports.porcelain.schema";
  import SearchBar from "./SearchBar.svelte";
  import PortGrid from "./PortGrid.svelte";
  import { scrollToTop, debounce, updatePorts } from "./utils.svelte";

  interface Props {
    ports: Array<PortWithIcons>;
    platforms: Platforms;
    categories: CategoryWithPortCount[];
  }

  let { ports, platforms, categories }: Props = $props();

  const url = new URL(window.location.href);

  let searchTerm = $state(url.searchParams.get("q") ?? "");
  let chosenPlatforms: PlatformKey[] = $state(url.searchParams.getAll("p") as PlatformKey[]);
  let chosenCategories: CategoryKey[] = $state(url.searchParams.getAll("c") as CategoryKey[]);

  const fuse = new Fuse([] as PortWithIcons[], {
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

  const portGrid = $derived.by(
    debounce(
      () => [searchTerm, chosenPlatforms, chosenCategories],
      () => updatePorts(ports, fuse, url, searchTerm, chosenPlatforms, chosenCategories),
      // svelte-ignore state_referenced_locally
      updatePorts(ports, fuse, url, searchTerm, chosenPlatforms, chosenCategories),
      50,
    ),
  );
  const numSearchResults = $derived(portGrid.length);
  const userInteracted = $derived(searchTerm.length > 0 || chosenCategories.length > 0 || chosenPlatforms.length > 0);
</script>

<div class="explorer">
  <form class="search-filters">
    <SearchBar bind:searchTerm {numSearchResults} />
    <fieldset>
      <legend>Platforms</legend>
      {#each platforms as platform}
        <input
          id={platform.key}
          value={platform.key}
          type="checkbox"
          bind:group={chosenPlatforms}
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
          bind:group={chosenCategories}
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
