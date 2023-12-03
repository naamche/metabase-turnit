import Color from "color";
import type { ColorPalette } from "./types";

export const ACCENT_COUNT = 8;

// NOTE: DO NOT ADD COLORS WITHOUT EXTREMELY GOOD REASON AND DESIGN REVIEW
// NOTE: KEEP SYNCRONIZED WITH COLORS.CSS
export const colors = {
  /* CHANGED */
  brand: "#0B487B",
  /* CHANGED */
  summarize: "#F7941D",
  /* CHANGED */
  filter: "#F7941D",
  /* CHANGED */
  accent0: "#0B487B",
  /* CHANGED */
  accent1: "#F7941D",
  accent2: "#A989C5",
  accent3: "#EF8C8C",
  accent4: "#FFC553",
  /* CHANGED */
  accent5: "#F7941D",
  accent6: "#4872A9",
  /* CHANGED */
  accent7: "#F7941D",
  /* CHANGED */
  "admin-navbar": "#F7941D",
  white: "#FFFFFF",
  black: "#2E353B",
  /* CHANGED */
  success: "#2E7D32",
  danger: "#F44336",
  error: "#F44336",
  warning: "#F0A600",
  /* CHANGED */
  "text-dark": "rgba(0, 0, 0, 0.87)",
  /* CHANGED */
  "text-medium": "rgba(0, 0, 0, 0.7)",
  /* CHANGED */
  "text-light": "rgba(0, 0, 0, 0.6)",
  "text-white": "#FFFFFF",
  "bg-black": "#2E353B",
  "bg-dark": "#93A1AB",
  /* CHANGED */
  "bg-medium": "#f0f0f0",
  /* CHANGED */
  "bg-light": "#f5f5f5",
  "bg-white": "#FFFFFF",
  "bg-yellow": "#FFFCF2",
  "bg-night": "#42484E",
  /* CHANGED */
  "bg-error": "#F4433655",
  /* CHANGED */
  shadow: "rgba(0, 0, 0, 0.13)",
  /* CHANGED */
  border: "rgba(0, 0, 0, 0.12)",

  /* Saturated colors for the SQL editor. Shouldn't be used elsewhere since they're not white-labelable. */
  "saturated-blue": "#2D86D4",
  "saturated-green": "#70A63A",
  "saturated-purple": "#885AB1",
  "saturated-red": "#F44336",
  "saturated-yellow": "#F0A600",
};
/* eslint-enable no-color-literals */

export const originalColors = { ...colors };

const aliases: Record<string, (palette: ColorPalette) => string> = {
  dashboard: palette => color("brand", palette),
  nav: palette => color("bg-white", palette),
  content: palette => color("bg-light", palette),
  database: palette => color("accent2", palette),
  pulse: palette => color("accent4", palette),

  "brand-light": palette => lighten(color("brand", palette), 0.532),
  "brand-lighter": palette => lighten(color("brand", palette), 0.598), // #EEF6FC for brand
  focus: palette => getFocusColor("brand", palette),

  "accent0-light": palette => tint(color(`accent0`, palette)),
  "accent1-light": palette => tint(color(`accent1`, palette)),
  "accent2-light": palette => tint(color(`accent2`, palette)),
  "accent3-light": palette => tint(color(`accent3`, palette)),
  "accent4-light": palette => tint(color(`accent4`, palette)),
  "accent5-light": palette => tint(color(`accent5`, palette)),
  "accent6-light": palette => tint(color(`accent6`, palette)),
  "accent7-light": palette => tint(color(`accent7`, palette)),

  "accent0-dark": palette => shade(color(`accent0`, palette)),
  "accent1-dark": palette => shade(color(`accent1`, palette)),
  "accent2-dark": palette => shade(color(`accent2`, palette)),
  "accent3-dark": palette => shade(color(`accent3`, palette)),
  "accent4-dark": palette => shade(color(`accent4`, palette)),
  "accent5-dark": palette => shade(color(`accent5`, palette)),
  "accent6-dark": palette => shade(color(`accent6`, palette)),
  "accent7-dark": palette => shade(color(`accent7`, palette)),
};

export function color(
  colorName: keyof ColorPalette,
  palette?: ColorPalette,
): string;
export function color(color: string, palette?: ColorPalette): string;
export function color(color: any, palette: ColorPalette = colors) {
  const fullPalette = {
    ...colors,
    ...palette,
  };

  if (color in fullPalette) {
    return fullPalette[color as keyof ColorPalette];
  }

  if (color in aliases) {
    return aliases[color](palette);
  }

  return color;
}

export const alpha = (c: string, a: number) => {
  return Color(color(c)).alpha(a).string();
};

export const lighten = (c: string, f: number = 0.5) => {
  return Color(color(c)).lighten(f).string();
};

export const darken = (c: string, f: number = 0.25) => {
  return Color(color(c)).darken(f).string();
};

export const tint = (c: string, f: number = 0.125) => {
  const value = Color(color(c));
  return value.lightness(value.lightness() + f * 100).hex();
};

export const shade = (c: string, f: number = 0.125) => {
  const value = Color(color(c));
  return value.lightness(value.lightness() - f * 100).hex();
};

export const hueRotate = (c: string) => {
  return Color(color(c)).hue() - Color(color(c, originalColors)).hue();
};

export const isLight = (c: string) => {
  return Color(color(c)).isLight();
};

export const isDark = (c: string) => {
  return Color(color(c)).isDark();
};

export const getFocusColor = (
  colorName: string,
  palette: ColorPalette = colors,
) => lighten(color(colorName, palette), 0.465);

// We intentionally want to return white text color more frequently
// https://www.notion.so/Maz-notes-on-viz-settings-67aed0e4ddcc4d4a83028992c4301820?d=513f4f7fa9c143cb874c7e4525dfb1e9#277d6b3eeb464eac86088abd144fde9e
const whiteTextColorPriorityFactor = 3;

export const getTextColorForBackground = (backgroundColor: string) => {
  const whiteTextContrast =
    Color(color(backgroundColor)).contrast(Color(color("white"))) *
    whiteTextColorPriorityFactor;
  const darkTextContrast = Color(color(backgroundColor)).contrast(
    Color(color("text-dark")),
  );

  return whiteTextContrast > darkTextContrast
    ? color("white")
    : color("text-dark");
};
