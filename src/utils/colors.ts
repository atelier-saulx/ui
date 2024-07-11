const COLOR_SWATCHES = [
  'white-5',
  'white-10',
  'white-20',
  'white-40',
  'white-60',
  'white-80',
  'white-90',
  'white-95',
  'white-100',
  'black-5',
  'black-10',
  'black-20',
  'black-40',
  'black-60',
  'black-80',
  'black-90',
  'black-95',
  'black-100',
  'red-5',
  'red-10',
  'red-20',
  'red-40',
  'red-60',
  'red-80',
  'red-90',
  'red-95',
  'red-100',
  'green-5',
  'green-10',
  'green-20',
  'green-40',
  'green-60',
  'green-80',
  'green-90',
  'green-95',
  'green-100',
  'indigo-5',
  'indigo-10',
  'indigo-20',
  'indigo-40',
  'indigo-60',
  'indigo-80',
  'indigo-90',
  'indigo-95',
  'indigo-100',
  'amber-5',
  'amber-10',
  'amber-20',
  'amber-40',
  'amber-60',
  'amber-80',
  'amber-90',
  'amber-95',
  'amber-100',
] as const

const COLORS = [
  'neutral-5',
  'neutral-10-background',
  'neutral-10-adjusted',
  'neutral-10',
  'neutral-20',
  'neutral-20-adjusted',
  'neutral-60',
  'neutral-80',
  'neutral-100',
  'neutral-inverted-5',
  'neutral-inverted-10',
  'neutral-inverted-20',
  'neutral-inverted-60',
  'neutral-inverted-80',
  'neutral-inverted-100',
  'highlight-5',
  'highlight-10',
  'highlight-20',
  'highlight-60',
  'highlight-80',
  'highlight-100',
  'alert-5',
  'alert-10',
  'alert-20',
  'alert-60',
  'alert-80',
  'alert-100',
  'destructive-5',
  'destructive-10',
  'destructive-20',
  'destructive-60',
  'destructive-80',
  'destructive-100',
] as const

type ColorSwatch = (typeof COLOR_SWATCHES)[number]
type Color = (typeof COLORS)[number]

function color(c: Color | ColorSwatch) {
  return `var(--color-${c})`
}

export { color, COLORS, COLOR_SWATCHES }
export type { Color, ColorSwatch }
