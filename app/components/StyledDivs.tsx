import React from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Style } from 'inlines'
import { Row, Column, Center, RowSpaced, RowEnd, Text } from '../../src'

type StyledDivsProps = {
  style?: Style
}

export const StyledDivs = ({ style }: StyledDivsProps) => {
  return <div>snupr</div>
}

const example: ComponentDef = {
  name: 'Styled divs',
  properties: {},
  component: StyledDivs,
  description: 'Styled divs component',
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        return <StyledDivs />
      },
    },
    {
      props: {},
      customRenderer: (props) => {
        return (
          <>
            <div>
              <Row>
                <Text>Row</Text>
              </Row>
            </div>
            <div>
              <Column>
                <Text>Column</Text>
              </Column>
            </div>
          </>
        )
      },
    },
  ],
}

export default example
