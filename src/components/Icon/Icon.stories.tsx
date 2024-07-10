import React from 'react'
import { ICONS, Icon } from './index.js'
import { Text } from '../Text/index.js'
import { borderRadius } from '../../utils/border.js'
import { color } from '../../utils/colors.js'

export default {
  title: 'Bits/Icon',
  component: Icon,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridAutoRows: '1fr',
        gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
      }}
    >
      {[...ICONS]
        .sort((a, b) => a.localeCompare(b))
        .map((variant) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              padding: 16,
              borderRadius: borderRadius(8),
              background: color('neutral', 10),
              cursor: 'pointer',
            }}
            onClick={() => {
              navigator.clipboard.writeText(`<Icon variant="${variant}" />`)
            }}
          >
            <Icon variant={variant} />
            <Text align="center">{variant}</Text>
          </div>
        ))}
    </div>
  ),
}
