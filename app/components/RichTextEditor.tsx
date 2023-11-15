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
              autoFocus={true}
              placeholder="Enter some rich text..."
              defaultValue={localStorage.getItem('rte-test') ?? undefined}
              onChange={({ json, html }) => {
                //  localStorage.setItem('rte-test', json)
                localStorage.setItem('rte-test', json)
                console.log('html --> ', html)
                console.log('json --> ', json)
              }}
            />
          </div>
        )
      },
    },
  ],
}

export default example
