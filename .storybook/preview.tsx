import type { Preview } from '@storybook/react'
import '../src/assets/global.css'
import * as React from 'react'
import { Provider } from '../src/components/Provider/index.js'
import based from '@based/client'
import { Provider as BasedProvider } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'storybook',
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'auto',
      values: [
        {
          name: 'auto',
          value: 'var(--neutral-inverted-100)',
        },
      ],
    },
    viewport: { disable: true },
  },
  globalTypes: {
    theme: {
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: (Story, context) => {
    return (
      <BasedProvider client={client}>
        <Provider forcedTheme={context.globals.theme}>
          <Story />
        </Provider>
      </BasedProvider>
    )
  },
}

export default preview
