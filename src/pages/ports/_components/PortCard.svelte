<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import Pills from "@components/Pills.svelte";
  import Icon from "@iconify/svelte";
  import PortMaintainers from "./PortMaintainers.svelte";

  let { port }: { port: PortWithIcons } = $props();
</script>

<a href={port.repository.url} class="port-card">
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

    transition: scale 200ms cubic-bezier(0, 0, 0, 1);

    will-change: scale;

    // State layer
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: var(--surface0);
      transition: opacity 50ms linear;
      opacity: 0;

      will-change: opacity;
      z-index: -1;
    }

    @media (hover: hover) {
      &:hover {
        text-decoration: none;
        @media (prefers-reduced-motion: no-preference) {
          scale: 1.05;
        }
        &::after {
          opacity: 1;
        }
      }
    }

    &:active {
      scale: 0.975;
      &::after {
        opacity: 0.65;
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
  }
</style>
