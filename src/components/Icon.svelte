<script lang="ts">
  import Icon from "@iconify/svelte";
  import { icon } from "@data/icons";

  interface Props {
    name: string;
    width: number;
    height: number;
  }

  let { name, width, height }: Props = $props();
</script>

<Icon icon={icon(name)} {width} {height} />
