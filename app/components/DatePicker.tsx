import { DatePicker } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Date Picker',
  properties: props.props.DatePickerProps.props,
  description: 'Single day picker',
  component: DatePicker,
  examples: [
    {
      props: { onChange: (e) => console.log(e) },
    },
  ],
}

export default example
