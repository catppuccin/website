<button class="btn btn-small btn-transparent {state === 'success' ? "success" : state === 'failed' ? 'failed' : ''}" on:click={copyToClipboard}>
  <span class="copy-icon">
    <svg width="12" height="12" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      {#if state == "success"}
        <path d="M243.33,90.91,114.92,219.31a16,16,0,0,1-22.63,0l-71.62-72a16,16,0,0,1,0-22.61l24-24a16,16,0,0,1,22.57-.06l36.64,35.27.11.11h0l92.73-91.37a16,16,0,0,1,22.58,0l24,23.56A16,16,0,0,1,243.33,90.91Z"/>
      {:else if state == "failed"}
        <path d="M232,104v48a16,16,0,0,1-16,16H168v48a16,16,0,0,1-16,16H104a16,16,0,0,1-16-16V168H40a16,16,0,0,1-16-16V104A16,16,0,0,1,40,88H88V40a16,16,0,0,1,16-16h48a16,16,0,0,1,16,16V88h48A16,16,0,0,1,232,104Z" style="transform: rotate(45deg); transform-origin: center;"/>
      {:else}
        <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"/>
      {/if}
    </svg>
  </span>
  <slot />
</button>

<script lang="ts">
  export let value: string;

  let state: "ready" | "success" | "failed" = "ready";

  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(value);
      state = "success";
    }
    catch (error) {
      state = "failed";
    }
    setTimeout(() => {
      state = "ready";
    }, 2000)
  }
</script>

<style lang="scss">
  button {
    font-size: 80%;
    font-family: monospace;
    white-space: pre;

    svg path {
      fill: currentColor;
    }

    &.success {
      color: var(--green);
    }

    &.failed {
      color: var(--red);
    }
  }
</style>
