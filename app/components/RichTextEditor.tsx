import React from 'react'
import { RichTextEditor } from '../../src'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'RichTextEditor',
  properties: props.props.DividerProps.props,
  description: 'output as json-object',
  component: RichTextEditor,
  examples: [
    {
      props: {
        label: 'Rich Text Editor',
        style: { minWidth: 676 },
      },
      customRenderer: (props) => {
        let data = {
          time: 1550476186479,
          blocks: [
            {
              id: 'zbGZFPM-iI',
              type: 'paragraph',
              data: {
                text: "If you don't like it - change it. It's your world. If we're gonna walk though the woods, we need a little path. Isn't that fantastic that you can create an almighty tree that fast?",
              },
            },
            {
              id: 'zbGZFPM-if',
              type: 'header',
              data: {
                text: 'You want your tree to have some character.',
              },
            },
          ],
          version: '2.8.1',
        }

        return <Input type="rich-text" data={data} {...props} />
      },
    },
  ],
}

export default example
