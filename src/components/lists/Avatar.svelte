<script lang="ts">
  import maintainersWithoutAvatars from "../../lib/maintainersWithoutAvatars.json";
  export let username: string;
  export let size: number;
  export let wxh: number;
  const isPlaceholder = (maintainersWithoutAvatars as string[]).includes(username);
</script>

{#if isPlaceholder}
  <img
    class="placeholder"
    alt="Placeholder Avatar"
    title="This user's GitHub profile was not found."
    src="/maintainers/{size}x{size}/placeholder.webp"
    width={wxh}
    height={wxh}
    loading="lazy" />
{:else}
  <img
    alt="{username}'s Avatar"
    src="/maintainers/{size}x{size}/{username}.webp"
    width={wxh}
    height={wxh}
    loading="lazy" />
{/if}

<style lang="scss">
  img {
    display: inline-flex;
    border: 2px solid var(--mantle);
    background-color: var(--base);
    margin-right: -12px;
    border-radius: 50%;
  }

  .placeholder {
    filter: grayscale(100%);
  }
</style>
