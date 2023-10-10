import React, { useState } from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Button, Input, Modal, PromptAlert, Tab, Tabs, Text } from '../../src'
import { CheckboxInput } from '../../src/components/Input/CheckboxInput'

const example: ComponentDef = {
  name: 'Prompt',
  properties: props.props.PromptProps.props,
  description: 'Prompt template',
  component: PromptAlert.Root,
  examples: [
    {
      props: {
        title: 'This is a prompt',
        description: 'Enter a value',
      },
      customRenderer: (props) => {
        const [value, setValue] = useState('')
        return (
          <PromptAlert.Root>
            <Text>Prompt Result : {value}</Text>
            <PromptAlert.Trigger>
              <Button>Open Prompt</Button>
            </PromptAlert.Trigger>
            <PromptAlert.Prompt {...props} onChange={setValue} />
          </PromptAlert.Root>
        )
      },
    },
  ],
}

export default example
