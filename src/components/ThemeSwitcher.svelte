<script lang="ts">
  import type { AccentName, FlavorName } from "@catppuccin/palette";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  type Theme = FlavorName | "system";

  const themes: { id: Theme; name: string; emoji: string; accent: AccentName }[] = [
    { id: "latte", name: "Latte", emoji: "🌻", accent: "yellow" },
    { id: "frappe", name: "Frappé", emoji: "🪴", accent: "peach" },
    { id: "macchiato", name: "Macchiato", emoji: "🌺", accent: "pink" },
    { id: "mocha", name: "Mocha", emoji: "🌿", accent: "green" },
    { id: "system", name: "System", emoji: "🖥️", accent: "blue" },
  ];

  const accents: { id: AccentName; name: string }[] = [
    {
      id: "rosewater",
      name: "Rosewater",
    },
    {
      id: "flamingo",
      name: "Flamingo",
    },
    {
      id: "pink",
      name: "Pink",
    },
    {
      id: "mauve",
      name: "Mauve",
    },
    {
      id: "red",
      name: "Red",
    },
    {
      id: "maroon",
      name: "Maroon",
    },
    {
      id: "peach",
      name: "Peach",
    },
    {
      id: "yellow",
      name: "Yellow",
    },
    {
      id: "green",
      name: "Green",
    },
    {
      id: "teal",
      name: "Teal",
    },
    {
      id: "sky",
      name: "Sky",
    },
    {
      id: "sapphire",
      name: "Sapphire",
    },
    {
      id: "blue",
      name: "Blue",
    },
    {
      id: "lavender",
      name: "Lavender",
    },
  ];

  let currentTheme = $state((localStorage.getItem("theme") as Theme | undefined) || "system");

  let loading = $state(true);

  onMount(() => {
    loading = false;
  });

  let popover: HTMLElement;

  function showPopover() {
    if (popover) {
      popover.showPopover();
    }
  }

  function hidePopover() {
    if (popover) {
      popover.hidePopover();
    }
  }

  function setTheme(ev: Event) {
    const selectedTheme = (ev.target as HTMLSelectElement).value as Theme;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    currentTheme = selectedTheme;
  }
</script>

<button class="btn btn-has-icon" onclick={showPopover}>
  <div>🎨</div>
  Set theme
</button>

<div bind:this={popover} class="theme-switcher-container" popover="manual">
  <fieldset class="theme-switcher" aria-label="Theme selector" onchange={setTheme}>
    {#each themes as option}
      <label for={option.id} aria-selected={currentTheme === option.id} style:--accent-color="var(--{option.accent})">
        <input
          type="radio"
          value={option.id}
          name="theme-selector"
          id={option.id}
          checked={currentTheme === option.id} />
        <div class="icon">{option.emoji}</div>
        {option.name}
      </label>
    {/each}
    <label class="primary-action" for="theme-selector-done">
      <button id="theme-selector-done" aria-labelledby="theme-selector-done-label" onclick={hidePopover}></button>
      <Icon icon="ph:check-bold" width={20} height={20} class="icon" />
      <span id="theme-selector-done-label">Done</span>
    </label>
  </fieldset>
</div>

<style lang="scss">
  @use "../styles/utils";
  .theme-switcher-container {
    @include utils.containerPadding(xs);
    background-color: var(--surface0);
    bottom: var(--space-md);

    border-width: 0;
    border-radius: 32px;

    top: auto;
    overflow: visible;

    max-width: calc(100lvw - var(--space-md));

    --accent-color: var(--mauve);
  }

  .theme-switcher {
    @include utils.flex($gap: var(--space-xs));
    flex-wrap: nowrap;
  }

  fieldset {
    margin-inline: 0;
    padding: 0;
    border: none;
  }

  label {
    @include utils.flex($gap: var(--space-xs));
    flex-wrap: nowrap;
    align-items: center;

    @include utils.containerPadding(xs);
    padding-inline: var(--space-sm);
    justify-content: start;

    border-radius: 8px;
    border: 1px solid color-mix(in oklch, var(--overlay0), var(--accent-color) 20%);

    color: var(--text);

    min-height: 40px;
    position: relative;

    &::after {
      content: "";
      background-color: var(--accent-color);
      position: absolute;
      border-radius: inherit;
      inset: 0;
      opacity: 0;
      z-index: 1;

      transition: opacity 100ms linear;

      will-change: opacity;
    }

    @media (hover: hover) {
      &:hover {
        &::after {
          opacity: 0.18;
        }
      }
    }

    &:active {
      &::after {
        opacity: 0.25;
      }
    }

    &:focus-within {
      outline: 2px solid var(--accent-color);
      outline-offset: 2px;
      &:not([aria-selected="true"])::after {
        opacity: 0.24;
      }
    }

    &[aria-selected="true"] {
      font-weight: 500;
      background-color: var(--accent-color);
      border-color: var(--accent-color);
      color: var(--inverted-text);
      &::after {
        background-color: currentColor;
      }
    }

    &.primary-action {
      border-color: var(--accent-color);
      background-color: color-mix(in oklch, var(--accent-color) 25%, var(--mantle));
    }

    &:first-child {
      padding-inline-start: var(--space-md);
      border-radius: 22px 8px 8px 22px;
    }

    &:last-child {
      padding-inline-end: var(--space-md);
      border-radius: 8px 22px 22px 8px;
    }

    & > button {
      background: none;
      border: none;
      font: inherit;
      color: inherit;
      position: absolute;
      inset-block: 0;
      &:focus {
        outline: none;
      }
    }

    & > .icon {
      width: 20px;
      line-height: 20px;
    }
  }

  input[type="radio"] {
    appearance: none;
    width: 0;
    height: 0;
    margin: 0;
    position: absolute;
  }

  @media (max-width: 700px) {
    label {
      @include utils.containerPadding(xs);
      &:first-child,
      &:last-child {
        border-radius: 8px;
        padding-inline: var(--space-xs);
      }
    }
    .theme-switcher-container {
      border-radius: 16px;
      inset-inline: var(--space-md) auto;
    }
    .theme-switcher {
      flex-direction: column;
    }
    label:not(.primary-action) {
      border-color: transparent;
    }
  }
</style>
