<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import Pills from "@components/Pills.svelte";
  import Icon from "@iconify/svelte";
  import PortMaintainers from "./PortMaintainers.svelte";
  import { intersect } from "svelte-intersection-observer-action";

  let { port }: { port: PortWithIcons } = $props();

  const threshold = 0.1;
  const rootMargin = "96px 0px";
  const options = { callback, threshold, rootMargin };

  function callback(entry: IntersectionObserverEntry) {
    const target = entry.target as HTMLElement;
    if (entry.isIntersecting) {
      target.classList.add("visible");
    } else {
      target.classList.remove("visible");
    }
  }
</script>

<!-- 
  For some reason, I can't default the port cards to not visible.
  Svelte says to use `:global` on selectors to avoid unused CSS being stripped
  out but it's not working.
-->
<a href={port.repository.url} class="port-card visible" use:intersect={options}>
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

    opacity: 0;
    transform: translateY(10px);
    transition:
      transform 0.3s cubic-bezier(0, 0, 0, 1),
      opacity 0.1s;

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
  }
</style>
