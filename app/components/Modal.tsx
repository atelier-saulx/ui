import React from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Button, Input, Modal } from '../../src'

const example: ComponentDef = {
  name: 'Modal',
  properties: {},
  description: '',
  component: Modal.Root,
  examples: [
    {
      props: {},
      customRenderer: () => {
        return (
          <Modal.Root>
            <Modal.Trigger>
              <Button>Open modal</Button>
            </Modal.Trigger>
            <Modal.Content>
              {({ close }) => (
                <>
                  <Modal.Title>Title of modal</Modal.Title>
                  <Modal.Description>Description of modal</Modal.Description>
                  <Modal.Body>
                    <Input
                      type="text"
                      label="Name of company"
                      value="Apex"
                      onChange={() => {}}
                    />
                  </Modal.Body>
                  <Modal.Actions>
                    <Button onClick={close} color="system">
                      Cancel
                    </Button>
                    <Button onClick={close} color="primary">
                      Save
                    </Button>
                  </Modal.Actions>
                </>
              )}
            </Modal.Content>
          </Modal.Root>
        )
      },
    },
  ],
}

export default example
