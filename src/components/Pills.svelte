<script lang="ts">
  let { list = [] }: { list?: string[] } = $props();
</script>

<ul class="pill-list">
  {#each list as entry}
    <li class="pill">{entry}</li>
  {/each}
</ul>

<style lang="scss">
  @use "../styles/utils";

  .pill-list {
    @include utils.flex($gap: var(--space-xs));

    margin: 0;
    padding: 0;

    line-height: 1;
    list-style: none;
  }

  .pill {
    @include utils.containerPadding(xxs-y);

    border-radius: 9999px;
    background-color: color-mix(in srgb, var(--base), var(--subtext0) 20%);

    font-size: 80%;
    color: var(--subtext0);
  }
</style>
