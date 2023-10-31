import React from 'react'
import { ComponentDef } from '../types'
import { Row, Column, Center, RowSpaced, RowEnd, Text, Code } from '../../src'

const example: ComponentDef = {
  name: 'Layout Elements',
  properties: {
    style: { type: 'Style', optional: true },
    children: { type: 'ReactNode' },
  },
  component: React.Fragment,
  description: 'Styled div-components',
  examples: [
    {
      name: 'Row',
      description: 'Positions elements horizontally (like display:flex; )',
      props: {},
      customRenderer: () => {
        return (
          <div>
            <Code
              value={
                '<Row>\n\t<Text>hello</Text>\n\t<Text>goodbye</Text>\n</Row>'
              }
              language="html"
            />
            <Row>
              <Text>hello</Text>
              <Text>goodbye</Text>
            </Row>
          </div>
        )
      },
    },
    {
      name: 'Column',
      description: 'Positions elements vertically (flexDirection: column )',
      props: {},
      customRenderer: (props) => {
        return (
          <div>
            <Code
              value={
                '<Column>\n\t<Text>hello</Text>\n\t<Text>goodbye</Text>\n</Column>'
              }
              language="html"
            />
            <Column>
              <Text>hello</Text>
              <Text>goodbye</Text>
            </Column>
          </div>
        )
      },
    },
    {
      name: 'Center',
      description: 'Centers the content inside horizontal and vertical',
      props: {},
      customRenderer: (props) => {
        return (
          <div>
            <Code
              value={'<Center>\n\t<Text>centered</Text>\n</Center>'}
              language="html"
            />
            <Center>
              <Text>centered</Text>
            </Center>
          </div>
        )
      },
    },
    {
      name: 'RowSpaced',
      description:
        'Divides elements across available space and aligns them vertically in center',
      props: {},
      customRenderer: (props) => {
        return (
          <div>
            <Code
              value={
                '<RowSpaced>\n\t<Text>pushed left</Text>\n\t<Text>pushed right</Text>\n</RowSpaced>'
              }
              language="html"
            />
            <RowSpaced>
              <Text>pushed left</Text>
              <Text>pushed right</Text>
            </RowSpaced>
          </div>
        )
      },
    },
    {
      name: 'RowEnd',
      description:
        'Pushes all elements to the end(right) side of the available space',
      props: {},
      customRenderer: (props) => {
        return (
          <div>
            <Code
              value={
                '<RowEnd>\n\t<Text>pushed to end</Text>\n\t<Text>pushed further</Text>\n</RowEnd>'
              }
              language="html"
            />
            <RowEnd>
              <Text>pushed to end</Text>
              <Text>pushed further</Text>
            </RowEnd>
          </div>
        )
      },
    },
  ],
}

export default example
