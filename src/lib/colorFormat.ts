import type { ColorFormat } from "@catppuccin/palette";

export function toRgb(rgb: ColorFormat["rgb"]) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function toHsl(hsl: ColorFormat["hsl"]) {
  return `hsl(${Math.round(hsl.h)}deg, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
}
