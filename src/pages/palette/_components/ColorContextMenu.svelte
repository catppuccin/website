<script module lang="ts">
  import { writable } from "svelte/store";
  export const openMenuId = writable<string | null>(null);

  let ignoreNextClick = false;

  if (typeof window !== "undefined") {
    window.addEventListener("click", (e: MouseEvent) => {
      const menu = document.querySelector(".context-menu");

      if (ignoreNextClick) {
        ignoreNextClick = false;
        return;
      }

      if (!menu?.contains(e.target as Node)) {
        openMenuId.set(null);
      }
    });
  }
</script>

<script lang="ts">
  import { type Snippet } from "svelte";
  import CopyToClipboardIcon from "./CopyToClipboardButton.svelte";

  let { name, hex, rgb, hsl, oklch, children, flavorName }: {
    name: string;
    hex: string;
    rgb: string;
    hsl: string;
    oklch: string;
    children: Snippet;
    flavorName?: string;
  } = $props();

  const id = hex;
  let visible = $derived($openMenuId === id);
  let x = $state(0);
  let y = $state(0);

  const LONG_PRESS_MS = 250;
  let pressTimer: ReturnType<typeof setTimeout>;
  let longPress = false;

  const onContextMenu = (e: PointerEvent) => {
    e.stopPropagation();

    const menuWidth = 240;
    const cx = e.clientX + window.scrollX;

    x = e.clientX + menuWidth > window.innerWidth ? Math.max(0, cx - menuWidth) : cx;

    if (window.innerWidth > 600) {
      const cy = e.clientY + window.scrollY;
      y = e.clientY + 160 > window.innerHeight ? cy - 160 : cy;
    }

    openMenuId.set(id);
    ignoreNextClick = true;
  };

  const handlePointerDown = (e: PointerEvent) => {
    longPress = false;

    pressTimer = setTimeout(() => {
      longPress = true;
      onContextMenu(e);
    }, LONG_PRESS_MS);
  };

  let toastState = $state<"hidden" | "success" | "failed">("hidden");
  let toastTimer: ReturnType<typeof setTimeout>;

  const showToast = (success: boolean) => {
    toastState = success ? "success" : "failed";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastState = "hidden"), 2000);
  };

  const handlePointerUp = async () => {
    clearTimeout(pressTimer);
    if (!longPress) {
      try {
        await navigator.clipboard.writeText(hex);
        showToast(true);
      } catch {
        showToast(false);
      }
    }
  };

  const handlePointerLeave = () => {
    clearTimeout(pressTimer);
  };

  let isMobile = false;

  if (typeof window !== 'undefined') {
    const checkMobile = () => {
      isMobile = window.innerWidth <= 600;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
  }
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && openMenuId.set(null)} />

<div
  class="wrapper"
  onpointerdown={handlePointerDown}
  onpointerup={handlePointerUp}
  onpointerleave={handlePointerLeave}
>
  {@render children()}
</div>

{#if toastState !== "hidden"}
  <div class="toast {toastState}">
    {toastState === "success" ? "Hex copied!" : "Failed to copy"}
  </div>
{/if}

{#if visible}
  <div
    class="context-menu"
    style={`left: ${isMobile ? '50%' : x + 'px'}; ${isMobile ? '' : `top: ${y}px`}`}
    onclick={(e) => e.stopPropagation()}
  >
    <div class="menu-header">
      <div class="menu-title">{flavorName ? `${flavorName} ${name}` : name}</div>
      <button class="close-btn" onclick={() => openMenuId.set(null)}>✕</button>
    </div>
    <div class="menu-items">
      {#each [["HEX", hex], ["RGB", rgb], ["HSL", hsl], ["OKLCH", oklch]] as [label, value]}
        <CopyToClipboardIcon value={value}>
          <span class="menu-label">{label}:</span>
          <span class="menu-value">{value}</span>
        </CopyToClipboardIcon>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .wrapper {
    display: contents;
  }

  .context-menu {
    position: absolute;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    max-width: calc(100vw - 1rem);
    min-width: 200px;
    padding: 0.5rem;
    border-radius: var(--border-radius-normal);
    background: var(--base);
    border: 1px solid var(--surface0);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    text-align: left;
  }

  .menu-title {
    text-transform: capitalize;
    font-weight: bold;
    padding: 0.25rem 0.5rem 0.5rem;
    color: var(--text);
    font-family: monospace;
  }

  .menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--surface0);
    margin-bottom: 0.25rem;
  }

  .close-btn {
    background: var(--mantle);
    border: none;
    border-radius: var(--border-radius-normal);
    color: var(--subtext0);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 2rem;
    line-height: 1;

    &:hover {
      color: var(--text);
      background: var(--surface0);
    }
  }

  .menu-items {
    display: flex;
    flex-direction: column;
  }

  .menu-items :global(button) {
    background: var(--base);
    text-align: left;

    &:hover {
      background: var(--surface0);
    }
  }

  .menu-label {
    color: var(--subtext0);
    min-width: 3.5rem;
    display: inline-block;
  }

  .menu-items :global(button.success .menu-label) {
    color: var(--green);
  }

  .menu-items :global(button.failed .menu-label) {
    color: var(--red);
  }

  .menu-items :global(button.success) {
    background: var(--surface0);
  }

  .menu-items :global(button.failed) {
    background: var(--surface0);
  }

  .menu-value {
    color: inherit;
  }

  .toast {
    position: fixed;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2000;
    padding: 0.75rem 2rem;
    border-radius: var(--border-radius-normal);
    background: var(--mantle);
    font-family: monospace;
    font-size: 2rem;
    pointer-events: none;
    animation: toast-in 0.2s ease forwards, toast-out 0.2s ease 1.8s forwards;

    &.success {
      color: var(--green);
      border: 1px solid var(--green);
    }

    &.failed {
      color: var(--red);
      border: 1px solid var(--red);
    }
  }

  @media (max-width: 600px) {
    .wrapper {
      display: block;
    }

    .context-menu {
      position: fixed !important;
      bottom: 2rem !important;
      left: 2rem !important;
      right: 2rem !important;
      transform: none !important;
      width: auto !important;
      max-width: none;
      border-radius: var(--border-radius-normal) var(--border-radius-normal) 0 0;
      box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.4);
    }
    .menu-title {
      font-size: 1.75rem;
    }

    .menu-items :global(button) {
      font-size: 1.5rem;
    }

    .close-btn {
      font-size: 2.5rem;
    }
  }

  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-0.5rem);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  @keyframes toast-out {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(0.5rem);
    }
  }
</style>
