const COLORGUARD = [
  'default',
  'inverted',
  'neutral',
  'informative',
  'positive',
  'warning',
  'negative',
  'brand',
]

export const isSemanticColor = (color) => {
  return COLORGUARD.includes(color)
}
