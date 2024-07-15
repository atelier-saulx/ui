import { IconButton } from './index.js'

export default {
  title: 'Components/IconButton',
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
export const DestructiveSmall = {
  args: {
    variant: 'close',
    color: 'destructive',
    disabled: false,
    size: 'small',
  },
}
