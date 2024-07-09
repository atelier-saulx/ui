type ColorSwatch = 'white' | 'black' | 'red' | 'green' | 'indigo' | 'amber'
type ColorSwatchAlpha = 5 | 10 | 20 | 40 | 60 | 80 | 90 | 95 | 100

type Color = 'neutral' | 'neutral-inverted' | 'accent' | 'destructive'
type ColorAlpha = 5 | 10 | 20 | 60 | 80 | 100

function color(c: Color | ColorSwatch, alpha?: ColorAlpha | ColorSwatchAlpha) {
  if (typeof alpha === 'undefined') {
    return `var(--color-${c}-100)`
  }

  return `var(--color-${c}-${alpha})`
}

export { color }
export type { Color, ColorAlpha, ColorSwatch, ColorSwatchAlpha }
