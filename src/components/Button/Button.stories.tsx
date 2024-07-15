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

export const PrimaryDestructive = {
  args: {
    children: 'Button label',
    variant: 'primary',
    color: 'destructive',
    disabled: false,
    leadIcon: 'add',
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
