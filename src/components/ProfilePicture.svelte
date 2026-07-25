<script lang="ts">
  import maintainersWithoutAvatars from "@data/maintainers/maintainersWithoutAvatars.json";
  import NoMaintainerIcon from "@data/icons/lucide-user-round-x.svg?raw";

  interface Props {
    username: string;
    size: number;
    wxh: number;
    tooltipOverride?: string;
  }

  let { username, size, wxh, tooltipOverride }: Props = $props();

  const isPlaceholder = $derived.by( () => ( maintainersWithoutAvatars as string[] ).includes( username ) );
  const githubUrl = $derived.by( () => `https://github.com/${username}` );
  const tooltipText = $derived.by( () => tooltipOverride ?? ( isPlaceholder ? "This user's GitHub profile was not found." : username ) );
  let isHovering = $state( false );

  function handleMouseEnter() {
    isHovering = true;
  }

  function handleMouseLeave() {
    isHovering = false;
  }
</script>

<a
  href={githubUrl}
  class="avatar-wrapper"
  data-tooltip={tooltipText}
  aria-label={username}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  class:hovering={isHovering}
  style="--icon-size: {wxh}px">
  {#if isPlaceholder}
    <div class="placeholder">
      {@html NoMaintainerIcon}
    </div>
  {:else}
    <img
      alt="{username}'s Avatar"
      src="/maintainers/{size}x{size}/{username}.webp"
      width={wxh}
      height={wxh}
      loading="lazy" />
  {/if}
</a>

<style lang="scss">
  .avatar-wrapper {
    position: relative;
    display: inline-flex;
    padding: 8px;
    margin: -8px;
    border-radius: 50%;
    text-decoration: none;
  }

  .avatar-wrapper:hover::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 125%;
    left: calc(50% + var(--icon-size) / 6);
    transform: translateX(-50%) translateY(-6px);
    background-color: var(--surface0);
    backdrop-filter: blur(5px);
    color: var(--text);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 1000;
    animation: tooltip-fade 0.2s ease-out forwards;

    will-change: opacity, transform;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    contain: layout style paint;
  }

  .avatar-wrapper:hover::after {
    content: "";
    position: absolute;
    bottom: calc(125% - 12px);
    left: calc(50% + var(--icon-size) / 6);
    transform: translateX(-50%) translateY(-6px);
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-top-color: var(--surface0);
    pointer-events: none;
    z-index: 1001;
    animation: tooltip-fade 0.2s ease-out forwards;

    will-change: opacity, transform;
    backface-visibility: hidden;
  }

  @keyframes tooltip-fade {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  img {
    display: inline-flex;
    border: 2px solid var(--mantle);
    background-color: var(--base);
    border-radius: 50%;
    cursor: pointer;

    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    will-change: transform, box-shadow;
    contain: layout style;
  }

  .avatar-wrapper.hovering img {
    transform: scale(1.15) translateY(-6px);
    box-shadow: 0 12px 20px rgba(var(--crust), 0.25);
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease-out;
  }

  .avatar-wrapper:not(.hovering) img {
    transition: transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .avatar-wrapper:has(.placeholder):hover::before {
    bottom: 105%;
    left: 50%;
  }

  .avatar-wrapper:has(.placeholder):hover::after {
    bottom: calc(105% - 12px);
    left: 50%;
  }

  .placeholder {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--icon-size);
    height: var(--icon-size);

    backface-visibility: hidden;
    will-change: color;
  }

  .placeholder :global(svg) {
    width: 100%;
    height: 100%;
    color: var(--overlay0);
    stroke: currentColor;

    backface-visibility: hidden;
  }

  .avatar-wrapper:hover .placeholder :global(svg) {
    color: var(--overlay1);
  }
</style>
