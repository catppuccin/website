<script lang="ts">
  import type { PortWithIcons } from "@data/ports";
  import Icon from "@iconify/svelte";
  import PortMaintainers from "./PortMaintainers.svelte";

  let { port }: { port: PortWithIcons } = $props();
</script>

<a href={port.repository.url} class="port-card" style="--port-color: var(--{port.color});">

  <p class="port-name">{Array.isArray(port.name) ? port.name.join(", ") : port.name}</p>

  <figure class="port-icon">
    <Icon
      color="var(--crust)"
      width={24}
      height={24}
      icon={{
        body: port.icon.body,
        width: port.icon.width,
        height: port.icon.height,
      }} />
  </figure>

  <PortMaintainers {port} />

</a>

<style lang="scss">
  @use "../../../styles/utils";

  .port-card {
    --hover-x-transition: 6px;
    --port-color-gradient: linear-gradient(
      35deg,
      color-mix(in srgb, var(--port-color) 80%, var(--crust)),
      color-mix(in srgb, var(--port-color) 80%, var(--text))
    );

    position: relative;
    display: grid; gap: 1.5em 1em;
    grid-template: auto / min-content 1fr;
    grid-template-areas: "icon title"
                         "maintainers maintainers";
    padding: 1.5em;
    border-radius: 6px;
    background-color: var(--mantle);
    box-shadow: 0 6px 12px 0 color-mix(in srgb, var(--crust) 30%, transparent);
    color: var(--subtext0);
    overflow: clip;


    &::after {
      position: absolute;
      inset: 0; top: 100%;
      height: var(--hover-x-transition);
      background-color: var(--port-color);
      background-image: var(--port-color-gradient);
      content: '';
    }


    &, &::after, :global(*) { transition: all .5s ease-in-out; }


    &:hover,
    &:focus,
    &:active {
      background-color: var(--crust);

      &, &::after, :global(> *) { transform: translateY(calc(var(--hover-x-transition) * -1)); }
    }


    .port-icon {
      grid-area: icon;
      display: grid; place-items: center;
      width: 48px; aspect-ratio: 1/1;
      margin: 0;
      border-radius: 50%;
      background-color: var(--port-color);
      background-image: var(--port-color-gradient);
    }


    .port-name {
      grid-area: title;
      color: var(--text);
      text-wrap: pretty;
      overflow-wrap: break-word;
    }


    :global(> *:last-child) {
      grid-area: maintainers;
    }

  }
</style>
