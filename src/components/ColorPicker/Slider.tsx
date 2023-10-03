import React from 'react'

export const Slider = ({ max, value, step = 1, onChange, style }) => {
  const x = (value / max) * 100
  return (
    <div
      style={{
        height: 20,
        position: 'relative',
        borderRadius: 4,
        ...style,
      }}
    >
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
        }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          padding: 2,
          top: 0,
          left: `${x}%`,
          bottom: 0,
          transform: `translate3d(-${x}%,0,0)`,
        }}
      >
        <div
          style={{
            width: 8,
            height: '100%',
            backgroundColor: 'white',
            boxShadow: '0px 0px 1px rgba(0,0,0,0.4)',
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  )
}
