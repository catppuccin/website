<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
  import PortCard from "./PortCard.svelte";
  import type { PortWithIcons } from "@data/ports";

  export let portGrid: Array<PortWithIcons> | undefined;
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
