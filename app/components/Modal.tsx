import React, { useState } from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Button, Input, Modal, Tab, Tabs, Text } from '../../src'
import { CheckboxInput } from '../../src/components/Input/CheckboxInput'

const example: ComponentDef = {
  name: 'Modal',
  properties: {},
  description: '',
  component: Modal.Root,
  examples: [
    {
      description: 'Change Modal',
      props: {},
      customRenderer: () => {
        const [value, setValue] = useState('Apex')

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
                      value={value}
                      onChange={(v) => {
                        setValue(v)
                      }}
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
    {
      name: 'Alert Modal Example',
      description: 'Modal Alert',
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
                  <Modal.Title>Delete field</Modal.Title>
                  <Modal.Body>
                    <Text>
                      Are you sure you want to delete the field{' '}
                      <b>Description</b>
                    </Text>
                    <Modal.Warning>
                      You are about to update the default view <b>Sequence</b>{' '}
                      for all users.
                    </Modal.Warning>
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
    {
      name: 'Add custom view',
      description: 'Another example of this',
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
                  <Modal.Title>Delete field</Modal.Title>
                  <Modal.Description>
                    This is your organisation's name within Based. <br />
                    For example, you can use the name of your company or
                    department.
                  </Modal.Description>
                  <Modal.Body>
                    <Tabs>
                      <Tab
                        label="General"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 24,
                        }}
                      >
                        <Modal.Warning type="alert">
                          You are about to update the default view{' '}
                          <b>Sequence</b> for all users.
                        </Modal.Warning>
                        <span>
                          <Text style={{}}>Name</Text>
                          <Text light>
                            Name that will be displayed in the interace
                          </Text>
                        </span>
                        <CheckboxInput
                          title="Name"
                          description="Name that will be displayed in the interface"
                          value={false}
                          onChange={() => null}
                        />
                        <CheckboxInput
                          title="Name"
                          description="Name that will be displayed in the interface"
                          value={false}
                          onChange={() => null}
                        />
                      </Tab>
                      <Tab label="Settings">Avatar</Tab>
                    </Tabs>
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
