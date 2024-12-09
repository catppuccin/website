<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    href,
    external = false,
    muted = false,
    underline = true,
    children,
  }: {
    href: string;
    external?: boolean;
    muted?: boolean;
    underline?: boolean;
    children: Snippet;
  } = $props();
</script>

<!-- The <a> tag needs to be formatted like this to avoid weird whitespace issues -->
<!-- See: https://github.com/withastro/astro/issues/6893 -->
<a {href} class:external class:muted class:underline>
  {@render children()}{#if external}<span class="external">&#x2197;</span>{/if}</a>

<style lang="scss">
  a {
    transition: color 250ms ease-in-out;

    color: var(--blue);

    &.muted {
      color: var(--subtext0);
    }

    &.underline:hover,
    &.underline:focus {
      text-decoration: underline;
    }

    .external {
      font-size: 60%;
      font-weight: 900;
      vertical-align: super;
    }
  }
</style>
