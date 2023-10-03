import React, { CSSProperties } from 'react'
import { Slider } from './Slider'
import type { RGB } from './types'
import { transparent } from './bg'

export const AlphaSlider = ({
  rgb,
  alpha,
  onChange,
  style,
}: {
  rgb: RGB
  alpha: number
  onChange: (alpha: number) => void
  style?: CSSProperties
}) => {
  const rgbString = rgb.join(',')
  return (
    <div
      style={{
        background: transparent,
        backgroundPosition: '0 -10px',
      }}
    >
      <Slider
        value={alpha}
        max={1}
        step={0.01}
        onChange={onChange}
        style={{
          background: `linear-gradient(to right, rgba(${rgbString}, 0) 0%, rgb(${rgbString}) 100%)`,
          ...style,
        }}
      />
    </div>
  )
}
