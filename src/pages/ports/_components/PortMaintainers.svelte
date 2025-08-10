<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import ProfilePicture from "@components/ProfilePicture.svelte";
  import NoMaintainerIcon from "@data/icons/lucide-user-round-x.svg?raw";
  import type { RepositoryCurrentMaintainers } from "@catppuccin/catppuccin/resources/types/ports.porcelain.schema";

  let {
    currentMaintainers,
    currentMaintainersLength,
  }: { currentMaintainers: RepositoryCurrentMaintainers; currentMaintainersLength: number } = $props();
</script>

{#if currentMaintainersLength > 0}
  <div class="current-maintainers" title="All users who currently maintain this port">
    {#each currentMaintainers as maintainer}
      <ProfilePicture username={maintainer.username} size={64} wxh={32} />
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
