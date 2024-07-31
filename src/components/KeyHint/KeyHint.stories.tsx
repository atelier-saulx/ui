import React from 'react'
import { KeyHint } from './index.js'

export default {
  title: 'Quarks/KeyHint',
  component: KeyHint,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}
    >
      {['subtle', 'fill'].map((variant) =>
        ['neutral', 'inverted', 'red', 'white'].map((color) => (
          <KeyHint
            color={`${color}-${variant}` as any}
            hint="Cmd+F"
            onTrigger={() => {}}
          />
        )),
      )}
    </div>
  ),
}
