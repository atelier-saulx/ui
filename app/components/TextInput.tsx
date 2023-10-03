import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'
import { useClient, useQuery } from '@based/react'

const example: ComponentDef = {
  name: 'TextInput',
  component: Input,
  description: 'Text Input',
  properties: {
    style: { type: 'Style' },
    value: { type: 'string' },
    onFocus: { type: 'OnFocus' },
    onBlur: { type: 'OnBlurf' },
    onChange: { type: 'OnChangeHandler' },
    label: { type: 'string' },
    error: { type: 'boolean' },
    placeholder: { type: 'string' },
    clearButton: { type: 'boolean' },
    message: { type: 'ReactNode' },
  },
  examples: [
    {
      props: {
        type: 'text',
        placeholder: 'Some text',
      },
    },
    {
      name: 'Input with state coming from based',
      description: `We are using uncontrolled inputs with a defaultValue coming from based and the onChange callbacks to push updates back to based.`,
      props: {},
      customRenderer: () => {
        const client = useClient()
        const { data } = useQuery('db', {
          $id: 'root',
          demoState: true,
        })

        if (!data) return 'loading...'

        return (
          <form style={{ width: 300, display: 'grid', gap: 24 }}>
            <Input
              label="Name"
              type="text"
              defaultValue={data.demoState.name}
              onChange={async (value) => {
                await client.call('db:set', {
                  $id: 'root',
                  demoState: {
                    name: value,
                  },
                })
              }}
            />
            <Input
              label="Name"
              type="select"
              defaultValue={data.demoState.select}
              placeholder="Select one"
              options={[
                { label: 'Label one', value: 'one' },
                { label: 'Label two', value: 'two' },
              ]}
              onChange={async (value) => {
                await client.call('db:set', {
                  $id: 'root',
                  demoState: {
                    select: value,
                  },
                })
              }}
            />
            <pre style={{ overflowX: 'auto', width: '100%' }}>
              {JSON.stringify({ state_in_the_db: data.demoState }, null, 2)}
            </pre>
          </form>
        )
      },
    },
    {
      props: {
        label: 'This is a controlled input',
        placeholder: 'advanced',
        error: true,
        message: 'Hello this is wrong!',
      },
      customRenderer: (props) => {
        const [value, setValue] = useState('asd')

        return (
          <Input
            type="text"
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            maxLength={16}
            {...props}
          />
        )
      },
    },
    {
      props: {
        type: 'password',
        placeholder: 'Type password',
      },
    },
  ],
}

export default example
