import React, { useState } from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Button, Input, Modal, PromptAlert, Tab, Tabs, Text } from '../../src'
import { CheckboxInput } from '../../src/components/Input/CheckboxInput'

const example: ComponentDef = {
  name: 'Alert',
  properties: props.props.AlertProps.props,
  description: 'Alert ',
  component: PromptAlert.Root,
  examples: [
    {
      props: {
        title: 'This is an alert',
        description: 'You can put a message here or smth',
      },
      customRenderer: (props) => {
        return (
          <PromptAlert.Root>
            <PromptAlert.Trigger>
              <Button>Open Alert</Button>
            </PromptAlert.Trigger>
            <PromptAlert.Alert
              {...props}
              action={() => console.log('asdfsa')}
            />
          </PromptAlert.Root>
        )
      },
    },
  ],
}

export default example
