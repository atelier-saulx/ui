import React from 'react'
import { Popover, Button, Input } from '../../src'

import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Popover',
  component: Popover.Root,
  description: 'PopoverTest',
  properties: {}, //props.props.PopoverProps.props,
  examples: [
    {
      props: {
        position: 'top-left',
        style: {
          textTransform: 'uppercase',
        },
      },
      customRenderer: (props) => {
        return (
          <Popover.Root>
            <Popover.Trigger>
              <Button>Open Popover</Button>
            </Popover.Trigger>

            <Popover.Content sideOffset={12}>
              <div style={{ display: 'grid', gap: 24, padding: '16px 24px' }}>
                <Input type="text" label="Name of company" />
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
                <Input type="text" label="Name of company" />
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
                <Input type="text" label="Name of company" />
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
                <Input type="text" label="Name of company" />
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
                <Input type="text" label="Name of company" />
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
                <Input type="text" label="Name of company" />
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
                <Input type="text" label="Name of company" />
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
                <Input type="text" label="Name of company" />
                <Input
                  label="Type of company"
                  type="select"
                  value="value"
                  onChange={() => {}}
                  options={[
                    { label: 'Item one', value: 'value1' },
                    { label: 'Item two', value: 'value2' },
                    { label: 'Item three', value: 'value3' },
                  ]}
                />
              </div>
            </Popover.Content>
          </Popover.Root>
        )
      },
    },
  ],
}

export default example
