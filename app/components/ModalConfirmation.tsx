import React, { useState } from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Button, Input, Modal, Tab, Tabs, Text } from '../../src'
import { CheckboxInput } from '../../src/components/Input/CheckboxInput'

const example: ComponentDef = {
  name: 'Modal Confirmation',
  properties: props.props.ModalConfirmationProps.props,
  description: 'Modal template',
  component: Modal.Root,
  examples: [
    {
      description: 'Change Modal',
      props: {
        title: 'Delete Field',
        action: { action: () => console.log('deleted'), label: 'Confirm' },
        description: 'Are you sure',
        label: 'Deleting this will affect things',
        type: 'alert',
      },
      customRenderer: (props) => {
        return (
          <Modal.Root>
            <Modal.Trigger>
              <Button>Open modal</Button>
            </Modal.Trigger>
            <Modal.Confirmation {...props} />
          </Modal.Root>
        )
      },
    },
  ],
}

export default example
