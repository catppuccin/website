<script lang="ts">
  import type { Port } from "../../lib/ports";
  import NoMaintainerAvatar from "../svgs/NoMaintainer.svelte";
  import Avatar from "./Avatar.svelte";

  export let port: Port & { icon: string };
</script>

{#if port.repository["current-maintainers"].length > 0}
  <div class="current-maintainers" title="All users who currently maintain this port">
    {#each port.repository["current-maintainers"] as maintainer}
      <Avatar username={maintainer.username} size={64} wxh={32} />
    {/each}
  </div>
{:else}
  <div title="This port has no active maintainer(s)">
    <NoMaintainerAvatar />
  </div>
{/if}
