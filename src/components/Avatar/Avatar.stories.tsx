import React from 'react'
import { Avatar } from './index.js'

export default {
  title: 'Quarks/Avatar',
  component: Avatar,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        gridTemplateColumns: 'auto auto auto',
      }}
    >
      {[
        undefined,
        'neutral',
        'inverted',
        'red',
        'indigo',
        'green',
        'amber',
      ].map((color) => (
        <Avatar
          src="https://public.linear.app/9fa6f7a2-5e7d-4fb8-af60-d35ba4592b2c/2bd65f8b-2f43-4b01-95fb-170bdd1a1280/368af3c7-dc76-4729-a5a6-3809399c312a"
          {...((color ? { color } : {}) as any)}
        />
      ))}
    </div>
  ),
}
