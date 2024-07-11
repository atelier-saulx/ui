import { Button } from './index.js'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Primary = {
  args: {
    children: 'Button label',
    variant: 'primary',
    color: 'neutral',
    disabled: false,
    leadIcon: 'add',
  },
}

export const Secondary = {
  args: {
    children: 'Button label',
    variant: 'secondar',
    color: 'neutral',
    disabled: false,
    leadIcon: 'add',
  },
}
