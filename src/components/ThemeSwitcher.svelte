<script lang="ts">
  import type { AccentName, FlavorName } from "@catppuccin/palette";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  type Theme = FlavorName | "system";

  const themes: { id: Theme; name: string; emoji: string; accent: AccentName }[] = [
    { id: "system", name: "System", emoji: "🖥️", accent: "blue" },
    { id: "latte", name: "Latte", emoji: "🌻", accent: "yellow" },
    { id: "frappe", name: "Frappé", emoji: "🪴", accent: "peach" },
    { id: "macchiato", name: "Macchiato", emoji: "🌺", accent: "pink" },
    { id: "mocha", name: "Mocha", emoji: "🌿", accent: "green" },
  ];

  let currentTheme = $state(
    import.meta.env.SSR ?
    'system' :
    (localStorage.getItem("theme") as Theme | undefined) || "system"
  );

  let loading = $state(true);

  onMount(() => {
    loading = false;
  });

  function setTheme(ev: Event) {
    const selectedTheme = (ev.target as HTMLSelectElement).value as Theme;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    currentTheme = selectedTheme;
  }
</script>

<noscript>
  Enable JavaScript to change the theme.
</noscript>
<label for="themeSelector">
  Theme
  <select name="Change theme" id="themeSelector" value={currentTheme} disabled={loading} onchange={setTheme}>
    {#each themes as option}
      <option value={option.id}>
        {option.emoji} {option.name}
      </option>
    {/each}
  </select>
</label>

<style lang="scss">
  @use '../styles/utils';
  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-xs);
  }
  select {
    @include utils.containerPadding(xxs);
    border-radius: var(--border-radius-normal);
    border-color: var(--overlay0);
    background-color: var(--base);
    color: var(--text);
    font: inherit;
    font-size: 90%;
    position: relative;
    &:focus, &:focus-visible {
      outline: 3px solid var(--mauve);
      outline-offset: -3px;
    }
  }
</style>
