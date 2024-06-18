<script lang="ts">
  import Select from "svelte-select";
  import type { CategoryWithPortCount } from "../../lib/ports.ts";
  import type { HandleCategory } from "../../lib/ports.ts";

  export let category: HandleCategory;
  export let handleCategory;
  export let categories: CategoryWithPortCount[];
  let items = categories.map((c) => ({
    value: c.key,
    label: c.nameWithCount,
  }));
</script>

<Select
  --background="var(--mantle)"
  --font-size="2.2rem"
  --placeholder-color="var(--overlay2)"
  --border-radius="var(--border-radius-normal)"
  --border="none"
  --border-hover="none"
  --border-focused="2px solid var(--blue)"
  --item-hover-bg="var(--surface1)"
  --list-background="var(--mantle)"
  --list-border-radius="var(--border-radius-normal)"
  --clear-icon-color="var(--red)"
  showChevron={true}
  clearable={false}
  placeholder="Select category"
  {items}
  bind:value={category}
  on:change={handleCategory}>
</Select>
