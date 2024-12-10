<script lang="ts">
  import Icon from "@iconify/svelte";
  import { icon } from "@data/icons";

  let { name, width, height }: { name: string; width: number; height: number } = $props();
</script>

<Icon icon={icon(name)} {width} {height} />
