<script lang="ts">
  export let username: string;
  export let size: number;
  export let wxh: number;
</script>

<img alt="{username}'s Avatar" src="/maintainers/{size}x{size}/{username}.webp" width={wxh} height={wxh} />

<style lang="scss">
  img {
    border-radius: 50%;
    border: 1px solid var(--surface2);
    margin-left: var(--margin-left, 0);
    margin-right: var(--margin-right, 0);
    filter: grayscale(var(--grayscale, 0));
    opacity: var(--opacity, 1);
  }
</style>
