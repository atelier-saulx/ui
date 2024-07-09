type BorderRadius =
  | 'sharp'
  | 'muted'
  | 'rounded'
  | 'blunt'
  | 'smooth'
  | 'curved'
  | 'circular'

function borderRadius(b: BorderRadius) {
  return `var(--border-radii-${b})`
}

export type { BorderRadius }
export { borderRadius }
