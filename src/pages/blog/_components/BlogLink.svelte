<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    children: Snippet;
  }

  let { href, children }: Props = $props();

  const domain = import.meta.env.SITE;
</script>

<!-- We need the "externalIcon" boolean since we may not always to put the external icon on external links. -->
<!-- For example, the "Powered By Vercel" badge. -->
{#snippet externalLinkIcon()}
  <span class="external">&#x2197;</span>
{/snippet}

{#if !href.includes(domain) && !href.startsWith("/") && !href.startsWith("#")}
  <a {href}>{@render children()}{@render externalLinkIcon()}</a>
{:else}
  <a {href} class="rehype-heading-link">{@render children()}</a>
{/if}

<style lang="scss">
  a {
    transition: color 250ms ease-in-out;

    color: var(--blue);

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
