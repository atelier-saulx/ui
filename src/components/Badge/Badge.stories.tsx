import React from 'react'
import { Badge } from './index.js'

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
        ['neutral', 'red', 'indigo', 'green', 'amber', 'inverted', 'white'].map(
          (color) =>
            [{}, { leadIcon: 'arrow-up' }, { trailIcon: 'arrow-up' }].map(
              (icon) => (
                <Badge color={`${color}-${variant}` as any} {...(icon as any)}>
                  Badge
                </Badge>
              ),
            ),
        ),
      )}
    </div>
  ),
}
