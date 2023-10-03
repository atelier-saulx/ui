import React, { CSSProperties } from 'react'
import { Slider } from './Slider'
import type { RGB } from './types'

export const HueSlider = ({
  hue,
  onChange,
  style,
}: {
  hue: RGB
  onChange: (hue: RGB) => void
  style?: CSSProperties
}) => {
  const max = 255 * 6 - 1
  const [r, g, b] = hue
  let value = 0

  if (r === 255) {
    value = b === 0 ? g : 255 * 5 + (255 - b) + g
  } else if (g === 255) {
    value = 255 + (255 - r) + b
  } else if (b === 255) {
    value = 255 * 3 + (255 - g) + r
  }

  return (
    <Slider
      value={value}
      max={max}
      onChange={(n) => {
        let hue
        if (n === max) {
          hue = [255, 0, 1]
        } else if (n < 255) {
          hue = [255, n, 0]
        } else if (n < 255 * 2) {
          hue = [255 - (n % 255), 255, 0]
        } else if (n < 255 * 3) {
          hue = [0, 255, n % 255]
        } else if (n < 255 * 4) {
          hue = [0, 255 - (n % 255), 255]
        } else if (n < 255 * 5) {
          hue = [n % 255, 0, 255]
        } else {
          hue = [255, 0, 255 - (n % 255)]
        }
        onChange(hue)
      }}
      style={{
        background:
          'linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)',
        ...style,
      }}
    />
  )
}
