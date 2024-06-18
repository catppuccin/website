<script lang="ts">
  import Select from "svelte-select";
  import type { Platform } from "../../lib/ports.ts";

  export let platforms: Platform[];
  let items = platforms.map((p) => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }));

  let value = [];
  let checked: Platform = [];
  let isChecked = {};

  $: computeValue(checked);
  $: computeIsChecked(checked);

  function computeIsChecked() {
    isChecked = {};
    checked.forEach((c) => (isChecked[c] = true));
  }

  function computeValue() {
    value = checked.map((c) => items.find((i) => i.value === c));
  }

  function handleChange(e) {
    if (e.type === "clear" && Array.isArray(e.detail)) checked = [];
    else
      checked.includes(e.detail.value)
        ? (checked = checked.filter((i) => i != e.detail.value))
        : (checked = [...checked, e.detail.value]);
  }
</script>

<Select
  --background="var(--mantle)"
  --font-size="2.1rem"
  --placeholder-color="var(--overlay2)"
  --border-radius="var(--border-radius-normal)"
  --border="none"
  --border-hover="none"
  --border-focused="2px solid var(--blue)"
  --item-hover-bg="var(--surface1)"
  --multi-item-bg="color-mix(in srgb, var(--base), var(--subtext0) 10%)"
  --multi-item-clear-icon-color="var(--maroon)"
  --multi-item-border-radius="var(--border-radius-normal)"
  --multi-item-active-outline="none"
  --multi-item-outline="none"
  --multi-item-gap="var(--space-xs)"
  --multi-item-margin="var(--space-xxs)"
  --list-background="var(--mantle)"
  --list-border-radius="var(--border-radius-normal)"
  --clear-icon-color="var(--red)"
  {items}
  {value}
  placeholder="Select platform (TODO)"
  multiple={true}
  filterSelectedItems={false}
  closeListOnChange={false}
  showChevron={true}
  on:select={handleChange}
  on:clear={handleChange}>
  <div class="item" slot="item" let:item>
    <label for={item.value}>
      <input type="checkbox" id={item.value} bind:checked={isChecked[item.value]} />
      {item.label}
    </label>
  </div>
</Select>
