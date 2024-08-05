import React from 'react'
import { IconButton } from './index.js'

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'inline-grid',
        gap: 24,
        gridTemplateColumns: 'repeat(3, auto)',
        placeItems: 'center',
      }}
    >
      {(['neutral', 'red'] as const).map((color) =>
        [false, true].map((toggled) =>
          [{}, { disabled: true }, { loading: true }].map((props) =>
            (['regular', 'small', 'tiny'] as const).map((size) => (
              <IconButton
                icon="close"
                color={color}
                size={size}
                toggled={toggled}
                tooltip={`${size} ${color} ${toggled ? 'toggled' : ''} ${props?.loading ? 'loading' : ''} ${props?.disabled ? 'disabled' : ''}`}
                {...props}
              />
            )),
          ),
        ),
      )}
    </div>
  ),
}

export const KeyHint = () => {
  return (
    <IconButton
      icon="close"
      keyHint="Esc"
      tooltip="Close something"
      onClick={() => {
        alert('close button clicked')
      }}
    />
  )
}
