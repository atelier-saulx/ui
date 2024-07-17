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

export const Primary = {
  args: {
    children: 'Button label',
    variant: 'primary',
    color: 'neutral',
    disabled: false,
    leadIcon: 'add',
    loading: false,
  },
}

export const PrimaryKeyHint = {
  args: {
    children: 'Button label',
    variant: 'primary',
    color: 'neutral',
    disabled: false,
    leadIcon: 'add',
    loading: false,
    keyHint: 'Cmd+F',
  },
}

export const PrimaryDestructive = {
  args: {
    children: 'Button label',
    variant: 'primary',
    color: 'destructive',
    disabled: false,
    leadIcon: 'add',
  },
}

export const PrimaryDestructiveKeyHint = {
  args: {
    children: 'Button label',
    variant: 'primary',
    color: 'destructive',
    disabled: false,
    leadIcon: 'add',
    loading: false,
    keyHint: 'Cmd+F',
  },
}

export const PrimaryLoading = {
  args: {
    children: 'Button label',
    variant: 'primary',
    color: 'neutral',
    disabled: false,
    trail: 'add',
    loading: true,
  },
}

export const Secondary = {
  args: {
    children: 'Button label',
    variant: 'secondary',
    color: 'neutral',
    disabled: false,
    leadIcon: 'add',
  },
}

export const SecondaryDestructive = {
  args: {
    children: 'Button label',
    variant: 'secondary',
    color: 'destructive',
    disabled: false,
    leadIcon: 'add',
  },
}

export const SecondaryToggle = () => {
  const [value, setValue] = useState(false)

  return (
    <Button
      leadIcon="add"
      color="neutral"
      variant="secondary"
      toggled={value}
      onClick={() => setValue(!value)}
    >
      Button label
    </Button>
  )
}

export const SecondaryDestructiveToggle = () => {
  const [value, setValue] = useState(false)

  return (
    <Button
      leadIcon="add"
      color="destructive"
      variant="secondary"
      toggled={value}
      onClick={() => setValue(!value)}
    >
      Button label
    </Button>
  )
}

export const Ghost = {
  args: {
    children: 'Button label',
    variant: 'ghost',
    color: 'neutral',
    disabled: false,
    leadIcon: 'add',
  },
}

export const GhostDestructive = {
  args: {
    children: 'Button label',
    variant: 'ghost',
    color: 'destructive',
    disabled: false,
    leadIcon: 'add',
  },
}

export const GhostToggle = () => {
  const [value, setValue] = useState(false)

  return (
    <Button
      leadIcon="add"
      color="neutral"
      variant="ghost"
      toggled={value}
      onClick={() => setValue(!value)}
    >
      Button label
    </Button>
  )
}

export const GhostDestructiveToggle = () => {
  const [value, setValue] = useState(false)

  return (
    <Button
      leadIcon="add"
      color="destructive"
      variant="ghost"
      toggled={value}
      onClick={() => setValue(!value)}
    >
      Button label
    </Button>
  )
}
