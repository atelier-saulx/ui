import React from 'react'
import { RichTextEditor } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'RichTextEditor',
  properties: {},
  // properties: props.props.RichTextEditorProps.props,
  description:
    'An input that lets users enter large amounts of complex rich text for things like blog posts, news articles etc.',
  component: RichTextEditor,
  examples: [
    {
      props: {},
      customRenderer: () => {
        return (
          <div style={{ width: 900 }}>
            <RichTextEditor
              placeholder="Enter some rich text..."
              defaultValue={localStorage.getItem('rte-test') ?? undefined}
              onChange={(value) => {
                localStorage.setItem('rte-test', value)
              }}
            />
          </div>
        )
      },
    },
  ],
}

export default example
