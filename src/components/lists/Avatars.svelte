<script lang="ts">
  import type { Port } from "../../lib/ports";
  import NoMaintainerAvatar from "../svgs/NoMaintainer.svelte";
  import Avatar from "./Avatar.svelte";

  export let port: Port & { icon: string };
</script>

<div class="avatar-list">
  {#if port.repository["current-maintainers"].length > 0}
    <div class="current-maintainers" title="All current maintainers of this port">
      {#each port.repository["current-maintainers"] as maintainer}
        <Avatar username={maintainer.username} size={64} wxh={32} --margin-right="-12px" />
      {/each}
    </div>
  {:else}
    <div title="No maintainers for this port">
      <NoMaintainerAvatar />
    </div>
  {/if}
  <div class="past-maintainers" title="All users who previously maintained this port">
    {#each port.repository["past-maintainers"] as maintainer}
      <Avatar
        username={maintainer.username}
        size={64}
        wxh={32}
        --margin-left="-12px"
        --grayscale="100%"
        --opacity="80%" />
    {/each}
  </div>
</div>

<style lang="scss">
  @use "../../styles/utils";

  .avatar-list {
    display: flex;
    gap: var(--space-xxs);
    justify-content: space-between;
  }
</style>
