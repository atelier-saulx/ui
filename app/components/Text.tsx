import { Text } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Text',
  component: Text,
  description: 'Text including typeography',
  properties: props.props.TextProps.props,
  examples: [
    {
      props: {
        children: 'Some Text',
        weight: 'medium',
        style: { color: 'red' },
      },
    },
    {
      props: {
        children: 'Light text, for descriptions.',
        light: true,
      },
    },
    {
      props: {
        underline: true,
        children: 'Clickable text',
        onClick: (e) => {
          e.target.style.opacity = 0.5
          setTimeout(() => {
            e.target.style.opacity = 1
          }, 100)
        },
      },
    },
    {
      props: {
        children: Date.now() - 15 * 1e3,
        valueFormat: 'date-time-human',
      },
    },
  ],
}

export default example
