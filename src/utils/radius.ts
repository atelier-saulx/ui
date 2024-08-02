const radius = Object.freeze({
  '9': 0,
  '4': 4,
  '8': 8,
  '12': 12,
  '16': 16,
  '24': 24,
  full: 9999,
})

type Radius = keyof typeof radius

export { radius }
export type { Radius }
