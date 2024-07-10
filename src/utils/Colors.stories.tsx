import React from 'react'
import {
  COLORS,
  COLOR_ALPHAS,
  COLOR_SWATCHES,
  COLOR_SWATCH_ALPHAS,
  color,
  colorSwatch,
} from './colors'
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
        gridTemplateColumns: `repeat(${COLOR_ALPHAS.length}, 1fr)`,
      }}
    >
      {COLORS.map((c) =>
        [...COLOR_ALPHAS]
          .sort((a, b) => b - a)
          .map((alpha) => (
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  height: 64,
                  background: color(c, alpha),
                  borderRadius: borderRadius(8),
                  border: `1px solid ${color('neutral', 10)}`,
                  marginBottom: 16,
                }}
              />
              <Text variant="subtext-bold">{`${c.charAt(0).toUpperCase() + c.slice(1)} ${alpha}`}</Text>
            </div>
          )),
      )}
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
        gridTemplateColumns: `repeat(${COLOR_SWATCH_ALPHAS.length}, 1fr)`,
      }}
    >
      {COLOR_SWATCHES.map((swatch) =>
        [...COLOR_SWATCH_ALPHAS]
          .sort((a, b) => b - a)
          .map((alpha) => (
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  height: 64,
                  background: colorSwatch(swatch, alpha),
                  borderRadius: borderRadius(8),
                  border: `1px solid ${color('neutral', 10)}`,
                  marginBottom: 16,
                }}
              />
              <Text variant="subtext-bold">{`${swatch.charAt(0).toUpperCase() + swatch.slice(1)} ${alpha}`}</Text>
            </div>
          )),
      )}
    </div>
  ),
}
