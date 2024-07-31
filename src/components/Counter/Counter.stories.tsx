import React from 'react'
import { Counter } from './index.js'

export default {
  title: 'Quarks/Counter',
  component: Counter,
}

export const Default = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {['neutral', 'inverted', 'red', 'green', 'indigo', 'amber'].map(
          (color) => (
            <Counter color={color as any}>0</Counter>
          ),
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {['neutral', 'inverted', 'red', 'green', 'indigo', 'amber'].map(
          (color) => (
            <Counter color={color as any}>99+</Counter>
          ),
        )}
      </div>
    </div>
  ),
}
