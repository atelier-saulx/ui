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
                level: 'h3',
                alignment: 'left',
              },
            },
            {
              id: 'xxx',
              type: 'paragraph',
              data: {
                innerText:
                  "If you don't like it - change it. It's your world. If we're gonna walk though the woods, we need a little path. Isn't that fantastic that you can create an almighty tree that fast?",
                //       innerHTML: `lorem <b onmouseover="alert('mouseover');">ipsum sanitized this </b>`,
                alignment: 'right',
                //    style: 'background:yellow;color:red;border:1px solid blue;',
              },
            },
            {
              id: 'zbGZFPM-iI',
              type: 'paragraph',
              data: {
                innerText:
                  "A thin paint will stick to a thick paint. Don't forget to tell these special people in your life just how special they are to you. Life is too short to be alone, too precious. Share it with a friend. You create the dream - then you bring it into your world. It's a super day, so why not make a beautiful sky?",
                //       innerHTML: `lorem <b onmouseover="alert('mouseover');">ipsum sanitized this </b>`,
                alignment: 'left',
                style: 'background:yellow;color:red;border:1px solid blue;',
              },
            },
            {
              id: 'zbGZFPM-aa',
              type: 'list',
              data: {
                type: 'unordered',
                //  alignment: 'center',
                items: [
                  {
                    innerText: 'It is a block-style editor',
                    innerHTML: '<b>It is a </b> block-style editor',
                  },
                  { innerText: 'snurpie', innerHTML: 'snurpie' },
                  {
                    innerText: 'It returns clean data output in JSON',
                    innerHTML: 'It <i>returns</i> clean data output in JSON',
                  },
                ],
                // items: ['silly', 'flippling', 'arary'],
              },
            },
            {
              id: '8hp7msbRKc',
              type: 'html',
              data: {
                innerHTML: '<div>raw html</div>',
              },
            },
            // {
            //   id: '8hp7msbRKc',
            //   type: 'image',
            //   data: {
            //     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlPMlAI4LpTJQHrfUHdxtNSzs7p7kjOG8gejP_dPabUB1fJ-YU_0gjTbXioHSedzb-NGc&usqp=CAU',
            //   },
            // },
            {
              id: '8hp7ms433bc',
              type: 'space',
              data: {
                space: 46,
                spaceFormat: 'px',
              },
            },
          ],
          // version: '2.8.1',
        }

        return <Input type="rich-text" data={data} {...props} />
      },
    },
  ],
}

export default example
