<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import Pills from "@components/Pills.svelte";
  import Icon from "@iconify/svelte";
  import PortMaintainers from "./PortMaintainers.svelte";

  let { port }: { port: PortWithIcons } = $props();

  let isVisible = $state(false);
  let element;

  $effect(() => {
    let observer = new IntersectionObserver(
      (entries: HTMLElement[]) => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          isVisible = entry.isIntersecting;
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });
</script>

<a bind:this={element} href={port.repository.url} class="port-card" class:port-visible={isVisible}>
  <div class="port-header">
    <p class="port-name">{Array.isArray(port.name) ? port.name.join(", ") : port.name}</p>
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

  <Pills list={port.categories.map((category) => `${category.name}`)} />

  <PortMaintainers {port} />
</a>

<style lang="scss">
  @use "../../../styles/utils";

  .port-card {
    @include utils.flex($direction: column, $gap: var(--space-md));
    justify-content: space-between;

    @include utils.containerPadding();

    border-radius: var(--border-radius-normal);
    background-color: var(--mantle);
    background-size: 200%;
    background-position: top left;

    color: var(--subtext0);
    font-size: 1.6rem;

    transition:
      opacity 225ms cubic-bezier(0, 0, 0, 1),
      translate 225ms cubic-bezier(0, 0, 0, 1),
      scale 225ms cubic-bezier(0, 0, 0, 1);

    will-change: opacity, scale;

    &::before {
      content: "";
      position: absolute;
      inset: 0;

      border-radius: inherit;
      background-color: var(--surface0);

      transition: opacity 200ms cubic-bezier(0.2, 0, 0, 1);
      will-change: opacity;
      opacity: 0;

      z-index: -1;
    }

    &:focus-visible {
      scale: 100%;

      text-decoration: none;

      &::before {
        opacity: 1;
      }
    }

    @media (hover: hover) {
      &:hover {
        scale: 105%;

        text-decoration: none;

        &::before {
          opacity: 1;
        }
      }
    }

    &:focus {
      text-decoration: none;
    }

    &:active {
      scale: 95%;

      &::before {
        opacity: 0.65;
      }
    }

    & {
      opacity: 1;
      translate: 0 0;
    }
    &:not(.port-visible) {
      opacity: 0;
      scale: 0.9;
      translate: 0 10%;
    }
  }
  .port-header {
    @include utils.flex($gap: var(--space-sm));
    flex-wrap: nowrap;
    justify-content: space-between;
    & > p {
      margin: 0;
      padding: 0;
    }
  }

  .port-name {
    color: var(--text);
    font-size: 2rem;
    font-weight: 600;
  }
</style>
