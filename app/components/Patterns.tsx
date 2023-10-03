import React, { useState } from 'react'
import { ComponentDef } from '../types'
import {
  Button,
  Dropdown,
  IconMoreVertical,
  Input,
  Modal,
  Text,
} from '../../src'

const example: ComponentDef = {
  name: 'Patterns',
  component: () => <div />,
  description: 'A few advanced patterns',
  properties: {},
  examples: [
    {
      name: 'Opening a dialog from a dropdown',
      props: {},
      customRenderer: () => {
        const [open, setOpen] = useState(false)

        return (
          <div>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <Button color="system" icon={<IconMoreVertical />} />
              </Dropdown.Trigger>
              <Dropdown.Items>
                <Dropdown.Item
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  Open modal
                </Dropdown.Item>
              </Dropdown.Items>
            </Dropdown.Root>

            <Modal.Root open={open} onOpenChange={setOpen}>
              <Modal.Content>
                <Modal.Title>Title of modal</Modal.Title>
                <Modal.Description>Description of modal</Modal.Description>
                <Modal.Body>
                  <div style={{ display: 'grid', gap: 24 }}>
                    <Input
                      type="text"
                      label="Name of company"
                      defaultValue="Apex"
                    />
                    <Input
                      label="Type of company"
                      type="select"
                      defaultValue="value2"
                      options={[
                        { label: 'Item one', value: 'value1' },
                        { label: 'Item two', value: 'value2' },
                        { label: 'Item three', value: 'value3' },
                      ]}
                    />
                  </div>
                </Modal.Body>
                <Modal.Actions>
                  <Button
                    onClick={() => {
                      setOpen(false)
                    }}
                    color="system"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false)
                    }}
                    color="primary"
                  >
                    Save
                  </Button>
                </Modal.Actions>
              </Modal.Content>
            </Modal.Root>
          </div>
        )
      },
    },
  ],
}

export default example
