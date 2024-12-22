<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import ProfilePicture from "@components/ProfilePicture.svelte";
  import NoMaintainerIcon from "@data/icons/lucide-user-round-x.svg?raw";

  let { port }: { port: PortWithIcons } = $props();
</script>

{#if port.repository["current-maintainers"].length > 0}
  <div class="current-maintainers" title="All users who currently maintain this port">
    {#each port.repository["current-maintainers"] as maintainer}
      <ProfilePicture username={maintainer.username} size={64} wxh={32} loading="lazy" />
    {/each}
  </div>
{:else}
  <div title="This port has no active maintainer(s)">
    {@html NoMaintainerIcon}
  </div>
{/if}

<style lang="scss">
  .current-maintainers :global(img) {
    margin-right: -12px;
  }
</style>
