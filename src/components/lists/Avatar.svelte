<script lang="ts">
  export let username: string;
  export let size: number;
  export let wxh: number;
</script>

<div class="avatar-wrapper">
  <img alt="{username}'s Avatar" src="/maintainers/{size}x{size}/{username}.webp" width={wxh} height={wxh} />
</div>

<style lang="scss">
  .avatar-wrapper {
    display: inline-flex;
    border: 2px solid var(--mantle);
    background-color: var(--background-color, var(--mantle));
    margin-left: var(--margin-left, 0);
    margin-right: var(--margin-right, 0);
    border-radius: 50%;
  }
  img {
    border-radius: inherit;
  }
</style>
