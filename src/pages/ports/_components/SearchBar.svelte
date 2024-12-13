<script lang="ts">
  import MagnifyingGlass from "@data/icons/magnifying-glass.svg?raw";

  interface Props {
    searchTerm: string;
    handleInput: () => void;
  }

  let { searchTerm = $bindable(), handleInput }: Props = $props();
</script>

<div class="search-bar">
  {@html MagnifyingGlass}
  <input
    type="text"
    id="search-field"
    aria-label="Search"
    placeholder="Search port or category..."
    autocomplete="off"
    bind:value={searchTerm}
    oninput={handleInput} />
</div>

<style lang="scss">
  @use "../../../styles/utils";

  .search-bar {
    background-color: var(--mantle);
    display: flex;
    gap: var(--space-xs);
    align-items: center;
    margin-block-end: var(--space-md);
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
