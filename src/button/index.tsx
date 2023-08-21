import React, { FC } from 'react'
import { color as genColor } from '../'
import { ColorActionColors } from '../varsTypes'

export const Button: FC<{
  color?: ColorActionColors
}> = ({ color }) => {
  return (
    <div
      style={{
        color: genColor(
          'content',
          color === 'ghost' ? 'inverted' : 'default',
          'primary'
        ),
        borderRadius: 4,
        padding: 10,
        backgroundColor: genColor('action', color || 'primary', 'normal'),
      }}
    >
      this is a button!
    </div>
  )
}
