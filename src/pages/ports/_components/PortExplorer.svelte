<script lang="ts">
  import type { CategoryWithPortCount, Platforms, PortWithIcons } from "@data/ports";
  import SearchBar from "./SearchBar.svelte";
  import PortGrid from "./PortGrid.svelte";
  import {
    scrollToTop,
    debounce,
    queryPorts,
    filterPorts,
    urlParams,
    updateCategoryUrlParams,
    updatePlatformsUrlParams,
  } from "./state.svelte";

  interface Props {
    ports: PortWithIcons[];
    platforms: Platforms;
    categories: CategoryWithPortCount[];
  }

  let { ports, platforms, categories }: Props = $props();
  let categoryRadioButtons: HTMLInputElement[] | undefined = $state([]);

  // we need to recreate the port grid from search params so that it doesn't
  // flash the page with the wrong ports when the user refreshes the page
  const initialPortGrid = queryPorts(filterPorts(ports));

  // searching is debounced to improve user experience
  const queriedPorts = $derived.by(
    debounce(
      () => [urlParams.query],
      () => queryPorts(ports),
      initialPortGrid,
      25,
    ),
  );

  const portGrid = $derived(filterPorts(queriedPorts));
  const numOfSearchResults = $derived(portGrid.length);
  const userInteracted = $derived(
    urlParams.query !== null || urlParams.category !== null || urlParams.platforms.length > 0,
  );
</script>

<div class="explorer">
  <form class="search-filters">
    <SearchBar {numOfSearchResults} />
    <fieldset>
      <legend>Platforms</legend>
      {#each platforms as platform (platform.key)}
        <input
          id={platform.key}
          value={platform.key}
          type="checkbox"
          bind:group={urlParams.platforms}
          onchange={() => {
            scrollToTop();
            updatePlatformsUrlParams();
          }} />
        <label for={platform.key}>{platform.name}</label>
      {/each}
    </fieldset>
    <fieldset>
      <legend>Categories</legend>
      {#each categories as category, i (category.key)}
        <input
          id={category.key}
          value={category.key}
          type="radio"
          bind:this={categoryRadioButtons[i]}
          bind:group={urlParams.category}
          onclick={() => {
            // allow categories to be deselected on the second click
            if (categoryRadioButtons[i] && categoryRadioButtons[i].checked && urlParams.category === category.key) {
              urlParams.category = null;
              updateCategoryUrlParams();
            }
          }}
          onchange={() => {
            scrollToTop();
            updateCategoryUrlParams();
          }} />
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
