<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import Link from "@components/Link.svelte";
  import PortCard from "./PortCard.svelte";

  export let portGrid: Array<PortWithIcons> | undefined;
  export let searchTerm: string;
</script>

<div class="port-grid">
  {#key portGrid}
    {#if searchTerm && portGrid && portGrid.length === 0}
      <div>
        <p>Sorry, we couldn't find any ports matching your search :(</p>
        <p>
          You can request a port to be themed by raising a
          <Link href="https://github.com/catppuccin/catppuccin/discussions/new?category=port-requests" external
            >port request in catppuccin/catppuccin</Link
          >.
        </p>
      </div>
    {:else if portGrid && portGrid.length > 0}
      {#each portGrid as port (port.key)}
        <PortCard {port} />
      {/each}
    {/if}
  {/key}
</div>
