import React from 'react'
import { COLORS, COLOR_SWATCHES, color } from './colors'
import { borderRadius } from './border'
import { Text } from '../components/Text'

export default {
  title: 'Bits/Color',
  component: () => <div />,
}

export const Semantics = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridAutoRows: '1fr',
        gridTemplateColumns: `repeat(9, 1fr)`,
      }}
    >
      {[...COLORS].map((c) => (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              height: 64,
              background: color(c),
              borderRadius: borderRadius(8),
              border: `1px solid ${color('neutral-10')}`,
              marginBottom: 16,
            }}
          />
          <Text variant="subtext-bold">{c}</Text>
        </div>
      ))}
    </div>
  ),
}

export const Swatches = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridAutoRows: '1fr',
        gridTemplateColumns: `repeat(9, 1fr)`,
      }}
    >
      {[...COLOR_SWATCHES].map((c) => (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              height: 64,
              background: color(c),
              borderRadius: borderRadius(8),
              border: `1px solid ${color('neutral-10')}`,
              marginBottom: 16,
            }}
          />
          <Text variant="subtext-bold">{c}</Text>
        </div>
      ))}
    </div>
  ),
}
