import React from 'react'
import { RichTextEditor } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'RichTextEditor',
  properties: props.props.RichTextEditorProps.props,
  description:
    'An input that lets users enter large amounts of complex rich text for things like blog posts, news articles etc.',
  component: RichTextEditor,
  examples: [
    {
      props: {},
      customRenderer: () => {
        return (
          <div style={{ width: 800 }}>
            <RichTextEditor
              defaultValue={localStorage.getItem('rte-test') ?? undefined}
              onChange={(value) => {
                localStorage.setItem('rte-test', value)
              }}
            />
          </div>
        )
      },
    },
    {
      props: {},
      customRenderer: () => {
        return (
          <div style={{ width: 800 }}>
            <RichTextEditor
              label="Label"
              placeholder="Enter some rich text..."
            />
          </div>
        )
      },
    },
  ],
}

export default example
