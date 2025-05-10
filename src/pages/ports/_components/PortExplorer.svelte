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
  let categoryRadioButtons: HTMLInputElement[] = $state([]);

  /**
   * Allow categories to be deselected on another click.
   */
  function deselectCategory(index: number, category: CategoryWithPortCount) {
    const isCategorySelected =
      categoryRadioButtons[index] && categoryRadioButtons[index].checked && urlParams.category === category.key;
    if (isCategorySelected) {
      scrollToTop();
      urlParams.category = null;
      updateCategoryUrlParams();
    }
  }

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
  const queryResultsNum = $derived(portGrid.length);
</script>

<div class="explorer" id="ports-explorer">
  <form class="search-filters">
    <SearchBar {queryResultsNum} />
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
            onclick={() => deselectCategory(i, category)}
            onchange={() => {
              scrollToTop();
              updateCategoryUrlParams();
            }} />
          {category.name}
          <span class="label-pill">{category.portCount}</span>
        </label>
      {/each}
    </fieldset>
  </form>
  <div class="grid">
    <PortGrid {portGrid} />
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
    --_checked-colour: var(--mauve);

    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    margin-block-end: var(--space-sm);
    border-radius: var(--border-radius-normal);
    background-color: var(--mantle);

    legend {
      margin-block: var(--space-lg) var(--space-sm);
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
      max-height: calc(90svh - (var(--space-sm) * 2));
      padding: var(--space-sm);
      overflow-y: auto;
      scrollbar-color: var(--mauve) transparent;
      scrollbar-width: thin;
      scrollbar-gutter: stable;

      fieldset {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xxs);
      }

      :global(.search-bar) {
        position: sticky;
        top: 0;
        background-color: var(--crust);

        &::before {
          content: "";
          position: absolute;
          top: calc(var(--space-sm) * -1);
          left: 0;
          right: 0;
          z-index: -1;
          height: var(--space-sm);
          background-color: var(--mantle);
        }
      }
    }

    label {
      display: flex;
      gap: var(--space-xxs);
      align-items: center;
      padding: calc(var(--space-xxs) / 2) var(--space-xxs);
      padding-inline-start: 0;
      border: 2px solid var(--surface0);
      font-size: 80%;
      white-space: nowrap;
      user-select: none;

      &:hover,
      &:focus-within {
        border-color: var(--_checked-colour) !important;
      }

      .label-pill {
        padding: 2px 6px;
        border-radius: 999px;
        background-color: var(--surface0);
        font-size: 70%;
        font-weight: 600;
      }
    }

    input[type="radio"],
    input[type="checkbox"] {
      margin: 0;
      width: 0;
      height: 0;
    }

    label:has([type="checkbox"]) {
      border-radius: var(--border-radius-normal);
    }

    label:has([type="radio"]) {
      padding-inline-start: var(--space-xxs);
      border-radius: 999px;
    }

    label:has(input:checked) {
      border-color: color-mix(in srgb, 40% var(--_checked-colour), var(--base));
      background-color: color-mix(in srgb, 10% var(--_checked-colour), var(--base));
      color: var(--_checked-colour);

      .label-pill {
        background-color: color-mix(in srgb, 25% var(--_checked-colour), var(--base));
        color: var(--_checked-colour);
      }
    }
  }
</style>
