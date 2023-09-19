import React, { useState } from 'react'
import { Modal, Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { SelectInput } from '../../src/components/Input/SelectInput'

const example: ComponentDef = {
  name: 'Modal',
  properties: props.props.ModalProps.props,
  component: Modal,
  description: 'Simple dialog',
  examples: [
    {
      props: {},
      customRenderer: () => {
        const [val, setVal] = useState('')
        const [select, setSelect] = useState('')

        return (
          <Modal
            label="Create a new organisation"
            description="This is your organisation’s name within Based. For example, you can use the name of your company or department."
            cancelLabel="Cancel"
            confirmLabel="Create organisation"
            onCancel={() => {}}
            onConfirm={() => {}}
          >
            <div>
              <Input
                value={val}
                onChange={(value) => {
                  setVal(value)
                }}
                type="text"
                placeholder="e.g. Company name"
                label="Organisation name"
              />
              <label style={{ marginTop: 24, display: 'block' }}>
                <div style={{ fontSize: 14, marginBottom: 4 }}>
                  Organization type
                </div>
                <SelectInput
                  value={select}
                  onChange={(value) => {
                    setSelect(value.toString())
                  }}
                  options={[
                    { label: 'Option one', value: 'one' },
                    { label: 'Option two', value: 'two' },
                  ]}
                  style={{ maxWidth: 'none' }}
                />
              </label>
            </div>
          </Modal>
        )
      },
    },
  ],
}

export default example
