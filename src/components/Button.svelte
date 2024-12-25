<script lang="ts">

  import type { Snippet } from "svelte";
  import { phosphorIcon } from "@data/icons";
  import Icon from "@iconify/svelte";


  interface Props {
    children: Snippet;
    style?: 'mauve' | 'peach' | 'blue' | 'green' | 'transparent';
    small?: boolean;
    phIconName?: string;
    disabled?: boolean;
  }

  let { children, style, small, phIconName, disabled }: Props = $props();


  let phIcon = {
    body: "",
    width: 0,
    height: 0
  }

  let phIconSize = 24;

  if (phIconName != null) phIcon = phosphorIcon(phIconName);
  if (small) phIconSize = 16;


</script>



<button {disabled}
  class="
    btn
    {style == null ? 'btn-default' : ''}
    {style == 'mauve' ? 'btn-mauve' : ''}
    {style == 'peach' ? 'btn-peach' : ''}
    {style == 'green' ? 'btn-green' : ''}
    {style == 'blue' ? 'btn-blue' : ''}
    {style == 'transparent' ? 'btn-transparent' : ''}
    {phIconName != null ? 'btn-has-icon' : ''}
    {small ? 'btn-small' : ''}
  "
>
  {#if phIconName != null}
    <Icon
      width={phIconSize}
      height={phIconSize}
      icon={{
        body: phIcon.body,
        width: phIcon.width,
        height: phIcon.height,
      }}
    />
  {/if}
  {@render children()}
</button>



<style lang="scss">

@use "../styles/utils" as *;

  :global(.btn-group) {
    display: flex;
    gap: space(sm);
    flex-wrap: wrap;
  }

  .btn {
    padding: space(sm) space(lg);

    border-radius: 9999px;
    border: none;
    background-color: var(--surface0);

    font-size: 1.6rem;
    font-weight: 500;
    color: var(--text);

    transition: all 350ms ease-in-out;
    cursor: pointer;

    &-small {
      padding: space(xs);
      border-radius: var(--border-radius-normal);
    }

    &-transparent {
      background-color: transparent;
    }

    &-transparent:hover,
    &-transparent:focus {
      background-color: color-mix(in srgb, transparent, var(--text) 10%);
    }

    &-has-icon {
      display: flex;
      align-items: center;
      gap: space(sm);
    }

    &-peach,
    &-mauve,
    &-green,
    &-blue {
      background-size: 150% 100%;
      background-position: top left;
      font-weight: 600;
      color: var(--inverted-text);

      &:hover,
      &:focus {
        background-position: top right;
      }
    }

    &-peach {
      background-color: var(--peach);
      background-image: linear-gradient(120deg, var(--peach), var(--red));
    }

    &-mauve {
      background-color: var(--mauve);
      background-image: linear-gradient(120deg, var(--pink), var(--mauve));
    }

    &-green {
      background-color: var(--green);
      background-image: linear-gradient(120deg, var(--teal), var(--green));
    }

    &-blue {
      background-color: var(--blue);
      background-image: linear-gradient(120deg, var(--blue), var(--sky));
    }
  }

  .btn {
    transition: background-position 350ms ease-in-out;
  }

</style>
