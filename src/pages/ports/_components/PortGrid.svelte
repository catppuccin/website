<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import PortCard from "./PortCard.svelte";

  interface Props {
    portGrid: Array<PortWithIcons> | undefined;
    searchTerm: string;
  }

  let { portGrid, searchTerm }: Props = $props();
</script>

<div class="port-grid">
  {#key portGrid}
    {#if searchTerm && portGrid && portGrid.length === 0}
      <div>
        <p>Sorry, we couldn't find any ports matching your search :(</p>
        <p>
          You can request a port to be themed by raising a
          <a href="https://github.com/catppuccin/catppuccin/discussions/new?category=port-requests"
            >port request in catppuccin/catppuccin</a
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
