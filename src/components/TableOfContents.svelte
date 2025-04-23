<script>
  import Toc from "svelte-toc";
  import "@styles/_utils.scss";
</script>

<Toc
  --toc-font-size="inherit"
  --toc-padding="1rem"
  --toc-z-index="10"
  --toc-width="auto"
  --toc-mobile-btn-border-radius="0.25em"
  --toc-mobile-btn-color="var(--text)"
  --toc-mobile-btn-bg="var(--surface0)"
  --toc-mobile-bg="var(--surface0)"
  --toc-desktop-sticky-top="0"
  --toc-li-color="var(--subtext1)"
  --toc-li-hover-bg="color-mix(in oklab, transparent, currentcolor 8%)"
  --toc-li-hover-color="var(--text)"
  --toc-li-border-radius="0.5em"
  --toc-li-padding="0.35em 0.6em"
  --toc-active-border-radius="0.5em"
  --toc-active-bg="color-mix(in oklab, color-mix(in oklab, var(--base), currentcolor 25%), #000 25%)"
  --toc-active-color="var(--accent-color)"
  breakpoint="1000"
  blurParams={{ duration: 0 }}>
</Toc>

<style>
  :global {
    aside.toc {
      & > nav {
        border-radius: 1em;
        & > h2 {
          padding-inline: 0.1em;
          padding-block: 0.5em 0.4em;
        }
        & > ol {
          & > li {
            font-size: 90% !important;
          }
        }
      }
      &.mobile {
        display: none;
      }
    }
  }
</style>
