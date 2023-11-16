import React, { useState } from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Button, FormGroup, Input, SidePanel, Tab, Tabs, Text } from '../../src'
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
            </SidePanel.Content>
          </SidePanel.Root>
        )
      },
    },
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
              <SidePanel.Title>Title of modal</SidePanel.Title>

              <FormGroup
                style={{ padding: 20 }}
                onChange={(v) => console.log(v)}
                confirmationVariant="modal"
                config={{
                  flap: {
                    type: 'boolean',
                  },
                  flirp: {
                    type: 'boolean',
                  },
                  snap: {
                    type: 'text',
                  },
                  snop: {
                    type: 'file',
                  },
                  flop: {
                    type: 'object',
                    properties: {
                      nested1flap: {
                        type: 'boolean',
                      },
                      nested1snurp: {
                        type: 'boolean',
                      },
                      nested1cod: {
                        type: 'boolean',
                      },
                      nested1bla: {
                        type: 'object',
                        properties: {
                          nested2flap: {
                            type: 'boolean',
                          },
                          nested2snurp: {
                            type: 'boolean',
                          },
                          nested2cod: {
                            type: 'boolean',
                          },
                        },
                      },
                    },
                  },
                }}
              />
            </SidePanel.Content>
          </SidePanel.Root>
        )
      },
    },
  ],
}

export default example
