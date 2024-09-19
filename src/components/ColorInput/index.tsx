import { MouseEvent, useEffect, useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { shadows } from '../../utils/shadows.js'

type ColorInputProps = {
  value?: string
  onChange: (value: string) => void
}

function ColorInput({ value, onChange }: ColorInputProps) {
  const saturationCanvas = useRef<HTMLCanvasElement>(null)
  const hueCanvas = useRef<HTMLCanvasElement>(null)
  const alphaCanvas = useRef<HTMLCanvasElement>(null)
  const [hue, setHue] = useState<number>(0)
  const [alpha, setAlpha] = useState<number>(100)
  const [mouseDown, setMouseDown] = useState<string>()

  useEffect(() => {
    if (!saturationCanvas.current) return
    const ctx = saturationCanvas.current.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const whiteGradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0)
    whiteGradient.addColorStop(0, 'white')
    whiteGradient.addColorStop(1, 'transparent')
    ctx.fillStyle = whiteGradient
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const blackGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
    blackGradient.addColorStop(0, 'transparent')
    blackGradient.addColorStop(1, 'black')
    ctx.fillStyle = blackGradient
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [hue])

  useEffect(() => {
    if (!hueCanvas.current) return

    const ctx = hueCanvas.current.getContext('2d')

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const horizontal = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0)
    horizontal.addColorStop(0, 'hsl(0, 100%, 50%)')
    horizontal.addColorStop(1 / 6, 'hsl(60, 100%, 50%)')
    horizontal.addColorStop(2 / 6, 'hsl(120, 100%, 50%)')
    horizontal.addColorStop(3 / 6, 'hsl(180, 100%, 50%)')
    horizontal.addColorStop(4 / 6, 'hsl(240, 100%, 50%)')
    horizontal.addColorStop(5 / 6, 'hsl(300, 100%, 50%)')
    horizontal.addColorStop(1, 'hsl(360, 100%, 50%)')
    ctx.fillStyle = horizontal
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [])

  useEffect(() => {
    if (!alphaCanvas.current) return
    const ctx = alphaCanvas.current.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const squareSize = 4
    const numRows = 2
    const numCols = Math.floor(ctx.canvas.width / squareSize)

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = col * squareSize
        const y = row * (ctx.canvas.height / numRows)

        if (row % 2 === col % 2) {
          ctx.fillStyle = getComputedStyle(ctx.canvas).getPropertyValue(
            '--neutral-10',
          )
        } else {
          ctx.fillStyle = 'transparent'
        }

        ctx.fillRect(x, y, squareSize, ctx.canvas.height / numRows)
      }
    }

    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0)
    gradient.addColorStop(0, 'transparent')
    gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [hue])

  function handleMouseMove(e: any) {
    if (mouseDown === 'hue') {
      if (!hueCanvas.current) return
      const rect = hueCanvas.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const hue = (x / hueCanvas.current.width) * 360
      setHue(Math.max(0, Math.min(360, hue)))
    }

    if (mouseDown === 'alpha') {
      if (!alphaCanvas.current) return
      const rect = alphaCanvas.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const alpha = (x / alphaCanvas.current.width) * 100
      setAlpha(Math.max(0, Math.min(100, alpha)))
    }
  }
  function handleMouseUp() {
    setMouseDown(undefined)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDown])

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        width: 280,
        padding: 8,
        gap: 8,
        background: colors.neutralInverted100,
        boxShadow: shadows.popoverLarge,
        borderRadius: radius[16],
        zIndex: 2,
      }}
    >
      <div
        style={{
          background: colors.neutral10Background,
          position: 'absolute',
          inset: 0,
          border: `1px solid ${colors.neutral10}`,
          borderRadius: radius[16],
          zIndex: -1,
        }}
      />
      <canvas
        ref={saturationCanvas}
        width={264}
        height={264}
        style={{ width: 264, height: 264 }}
      />
      <div
        style={{
          position: 'relative',
          width: 220,
          height: 8,
          display: 'flex',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: `1px solid ${colors.neutral20Adjusted}`,
            borderRadius: radius[8],
            pointerEvents: 'none',
          }}
        />
        <canvas
          ref={hueCanvas}
          width={220}
          height={8}
          style={{
            width: 220,
            height: 8,
            borderRadius: radius[8],
          }}
          onMouseDown={() => {
            setMouseDown('hue')
          }}
          onClick={(e) => {
            if (!hueCanvas.current) return
            const rect = hueCanvas.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const hue = (x / hueCanvas.current.width) * 360
            setHue(Math.max(0, Math.min(360, hue)))
          }}
        />
        <div
          style={{
            height: 12,
            width: 12,
            border: `2px solid ${colors.white100}`,
            background: `hsl(${hue}, 100%, 50%)`,
            borderRadius: radius.full,
            position: 'absolute',
            pointerEvents: 'none',
            top: -2,
            left: `clamp(5px, ${(hue / 360) * 100}%, calc(100% - 5px))`,
            transform: `translate(-50%)`,
            boxShadow: shadows.popoverSmall,
          }}
        />
      </div>
      <div
        style={{
          position: 'relative',
          width: 220,
          height: 8,
          display: 'flex',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: `1px solid ${colors.neutral20Adjusted}`,
            borderRadius: radius[8],
            pointerEvents: 'none',
          }}
        />
        <canvas
          ref={alphaCanvas}
          width={220}
          height={8}
          style={{
            width: 220,
            height: 8,
            borderRadius: radius[8],
            imageRendering: 'pixelated',
          }}
          onMouseDown={() => {
            setMouseDown('alpha')
          }}
          onClick={(e) => {
            if (!alphaCanvas.current) return
            const rect = alphaCanvas.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const alpha = (x / alphaCanvas.current.width) * 100
            setAlpha(Math.max(0, Math.min(100, alpha)))
          }}
        />
        <div
          style={{
            height: 12,
            width: 12,
            border: `2px solid ${colors.white100}`,
            borderRadius: radius.full,
            position: 'absolute',
            pointerEvents: 'none',
            top: -2,
            left: `clamp(5px, ${alpha}%, calc(100% - 5px))`,
            transform: `translate(-50%)`,
            boxShadow: shadows.popoverSmall,
          }}
        />
      </div>
      hue: {hue}
      alpha: {alpha}
    </div>
  )
}

export { ColorInput }
export type { ColorInputProps }
