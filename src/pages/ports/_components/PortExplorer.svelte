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
        <label for={platform.key}>
          <input
            id={platform.key}
            value={platform.key}
            type="checkbox"
            bind:group={urlParams.platforms}
            onchange={() => {
              scrollToTop();
              updatePlatformsUrlParams();
            }} />
          {platform.name}
        </label>
      {/each}
    </fieldset>
    <fieldset>
      <legend>Categories</legend>
      {#each categories as category, i (category.key)}
        <label for={category.key}>
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
            {category.name}
            <!-- <span class="label-pill">{category.portCount}</span> -->
          </label>
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
    padding: var(--space-sm);
    border-radius: var(--border-radius-normal);
    background-color: var(--mantle);

    input[type="radio"],
    input[type="checkbox"] {
      appearance: none;
      position: relative;
      margin: 0;
      width: var(--space-md); aspect-ratio: 1/1;
      border: 2px solid var(--overlay0);
      border-radius: 3px;
      transform: translateY(.2em);

      &::before {
        content: '';
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: calc(var(--space-md) / 1.5); aspect-ratio: 1/1;
        border-radius: 3px;
        background-color: transparent;
      }
    }

    input[type="radio"],
    input[type="radio"]::before {
      border-radius: 999px;
    }

    label {
      padding: 3px 8px 4px 6px;
      border: 2px solid var(--surface0);
      white-space: nowrap;
      font-size: 80%;
      user-select: none;

      &:hover,
      &:focus {
        border-color: var(--blue);
      }

      .label-pill {
        height: 100%;
        padding: 2px 4px;
        border-radius: 999px;
        background-color: var(--surface0);
        font-size: 80%;
        font-weight: 600;
      }
    }

    label:has([type="checkbox"]) {
      border-radius: var(--border-radius-normal);
    }

    label:has([type="radio"]) {
      padding-inline-start: 8px;
      border-radius: 999px;
    }

    label:has(input:checked) {
      border-color: var(--blue);
      background-color: color-mix(
        in srgb,
        25% var(--blue),
        var(--base)
      );
      color: var(--blue);

      input[type="radio"],
      input[type="checkbox"] {
        border-color: var(--base);
        background-color: var(--base);

        &::before { background-color: var(--blue); }
      }

      .label-pill {
        background-color: var(--base);
        color: var(--blue);
      }
    }

    legend {
      margin-block: var(--space-md) var(--space-xs);
      font-size: 80%;
      color: var(--text);
    }
    fieldset {
      display: none;
      padding: 0;
      border: none;
    }

    @media (min-width: 56rem) {
      position: sticky;
      top: var(--space-sm);
      fieldset {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xxs);
      }
    }
  }
</style>
