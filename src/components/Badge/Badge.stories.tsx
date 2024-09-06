import React from 'react'
import { Badge } from './index.js'
import { Tooltip } from '../Tooltip/index.js'

export default {
  title: 'Badge',
  component: Badge,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'inline-grid',
        gap: 24,
        gridTemplateColumns: 'repeat(3, auto)',
      }}
    >
      {['subtle', 'fill'].map((variant) =>
        ['neutral', 'red', 'blue', 'green', 'orange', 'inverted', 'white'].map(
          (color) =>
            [{}, { leadIcon: 'arrow-up' }, { trailIcon: 'arrow-up' }].map(
              (icon) => (
                <Tooltip value={`${color}-${variant}`}>
                  <Badge
                    color={`${color}-${variant}` as any}
                    {...(icon as any)}
                  >
                    Badge
                  </Badge>
                </Tooltip>
              ),
            ),
        ),
      )}
    </div>
  ),
}
