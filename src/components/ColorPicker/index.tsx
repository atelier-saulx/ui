import React, { FC, useEffect, useRef, useState } from 'react'
import { AlphaSlider } from './AlphaSlider'
import { HueSlider } from './HueSlider'
import { Inputs } from './Inputs'
import { RgbPicker } from './RgbPicker'
import { Swatch } from './Swatch'
import { rgbToXY, xyToRgb, rgbToHue, rgbaToArr } from './utils'
import type { RGB } from './types'
import { Style, styled } from 'inlines'
import { Column } from '../../components'
import { color } from '../../varsUtilities'

type ColorPickerProps = {
  value?: string
  style?: Style
  onChange?: (color: string) => void
}

export const ColorPicker: FC<ColorPickerProps> = ({
  value = 'rgba(255,0,0,1)',
  style,
  onChange,
}) => {
  const valueRef = useRef(value)
  const rgba = rgbaToArr(value)
  const [rgb, setRgb] = useState(rgba.slice(0, 3) as RGB)
  const [hue, setHue] = useState(rgbToHue(rgb))
  const [alpha, setAlpha] = useState(rgba[3])
  const colorValue = `rgba(${rgb.map(Math.round).join(',')},${alpha})`

  useEffect(() => {
    if (value !== valueRef.current) {
      const rgb = rgba.slice(0, 3) as RGB
      setRgb(rgb)
      setHue(rgbToHue(rgb))
      setAlpha(rgba[3])
    }
  }, [value])

  useEffect(() => {
    if (onChange && colorValue !== value) {
      valueRef.current = colorValue
      onChange(colorValue)
    }
  }, [onChange, colorValue])

  return (
    <Column
      style={{
        border: `1px solid ${color('border', 'default')}`,
        borderRadius: 4,
        padding: 8,
        height: 300,
        minWidth: 250,
        ...style,
      }}
    >
      <RgbPicker
        hue={hue}
        rgb={rgb}
        onChange={setRgb}
        style={{
          marginBottom: 8,
        }}
      />
      <styled.div style={{ display: 'flex', marginBottom: 8 }}>
        <styled.div style={{ flexGrow: 1, marginRight: 8 }}>
          <HueSlider
            hue={hue}
            onChange={(newHue) => {
              const { x, y } = rgbToXY(rgb, hue)
              const newRgb = xyToRgb(x, y, newHue)
              setRgb(newRgb)
              setHue(newHue)
            }}
            style={{
              marginBottom: 8,
            }}
          />
          <AlphaSlider rgb={rgb} alpha={alpha} onChange={setAlpha} />
        </styled.div>
        <Swatch color={colorValue} size={48} />
      </styled.div>
      <Inputs
        rgb={rgb}
        alpha={alpha}
        onRgbChange={(newRgb) => {
          const newHue = rgbToHue(newRgb)
          setRgb(newRgb)
          setHue(newHue)
        }}
        onAlphaChange={setAlpha}
      />
    </Column>
  )
}
