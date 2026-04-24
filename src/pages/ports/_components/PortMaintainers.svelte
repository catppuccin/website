<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import ProfilePicture from "@components/ProfilePicture.svelte";

  let { port }: { port: PortWithIcons } = $props();
</script>

{#if port.repository["current-maintainers"].length > 0}
  <div class="current-maintainers">
    {#each port.repository["current-maintainers"] as maintainer}
      <ProfilePicture username={maintainer.username} size={64} wxh={32} />
    {/each}
  </div>
{:else}
  <div title="This port has no active maintainer(s)">
    <ProfilePicture username="__placeholder__" size={64} wxh={32}
                    tooltipOverride="This port has no active maintainer(s)" />
  </div>
{/if}

<style lang="scss">
  .current-maintainers :global(img) {
    margin-right: -12px;
  }
</style>
