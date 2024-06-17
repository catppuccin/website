<script lang="ts">
  export let searchTerm: string;
  export let handleInput: () => void;
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
