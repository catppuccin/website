<script lang="ts">
  export let username: string;
  export let size: number;
  export let wxh: number;
</script>

<img
  alt="{username}'s Avatar"
  src="/maintainers/{size}x{size}/{username}.webp"
  width={wxh}
  height={wxh}
  loading="lazy" />

<style lang="scss">
  img {
    display: inline-flex;
    border: 2px solid var(--mantle);
    background-color: var(--base);
    margin-right: -12px;
    border-radius: 50%;
  }
</style>
