import { Text } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Text',
  component: Text,
  description: 'Text including typography',
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
      name: 'Light',
      props: {
        children: 'Light text, for descriptions.',
        light: true,
      },
    },
    {
      name: 'Click handler',
      description: 'Similair to link components',
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
      name: 'Number formats',
      description:
        'Different formats "date-time-human" updates the text component to show numbers like, for example 15s ago',
      props: {
        children: Date.now() - 15 * 1e3,
        valueFormat: 'date-time-human',
      },
    },
    {
      name: ' ',
      description:
        'Will update less often after a minute, will stop after an hour',
      props: {
        children: Date.now() - 50 * 1e3,
        valueFormat: 'date-time-human',
      },
    },
    {
      name: ' ',
      description: '"number-bytes" will show kb/mb/gb etc',
      props: {
        children: 1e9,
        valueFormat: 'number-bytes',
      },
    },
  ],
}

export default example
