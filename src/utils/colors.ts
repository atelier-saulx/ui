const COLOR_SWATCHES = [
  'white',
  'black',
  'red',
  'green',
  'indigo',
  'amber',
] as const
const COLOR_SWATCH_ALPHAS = [5, 10, 20, 40, 60, 80, 90, 95, 100] as const
const COLORS = ['neutral', 'neutral-inverted', 'accent', 'destructive'] as const
const COLOR_ALPHAS = [5, 10, 20, 60, 80, 100] as const

type ColorSwatch = (typeof COLOR_SWATCHES)[number]
type ColorSwatchAlpha = (typeof COLOR_SWATCH_ALPHAS)[number]

type Color = (typeof COLORS)[number]
type ColorAlpha = (typeof COLOR_ALPHAS)[number]

function color(c: Color, alpha?: ColorAlpha) {
  if (typeof alpha === 'undefined') {
    return `var(--color-${c}-100)`
  }

  return `var(--color-${c}-${alpha})`
}

function colorSwatch(c: ColorSwatch, alpha?: ColorSwatchAlpha) {
  if (typeof alpha === 'undefined') {
    return `var(--color-${c}-100)`
  }

  return `var(--color-${c}-${alpha})`
}

export {
  color,
  colorSwatch,
  COLORS,
  COLOR_SWATCHES,
  COLOR_ALPHAS,
  COLOR_SWATCH_ALPHAS,
}
export type { Color, ColorAlpha, ColorSwatch, ColorSwatchAlpha }
