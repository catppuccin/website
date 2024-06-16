<script lang="ts">
  import Fuse from "fuse.js";
  import type { Port, Userstyle } from "../lib/ports";
  import PortCard from "./cards/PortCard.svelte";
  import { fly } from "svelte/transition";

  export let ports: Array<Port | Userstyle>;
  let portGrid: Array<Port | Userstyle> = ports;

  const fuse = new Fuse(ports, {
    keys: [
      { name: "name", weight: 1 },
      { name: "categories.name", weight: 0.8 },
      { name: "key", weight: 0.6 },
    ],
    includeScore: false,
    threshold: 0.4,
  });

  // const urlParams = new URLSearchParams(window.location.search);
  // const query = urlParams.get("q");

  let debounceTimeout: NodeJS.Timeout;
  let searchTerm: string = "";
  function handleInput() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      searchTerm ? (portGrid = fuse.search(searchTerm).map((key) => key.item)) : (portGrid = ports);
    }, 125);
  }
</script>

<div id="search-input-cont">
  <input
    type="text"
    id="search-field"
    placeholder="Enter a port name or category..."
    autocomplete="off"
    bind:value={searchTerm}
    on:input={handleInput} />
</div>

<div class="port-grid">
  {#key portGrid}
    {#if portGrid.length === 0}
      <slot name="no-results"></slot>
    {:else if portGrid.length > 0}
      {#each portGrid as fields (fields.key)}
        <PortCard
          title={fields.name}
          link={fields["is-userstyle"]
            ? `https://github.com/catppuccin/userstyles/tree/main/styles/${fields.key}`
            : fields.repository.url}
          icon={fields.icon}
          categories={fields.categories}
          color={fields.color} />
      {/each}
    {/if}
  {/key}
</div>

<style lang="scss">
  @use "../styles/utils";

  .port-grid {
    @include utils.grid($column: 250px, $gap: var(--space-md));
  }
</style>
