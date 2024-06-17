<script lang="ts">
  import type { Port, Userstyle } from "../../lib/ports";
  import PillList from "../lists/Pills.svelte";
  import Icon from "@iconify/svelte";
  export let port: Port | Userstyle;
</script>

<a href={port.link} class="port-card">
  <div class="port-header">
    <p class="port-name">{Array.isArray(port.name) ? port.name.join(", ") : port.name}</p>
    <div class="port-icon">
      <Icon
        color="var(--{port.color})"
        width={24}
        height={24}
        icon={{
          body: port.icon ?? "",
          width: 24,
          height: 24,
        }} />
    </div>
  </div>

  <PillList list={port.categories.map((category) => `${category.name}`)} />
</a>

<style lang="scss">
  @use "../../styles/utils";

  .port-card {
    @include utils.flex($direction: column, $gap: var(--space-sm));
    justify-content: space-between;

    @include utils.containerPadding();

    border-radius: var(--border-radius-normal);
    background-color: var(--mantle);
    background-size: 200%;
    background-position: top left;

    color: var(--subtext0);
    font-size: 1.6rem;

    transition: all 300ms ease-in-out;

    &:hover {
      transform: scale(105%);

      background-position: top right;

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
