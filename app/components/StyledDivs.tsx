import React from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Style, styled } from 'inlines'
import { Row, Column, Center, RowSpaced, RowEnd, Text, border } from '../../src'

type StyledDivsProps = {
  style?: Style
}

export const StyledDivs = ({ style }: StyledDivsProps) => {
  return (
    <styled.div
      style={{
        '&:hover': {
          border: '1px solid red',
          '&::after': {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            transform: 'translate(50%, 50%)',
            height: '400px',
            width: '100px',
            zIndex: 4,
            content:
              'url("https://media.tenor.com/F2hvezp1-SoAAAAC/soggy-cat-soggy-cat-jumpscare.gif")',
          },
        },
      }}
    >
      <styled.div
        style={{
          opacity: 0,
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Text>Look hoverstate and pseudo-element</Text>
      </styled.div>
      <Text>Allows for more inline css stuff</Text>
    </styled.div>
  )
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
              <Row style={{ gap: 10, border: border(1) }}>
                <Text>Row</Text>
                <Text>Row</Text>
                <Text>Row</Text>
                <Text>Row</Text>
              </Row>
            </div>
            <div style={{ marginLeft: 10, border: border(1) }}>
              <Column>
                <Text>Column</Text>
                <Text>Column</Text>
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
