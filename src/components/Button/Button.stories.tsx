import React, { useState } from 'react'
import { Button } from './index.js'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    toggled: {
      control: { type: 'boolean' },
    },
  },
}

export const Default = {
  render: () => (
    <div style={{ display: 'flex', gap: 76 }}>
      {(['fill', 'border', 'ghost'] as const).map((variant) => (
        <div
          style={{
            display: 'inline-grid',
            gap: 12,
            gridTemplateColumns: 'repeat(4, auto)',
            placeItems: 'center start',
          }}
        >
          {(['regular', 'small'] as const).map((size) =>
            (['neutral', 'red'] as const).map((color) =>
              [false, true].map((toggled) =>
                [{}, { disabled: true }, { loading: true }].map((props) =>
                  (
                    [
                      {},
                      { leadIcon: 'checkmark' },
                      { trailIcon: 'checkmark' },
                      { keyHint: 'Cmd+Shift' },
                    ] as any
                  ).map((props2) => (
                    <Button
                      variant={variant}
                      size={size}
                      color={color}
                      toggled={toggled}
                      tooltip={`${variant} ${size} ${color} ${toggled ? 'toggled' : ''} ${props?.loading ? 'loading' : ''} ${props?.disabled ? 'disabled' : ''}`}
                      {...props}
                      {...props2}
                    >
                      Label
                    </Button>
                  )),
                ),
              ),
            ),
          )}
        </div>
      ))}
    </div>
  ),
}

export const AsyncOnClick = {
  args: {
    children: 'Button label',
    variant: 'fill',
    color: 'red',
    leadIcon: 'delete',
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
      console.log('promise resolved')
    },
  },
}
