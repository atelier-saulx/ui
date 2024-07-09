import type { Preview } from '@storybook/react'
import '../src/assets/global.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'system',
      values: [
        {
          name: 'system',
          value: 'var(--color-neutral-inverted-100)',
        },
      ],
    },
  },
}

export default preview
