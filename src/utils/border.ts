const BORDER_RADII = [0, 4, 8, 12, 16, 24, 'full'] as const

type BorderRadii = (typeof BORDER_RADII)[number]

function borderRadius(b: BorderRadii) {
  return `var(--border-radii-${b})`
}

export type { BorderRadii }
export { borderRadius, BORDER_RADII }
