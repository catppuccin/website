<script lang="ts">
  import MagnifyingGlass from "./svgs/MagnifyingGlass.svelte";

  export let searchTerm: string;
  export let handleInput: () => void;
</script>

<div class="search-bar">
  <MagnifyingGlass />
  <input
    type="text"
    id="search-field"
    aria-label="Search"
    placeholder="Search port or category..."
    autocomplete="off"
    bind:value={searchTerm}
    on:input={handleInput} />
</div>

<style lang="scss">
  @use "@styles/utils";

  .search-bar {
    background-color: var(--mantle);
    display: flex;
    gap: var(--space-xs);
    align-items: center;
    margin-block-end: var(--space-sm);
    border-radius: var(--border-radius-normal);
    padding-inline: var(--space-xs);

    input {
      padding: var(--space-sm) 0;
      background-color: inherit;
      border-color: inherit;
      color: inherit;
      border-radius: inherit;
      border: none;
      outline: none;
      width: 100%;
      font-size: 2rem;
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
