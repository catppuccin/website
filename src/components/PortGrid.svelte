<script lang="ts">
  import PortCard from "./cards/Port.svelte";
  import type { Port } from "../lib/ports";

  export let portGrid: Array<Port> | undefined;
  export let searchTerm: string;
</script>

<div class="port-grid">
  {#key portGrid}
    {#if searchTerm && portGrid && portGrid.length === 0}
      <slot name="no-results" />
    {:else if portGrid && portGrid.length > 0}
      {#each portGrid as port (port.key)}
        <PortCard {port} />
      {/each}
    {/if}
  {/key}
</div>
