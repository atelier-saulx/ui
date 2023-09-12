import { Counter } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Counter',
  properties: props.props.CounterProps.props,
  description: '',
  component: Counter,
  examples: [
    {
      props: { color: 'informative', children: 24 },
    },
  ],
}

export default example
