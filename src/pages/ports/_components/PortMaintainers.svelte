<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import ProfilePicture from "@components/ProfilePicture.svelte";
  import Icon from "@components/Icon.svelte";

  let { port }: { port: PortWithIcons } = $props();
</script>

{#if port.repository["current-maintainers"].length > 0}
  <div class="current-maintainers" title="All users who currently maintain this port">
    {#each port.repository["current-maintainers"] as maintainer}
      <ProfilePicture username={maintainer.username} size={64} wxh={32} />
    {/each}
  </div>
{:else}
  <div title="This port has no active maintainer(s)">
    <Icon name="lucide:user-round-x" width={32} height={32} />
  </div>
{/if}

<style lang="scss">
  .current-maintainers :global(img) {
    margin-right: -12px;
  }
</style>
