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
            {
              id: 'zbGZFPM-aa',
              type: 'list',
              data: {
                type: 'unordered',
                items: [
                  'It is a block-style editor',
                  'It returns clean data output in JSON',
                  'Designed to be extendable and pluggable with a',
                ],
              },
            },
            {
              id: '8hp7msbRKc',
              type: 'raw',
              data: {
                html: '<div>raw html</div>',
              },
            },
            {
              id: '8hp7msbRKc',
              type: 'image',
              data: {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlPMlAI4LpTJQHrfUHdxtNSzs7p7kjOG8gejP_dPabUB1fJ-YU_0gjTbXioHSedzb-NGc&usqp=CAU',
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
