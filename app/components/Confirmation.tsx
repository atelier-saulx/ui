import { Confirmation } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Confirmation',
  properties: props.props.ConfirmationProps.props,
  component: Confirmation,
  description: 'Returns true or false',
  examples: [
    {
      props: {
        onClick: (e) => console.log(e),
      },
    },
  ],
}

export default example
