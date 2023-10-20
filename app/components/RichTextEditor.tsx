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
        style: { width: 676 },
      },
      customRenderer: (props) => {
        let data = {
          time: 1550476186479,
          blocks: [
            {
              id: 'zbGZFPM-if',
              type: 'heading',
              data: {
                innerText: 'You want your tree to have some character.',
                // innerHTML: '<b>you want it</b>',
                level: 3,
                alignment: 'center',
              },
            },
            {
              id: 'zbGZFPM-iI',
              type: 'paragraph',
              data: {
                innerText:
                  "If you don't like it - change it. It's your world. If we're gonna walk though the woods, we need a little path. Isn't that fantastic that you can create an almighty tree that fast?",
                innerHTML:
                  "If you don't <b>like it - change it.</b> It's your world. If we're gonna walk though the woods, we need a little path. Isn't that fantastic that you can create an almighty tree that fast?",
                alignment: 'center',
                //   style: 'background:yellow;',
              },
            },
            // {
            //   id: 'zbGZFPM-aa',
            //   type: 'list',
            //   data: {
            //     type: 'unordered',
            //     items: [
            //       'It is a block-style editor',
            //       'It returns clean data output in JSON',
            //       'Designed to be extendable and pluggable with a',
            //     ],
            //   },
            // },
            // {
            //   id: '8hp7msbRKc',
            //   type: 'html',
            //   data: {
            //     html: '<div>raw html</div>',
            //   },
            // },
            // {
            //   id: '8hp7msbRKc',
            //   type: 'image',
            //   data: {
            //     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlPMlAI4LpTJQHrfUHdxtNSzs7p7kjOG8gejP_dPabUB1fJ-YU_0gjTbXioHSedzb-NGc&usqp=CAU',
            //   },
            // },
            // {
            //   id: '8hp7ms433bc',
            //   type: 'space',
            //   data: {
            //     space: 46,
            //     spaceFormat: 'px',
            //   },
            // },
          ],
          // version: '2.8.1',
        }

        return <Input type="rich-text" data={data} {...props} />
      },
    },
  ],
}

export default example
