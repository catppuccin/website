<script lang="ts">
  import Icon from "@iconify/svelte";
  export let value: string;

  let state: "ready" | "success" | "failed" = "ready";

  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(value);
      state = "success";
    } catch (error) {
      state = "failed";
    }
    setTimeout(() => {
      state = "ready";
    }, 2000);
  }
</script>

<button
  class="btn btn-small btn-transparent {state === 'success' ? 'success' : state === 'failed' ? 'failed' : ''}"
  on:click={copyToClipboard}>
  <span class="copy-icon">
    <Icon width={12} height={12} icon={"ph:" + { success: "check", failed: "x", ready: "copy" }[state]} />
  </span>
  <slot />
</button>

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
