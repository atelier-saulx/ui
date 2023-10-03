import type { RGB } from './types'

export const rgbToXY = (rgb, hue) => {
  const high = hue.findIndex((h) => h === 255)
  const low = hue.findIndex((h) => h === 0)
  const y = 1 - rgb[high] / 255 || 0
  const x = 1 - rgb[low] / rgb.reduce((a, b) => Math.max(a, b), 0) || 0
  return { x, y }
}

export const xyToRgb = (x, y, hue) =>
  hue.map((v) => (v + (255 - v) * (1 - x)) * (1 - y))

export const rgbToHue = (rgb): RGB => {
  const [r, g, b] = rgb

  if (r === g && g === b) {
    return [255, 0, 0]
  }

  let hr = r
  let hg = g
  let hb = b

  if (r >= g && r >= b) {
    hr = 255
  } else if (r <= g && r <= b) {
    hr = 0
  }

  if (g >= r && g >= b) {
    hg = 255
  } else if (g <= r && g <= b) {
    hg = 0
  }

  if (b >= r && b >= g) {
    hb = 255
  } else if (b <= r && b <= g) {
    hb = 0
  }

  return [hr, hg, hb]
}

export const toHex = (n) => Number(n).toString(16).padStart(2, '0')

export const minmax = (min, n, max) => Math.min(max, Math.max(min, n))

export const rgbaToArr = (str) => {
  const [, r, g, b, a] = str.split(/, |,|\(|\)/)
  return [Math.round(r), Math.round(g), Math.round(b), Number(a || 1)]
}
