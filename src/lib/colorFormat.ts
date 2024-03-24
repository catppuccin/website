import type { ColorFormat } from "@catppuccin/palette";

export function toRgb(rgb: ColorFormat["rgb"]) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function toHsl(hsl: ColorFormat["hsl"]) {
  return `hsl(${Math.floor(hsl.h)}, ${Math.floor(hsl.s * 100)}, ${Math.floor(hsl.l * 100)})`;
}
