<script lang="ts">
  import type { AccentName, FlavorName } from "@catppuccin/palette";
  type Theme = FlavorName | "system";

  const themes: { id: Theme; name: string; emoji: string; accent: AccentName }[] = [
    { id: "system", name: "System", emoji: "🖥️", accent: "blue" },
    { id: "latte", name: "Latte", emoji: "🌻", accent: "yellow" },
    { id: "frappe", name: "Frappé", emoji: "🪴", accent: "peach" },
    { id: "macchiato", name: "Macchiato", emoji: "🌺", accent: "pink" },
    { id: "mocha", name: "Mocha", emoji: "🌿", accent: "green" },
  ];

  let currentTheme = $state((localStorage.getItem("theme") as Theme | undefined) ?? "system");

  function setTheme(ev: Event) {
    const selectedTheme = (ev.target as HTMLSelectElement).value as Theme;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    currentTheme = selectedTheme;
  }
</script>

<label for="themeSelector">
  Theme
  <select name="Change theme" id="themeSelector" value={currentTheme} onchange={setTheme}>
    {#each themes as option}
      <option value={option.id}>
        {option.emoji}
        {option.name}
      </option>
    {/each}
  </select>
</label>

<style lang="scss">
  @use "../styles/utils";

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-xs);
    height: 40px;
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
    width: 128px;
    height: 32px;

    &:focus,
    &:focus-visible {
      outline: 3px solid var(--mauve);
      outline-offset: -3px;
    }
  }
</style>
