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
                    <div style={{ display: 'grid', gap: 24 }}>
                      <Input
                        type="text"
                        label="Name of company"
                        value="Apex"
                        onChange={() => {}}
                      />
                      <Input
                        label="Type of company"
                        type="select"
                        multiple={false}
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
