import React, { useRef } from 'react'
import { styled } from 'inlines'
import { rgbToXY, xyToRgb } from './utils'

const Absolute = styled('div', {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
})

const GradientX = styled(Absolute, {
  background:
    'linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))',
})

const GradientY = styled(Absolute, {
  background: 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))',
})

const Pointer = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        transform: `translate3d(-50%,-50%,0)`,
      }}
    >
      <div
        style={{
          border: '2px solid white',
          color: 'rgba(0,0,0,0.4)',
          boxShadow: '0px 0px 2px currentColor, inset 0px 0px 2px currentColor',
          height: 8,
          width: 8,
          borderRadius: 4,
        }}
      />
    </div>
  )
}

export const RgbPicker = ({ hue, rgb, onChange, style }) => {
  const { x, y } = rgbToXY(rgb, hue)
  const xRef = useRef(x)

  const onDown = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()

    const onMove = ({ clientX, clientY }) => {
      let x = (clientX - left) / width
      let y = (clientY - top) / height

      if (x > 1) x = 1
      if (x < 0) x = 0
      if (y > 1) y = 1
      if (y < 0) y = 0

      const rgb = xyToRgb(x, y, hue)
      xRef.current = x
      onChange(rgb)
    }

    const onUp = (e) => {
      onMove(e)
      removeEventListener('mousemove', onMove)
      removeEventListener('mouseup', onUp)
    }

    addEventListener('mousemove', onMove)
    addEventListener('mouseup', onUp)

    onMove(e)
  }

  return (
    <div
      onMouseDown={onDown}
      style={{
        position: 'relative',
        width: '100%',
        flexGrow: 1,
        background: `rgb(${hue.join(',')})`,
        borderRadius: 4,
        overflow: 'hidden',
        transform: 'translate3d(0,0,0)',
        ...style,
      }}
    >
      <GradientX>
        <GradientY>
          <Pointer x={y === 1 ? xRef.current : x} y={y} />
        </GradientY>
      </GradientX>
    </div>
  )
}
