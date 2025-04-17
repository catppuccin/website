<script>
  import Toc from "svelte-toc";
  import "@styles/_utils.scss";
</script>

<Toc
  --toc-font-size="clamp(15px, 4vw, 2rem)"
  --toc-padding="0.25em"
  --toc-width="auto"
  --toc-mobile-btn-border-radius="0.25em"
  --toc-mobile-btn-color="var(--text)"
  --toc-mobile-btn-bg="var(--surface0)"
  --toc-mobile-bg="var(--surface0)"
  --toc-desktop-max-width="300px"
  --toc-desktop-sticky-top="1em"
  --toc-li-hover-color="var(--accent-color)"
  --toc-li-border-radius="0.5em"
  --toc-li-padding="0.25em 0.5em"
  --toc-active-border-radius="0.5em"
  --toc-active-bg="var(--accent-color)"
  --toc-active-color="var(--base)"
  breakpoint="1000"
  blurParams={{ duration: 0 }}>
</Toc>

<style>
  :global(aside.toc) {
    & > nav {
      border-radius: 1em;
      :global(& > h2) {
        padding: 0.25em 0.1em;
      }
      :global(& > ol) {
        & > li {
          font-size: clamp(15px, 4vw, 2rem) !important;
        }
      }
    }
  }

  :global(aside.toc.mobile) {
    & > nav {
      :global(& > h2) {
        display: none;
      }
      :global(& > ol) {
        margin-block: 0;
      }
    }
  }
</style>
