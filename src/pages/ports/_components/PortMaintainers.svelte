<script lang="ts">
  import type { Port } from "@data/ports";
  import NoMaintainerIcon from "./NoMaintainerIcon.svelte";
  import ProfilePicture from "@components/ProfilePicture.svelte";

  export let port: Port & { icon: string };
</script>

{#if port.repository["current-maintainers"].length > 0}
  <div class="current-maintainers" title="All users who currently maintain this port">
    {#each port.repository["current-maintainers"] as maintainer}
      <ProfilePicture username={maintainer.username} size={64} wxh={32} />
    {/each}
  </div>
{:else}
  <div title="This port has no active maintainer(s)">
    <NoMaintainerIcon />
  </div>
{/if}

<style lang="scss">
  :global(img) {
    margin-right: -12px;
  }
</style>