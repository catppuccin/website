<script lang="ts">
  import Fuse from "fuse.js";
  import type { Port, Userstyle } from "../lib/ports";
  import PortCard from "./cards/PortCard.svelte";

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
    threshold: 0.3,
  });

  const url = new URL(window.location.href);
  let searchTerm = url.searchParams.get("q") ?? "";
  if (url.searchParams.has("q")) {
    handleInput();
  } else {
    portGrid = ports;
  }

  function handleInput() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      searchTerm ? (portGrid = fuse.search(searchTerm).map((key) => key.item)) : (portGrid = ports);
    }, 75);
    url.searchParams.set("q", searchTerm);
    window.history.pushState(null, "", url.toString());
  }
</script>

<div class="search-bar">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"
    ><path
      d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"
    ></path
    ></svg>
  <input
    type="text"
    id="search-field"
    placeholder="Search port name or category..."
    autocomplete="off"
    bind:value={searchTerm}
    on:input={handleInput} />
</div>

<div class="port-grid">
  {#key portGrid}
    {#if searchTerm && portGrid && portGrid.length === 0}
      <slot name="no-results"></slot>
    {:else if portGrid && portGrid.length > 0}
      {#each portGrid as fields (fields.key)}
        <div style={`display: ${portGrid.includes(fields) ? "grid" : "none"}`}>
          <PortCard
            title={fields.name}
            link={fields["is-userstyle"]
              ? `https://github.com/catppuccin/userstyles/tree/main/styles/${fields.key}`
              : fields.repository.url}
            icon={fields.icon}
            categories={fields.categories}
            color={fields.color} />
        </div>
      {/each}
    {/if}
  {/key}
</div>

<style lang="scss">
  @use "../styles/utils";

  .search-bar {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
    padding: var(--space-xs) var(--space-xs);
    margin-block-end: var(--space-md);

    border-color: var(--subtext0);
    background-color: var(--mantle);
    border-radius: var(--border-radius-normal);
    color: var(--text);

    input {
      background-color: inherit;
      border-color: inherit;
      color: inherit;
      border: none;
      outline: none;
      width: 100%;
      font-size: large;
    }
  }

  .search-bar:focus-within {
    outline: solid;
    outline-width: 2px;
    outline-color: var(--blue);
  }

  input::placeholder {
    color: var(--overlay2);
  }
</style>
