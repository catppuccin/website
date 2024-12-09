<script lang="ts">
  import Icon from "@iconify/svelte";
  import { customIcon } from "@data/icons";

  let { name, width, height }: { name: string; width: number; height: number } = $props();
</script>

<Icon icon={customIcon(name)} {width} {height} />
