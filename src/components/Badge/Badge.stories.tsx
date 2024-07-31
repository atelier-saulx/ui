import React from 'react'
import { Badge } from './index.js'

export default {
  title: 'Quarks/Badge',
  component: Badge,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'inline-grid',
        gap: 24,
        gridTemplateColumns: 'auto auto auto',
      }}
    >
      {['subtle', 'fill'].map((variant) =>
        ['neutral', 'red', 'indigo', 'green', 'amber'].map((color) =>
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
