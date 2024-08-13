import React from 'react'
import { KeyHint } from './index.js'
import { colors } from '../../utils/colors.js'

export default {
  title: 'KeyHint',
  component: KeyHint,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'inline-grid',
        gap: 24,
        gridTemplateColumns: 'repeat(2, auto)',
      }}
    >
      {[
        'Cmd+Alt+A',
        'Cmd+Delete',
        'Shift+A',
        'Cmd+ArrowUp',
        'Esc',
        'Enter',
      ].map((hint) =>
        ['neutral', 'red'].map((color) => (
          <KeyHint color={color as any} hint={hint as any} />
        )),
      )}
    </div>
  ),
}

export const Inverted = {
  render: () => (
    <div
      style={{
        background: colors.neutral100,
        display: 'inline-grid',
        gap: 24,
        gridTemplateColumns: 'repeat(2, auto)',
      }}
    >
      {[
        'Cmd+Alt+A',
        'Cmd+Delete',
        'Shift+A',
        'Cmd+ArrowUp',
        'Esc',
        'Enter',
      ].map((hint) =>
        ['inverted'].map((color) => (
          <KeyHint color={color as any} hint={hint as any} />
        )),
      )}
    </div>
  ),
}

export const White = {
  render: () => (
    <div
      style={{
        background: colors.black100,
        display: 'inline-grid',
        gap: 24,
        gridTemplateColumns: 'repeat(2, auto)',
      }}
    >
      {[
        'Cmd+Alt+A',
        'Cmd+Delete',
        'Shift+A',
        'Cmd+ArrowUp',
        'Esc',
        'Enter',
      ].map((hint) =>
        ['white'].map((color) => (
          <KeyHint color={color as any} hint={hint as any} />
        )),
      )}
    </div>
  ),
}
