import type { Preview } from '@storybook/react'
import '../src/assets/global.css'
import * as React from 'react'
import { KeyboardEventProvider } from '../src/hooks/useHadKeyboardEvent'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'system',
      values: [
        {
          name: 'system',
          value: 'var(--neutral-inverted-100)',
        },
      ],
    },
  },
  decorators: (Story) => (
    <KeyboardEventProvider>
      <Story />
    </KeyboardEventProvider>
  ),
}

export default preview
