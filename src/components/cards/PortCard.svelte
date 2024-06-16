<script lang="ts">
  import type { ColorName } from "@catppuccin/palette";
  import type { Category } from "../../lib/ports";
  import PillList from "../lists/Pills.svelte";
  import Icon, { type IconifyJSON } from "@iconify/svelte";
  import customIconsJson from "../../lib/icons.json";
  import simpleIconsJson from "@iconify-json/simple-icons/icons.json";
  const customIcons = customIconsJson as IconifyJSON;
  const simpleIcons = simpleIconsJson as IconifyJSON;
  export let title: string[] | string;
  export let link: string;
  export let icon: string | undefined;
  export let categories: Category[];
  export let color: ColorName;

  const cubeFillIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 256 256"><path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,120,47.65,76,128,32l80.35,44Zm8,99.64V133.83l80-43.78v85.76Z"></path>';
  const getIcon = (icon: string | undefined) => {
    // When there's no icon provided
    if (!icon) return cubeFillIcon;
    // When a custom icon is provided
    if (icon.endsWith(".svg")) {
      return customIcons.icons[icon.split(".")[0]].body;
    }
    // When a simple icon exists for the port
    if (icon in simpleIcons.icons) {
      return simpleIcons.icons[icon].body;
    }
    // When a simple icon exists as an alias for the port, the parent must be used to get the body of the SVG.
    if (simpleIcons.aliases && icon in simpleIcons.aliases) {
      return simpleIcons.icons[simpleIcons.aliases[icon].parent].body;
    }
    // If all else fails, return the cube fill icon
    return cubeFillIcon;
  };
</script>

<a href={link} class="port-card">
  <div class="port-header">
    <p class="port-name">{Array.isArray(title) ? title.join(", ") : title}</p>
    <div class="port-icon">
      <Icon
        color="var(--{color})"
        width={24}
        height={24}
        icon={{
          body: getIcon(icon),
          width: 24,
          height: 24,
        }} />
    </div>
  </div>

  <PillList list={categories.map((category) => `${category.name}`)} />
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
