<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import Icon from "@iconify/svelte";
  import { intersect } from "svelte-intersection-observer-action";
  import PortMaintainers from "./PortMaintainers.svelte";

  let { port }: { port: PortWithIcons } = $props();
  let visible = $state(false);

  const threshold = 0.1;
  const rootMargin = "96px 0px";
  const options = { callback, threshold, rootMargin };

  function callback(entry: IntersectionObserverEntry) {
    if (entry.isIntersecting) {
      visible = true;
    } else {
      visible = false;
    }
  }
</script>

<a href={port.repository.url} class="port-card" class:visible use:intersect={options}>
  <div class="port-header">
    <p class="port-name">{port.name}</p>
    <Icon
      color="var(--{port.color})"
      width={32}
      height={32}
      icon={{
        body: port.icon.body,
        width: port.icon.width,
        height: port.icon.height,
      }} />
  </div>
  <PortMaintainers {port} />
</a>

<style lang="scss">
  @use "../../../styles/utils";

  .port-card {
    @include utils.flex($direction: column, $gap: var(--space-sm));
    justify-content: space-between;

    @include utils.containerPadding();

    border-radius: var(--border-radius-normal);
    background-color: var(--mantle);
    background-size: 200%;
    background-position: top left;

    color: var(--subtext0);
    font-size: 1.4rem;

    opacity: 0.5;

    transform: translateY(10px);
    transition:
      transform 0.3s cubic-bezier(0, 0, 0, 1),
      opacity 0.3s cubic-bezier(0, 0, 0, 1);

    &.visible {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0s;
    }

    &:hover {
      transform: scale(102%);

      background-position: top right;

      text-decoration: none;

      @media (prefers-reduced-motion) {
        transform: none;
      }
    }

    p {
      margin: 0;
      padding: 0;
    }

    .port-header {
      @include utils.flex($gap: var(--space-sm));
      flex-wrap: nowrap;
      justify-content: space-between;
    }

    .port-name {
      color: var(--text);
      font-size: 2rem;
      font-weight: 600;
    }

    @media (prefers-reduced-motion) {
      opacity: 1;
      transform: translateY(0px);
    }
  }
</style>
