import { DateRange } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Date Range',
  properties: props.props.DateRangeProps.props,
  description: 'Range of date picker',
  component: DateRange,
  examples: [
    {
      props: { onChange: (e) => console.log(e) },
    },
  ],
}

export default example
