import React, { ReactNode } from 'react'
import { Counter, Row } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { IconChartPie, IconWifi } from '../../src/icons/index'

const example: ComponentDef = {
  name: 'Counter',
  properties: props.props.CounterProps.props,
  description: '',
  component: Counter,
  examples: [
    {
      props: {
        color: 'informative',
        children: 0,
      },
    },
    {
      props: {
        color: 'warning',
        children: 1562,
        icon: () => React.createElement(IconChartPie),
        valueFormat: 'number-bytes',
      },
    },
    {
      props: {
        label: 'Hello this is wifi %!',
        color: 'blue',
        children: 0.21,
        icon: () => React.createElement(IconWifi),
        valueFormat: 'number-ratio',
      },
    },
    {
      customRenderer: (props) => {
        const thumbs: ReactNode[] = new Array(100).fill(null).map((_, i) => {
          return (
            <Counter key={i} {...props}>
              {~~(Math.random() * 10)}
            </Counter>
          )
        })

        return (
          <Row
            style={{
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            {thumbs}
          </Row>
        )
      },
      props: {
        icon: () => React.createElement(IconWifi),
      },
    },
  ],
}

export default example
