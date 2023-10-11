import React, { useState } from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Button, Input, SidePanel, Tab, Tabs, Text } from '../../src'
import { CheckboxInput } from '../../src/components/Input/CheckboxInput'

const example: ComponentDef = {
  name: 'SidePanel',
  properties: props.props.SidePanelContentProps.props,
  description: '',
  component: SidePanel.Root,
  examples: [
    {
      description: 'Change SidePanel',
      props: { position: 'left' },
      customRenderer: (props) => {
        return (
          <SidePanel.Root>
            <SidePanel.Trigger>
              <Button>Open modal</Button>
            </SidePanel.Trigger>
            <SidePanel.Content {...props}>
              {({ close }) => (
                <>
                  <SidePanel.Title>Title of modal</SidePanel.Title>

                  <SidePanel.Body>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                    </div>
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
                        value="value2"
                        onChange={() => {}}
                        options={[
                          { label: 'Item one', value: 'value1' },
                          { label: 'Item two', value: 'value2' },
                          { label: 'Item three', value: 'value3' },
                        ]}
                      />
                      asdfasdfasdfadf
                    </div>
                  </SidePanel.Body>
                  <SidePanel.Actions>
                    <Button onClick={close} color="system">
                      Cancel
                    </Button>
                    <Button onClick={close} color="primary">
                      Save
                    </Button>
                  </SidePanel.Actions>
                </>
              )}
            </SidePanel.Content>
          </SidePanel.Root>
        )
      },
    },
  ],
}

export default example
