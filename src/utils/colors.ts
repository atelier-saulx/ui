const COLOR_SWATCHES = [
  'white',
  'black',
  'red',
  'green',
  'indigo',
  'amber',
] as const
const COLORS = ['neutral', 'neutral-inverted', 'accent', 'destructive'] as const

type ColorSwatch = (typeof COLOR_SWATCHES)[number]
type ColorSwatchAlpha = 5 | 10 | 20 | 40 | 60 | 80 | 90 | 95 | 100

type Color = (typeof COLORS)[number]
type ColorAlpha = 5 | 10 | 20 | 60 | 80 | 100

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

export { color, colorSwatch, COLORS, COLOR_SWATCHES }
export type { Color, ColorAlpha, ColorSwatch, ColorSwatchAlpha }
