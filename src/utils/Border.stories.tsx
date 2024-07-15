import React from 'react'
import { borderRadius, BORDER_RADII } from './border'
import { Text } from '../components/Text'
import { colors } from './colors'

export default {
  title: 'Bits/BorderRadii',
  component: () => <div />,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
      }}
    >
      {BORDER_RADII.map((b) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              background: colors.neutral20,
              borderRadius: borderRadius(b),
              border: `1px solid ${colors.neutral10}`,
            }}
          />
          <Text variant="subtext-bold">{b as string}</Text>
        </div>
      ))}
    </div>
  ),
}
