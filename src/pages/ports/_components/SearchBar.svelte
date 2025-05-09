<script lang="ts">
  import MagnifyingGlass from "@data/icons/magnifying-glass.svg?raw";

  interface Props {
    searchTerm: string;
    handleInput: () => void;
  }

  let { searchTerm = $bindable(), handleInput }: Props = $props();
</script>

<div class="search-bar">
  <div class="icon-container">
    {@html MagnifyingGlass}
  </div>
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
    margin-block-end: var(--space-sm);
    border-radius: var(--border-radius-normal);

    position: relative;

    .icon-container {
      position: absolute;
      height: 100%;
      margin-block: 12px;
      padding-inline: var(--space-xs) 0;
      pointer-events: none;
    }

    input {
      padding: var(--space-sm) 0;
      background-color: transparent;
      border-color: inherit;
      border-radius: inherit;
      color: inherit;

      border: none;
      width: 100%;
      font-size: 2rem;

      padding-inline: calc(40px + var(--space-xs)) var(--space-xs);
    }
  }

  input::placeholder {
    color: var(--overlay2);
  }
</style>
