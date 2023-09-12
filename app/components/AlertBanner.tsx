import { AlertBanner } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Alert Banner',
  properties: props.props.AlertBannerProps.props,
  component: AlertBanner,
  description: 'Banners to alert',
  examples: [
    {
      props: {
        color: 'negative',
        children: 'Alert text',
        action: { label: 'Action', onClick: () => console.log('Reaction') },
        style: { width: 374 },
      },
    },
    {
      props: {
        color: 'warning',
        children: 'Warning Resolve',
        action: { label: 'RESOLVE', onClick: () => console.log('oppa') },
      },
    },
  ],
}

export default example
