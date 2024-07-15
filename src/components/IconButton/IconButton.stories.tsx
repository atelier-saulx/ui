import React, { useState } from 'react'
import { IconButton } from './index.js'

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
}

export const NeutralNormal = {
  args: {
    variant: 'close',
    color: 'neutral',
    disabled: false,
    size: 'normal',
  },
}

export const NeutralToggle = () => {
  const [value, setValue] = useState(false)

  return (
    <IconButton
      variant="text"
      toggled={value}
      onClick={() => setValue(!value)}
    />
  )
}

export const NeutralSmall = {
  args: {
    variant: 'close',
    color: 'neutral',
    disabled: false,
    size: 'small',
  },
}

export const NeutralTiny = {
  args: {
    variant: 'close',
    color: 'neutral',
    disabled: false,
    size: 'tiny',
  },
}

export const DestructiveTiny = {
  args: {
    variant: 'close',
    color: 'destructive',
    disabled: false,
    size: 'tiny',
  },
}

export const DestructiveNormal = {
  args: {
    variant: 'close',
    color: 'destructive',
    disabled: false,
    size: 'normal',
  },
}

export const DestructiveToggle = () => {
  const [value, setValue] = useState(false)

  return (
    <IconButton
      variant="text"
      color="destructive"
      toggled={value}
      onClick={() => setValue(!value)}
    />
  )
}

export const DestructiveSmall = {
  args: {
    variant: 'close',
    color: 'destructive',
    disabled: false,
    size: 'small',
  },
}
