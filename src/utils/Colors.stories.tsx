import React from 'react'
import { colors } from './colors'
import { radius } from './radius'
import { Text } from '../components/Text'

export default {
  title: 'Color',
  component: () => <div />,
}

export const Semantics = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 24,
      }}
    >
      {Object.keys(colors).map((key) => (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              height: 64,
              background: colors[key],
              borderRadius: radius[8],
              border: `1px solid ${colors.neutral10}`,
              marginBottom: 16,
            }}
          />
          <Text variant="subtext-bold">{key}</Text>
        </div>
      ))}
    </div>
  ),
}
