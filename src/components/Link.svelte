<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    externalIcon?: boolean;
    muted?: boolean;
    underline?: boolean;
    children: Snippet;
  }

  let { href, externalIcon = true, muted = false, underline = true, children }: Props = $props();

  const domain = import.meta.env.SITE;
</script>

<!-- We need the "externalIcon" boolean since we may not always to put the external icon on external links. -->
<!-- For example, the "Powered By Vercel" badge. -->
{#snippet externalLinkIcon()}
  {#if externalIcon}<span class="external">&#x2197;</span>{/if}
{/snippet}

{#if !href.includes(domain) && !href.startsWith("/") && !href.startsWith("#")}
  <a {href} class:muted class:underline>{@render children()}{@render externalLinkIcon()}</a>
{:else}
  <a {href} class:muted class:underline class="rehype-heading-link">{@render children()}</a>
{/if}

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
