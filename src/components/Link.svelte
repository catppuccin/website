<script lang="ts">
  export let href: string;
  export let external: boolean = false;
  export let muted: boolean = false;
</script>

<!-- The <a> tag needs to be formatted like this to avoid weird whitespace issues -->
<!-- See: https://github.com/withastro/astro/issues/6893 -->
<a {href} class={`${muted ? "muted" : ""}`}>
  <slot />{#if external}<span class="external">&#x2197;</span>{/if}</a>

<style lang="scss">
  a {
    transition: color 250ms ease-in-out;

    color: var(--blue);

    &.muted {
      color: var(--subtext0);
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }

    .external {
      font-size: 60%;
      font-weight: 900;
      vertical-align: super;
    }
  }
</style>
