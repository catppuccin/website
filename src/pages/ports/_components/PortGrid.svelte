<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import PortCard from "./PortCard.svelte";

  interface Props {
    portGrid: PortWithIcons[];
  }

  let { portGrid }: Props = $props();
</script>

<div class="port-grid">
  {#if portGrid.length === 0}
    <div>
      <p>Sorry, we couldn't find any ports matching your search :(</p>
      <p>
        You can request a port to be themed by raising a
        <a href="https://github.com/catppuccin/catppuccin/discussions/new?category=port-requests"
          >port request in catppuccin/catppuccin</a
        >.
      </p>
    </div>
  {:else if portGrid.length > 0}
    {#each portGrid as port (port.key)}
      <PortCard {port} />
    {/each}
  {/if}
</div>
