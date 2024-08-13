import React from 'react'
import { radius } from './radius.js'
import { Text } from '../components/Text'
import { colors } from './colors'

export default {
  title: 'Radius',
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
      {Object.keys(radius).map((key) => (
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
              borderRadius: radius[key],
              border: `1px solid ${colors.neutral10}`,
            }}
          />
          <Text variant="subtext-bold">{key}</Text>
        </div>
      ))}
    </div>
  ),
}
