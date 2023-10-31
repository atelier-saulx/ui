import React, { useState } from 'react'
import { Row, SingleMetric } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const genRandomPoints = (
  formula: (i: number) => { x: number; y: number },
  start: number = 0,
  end: number = 50,
  step: number = 1
) => {
  const points: { x: number; y: number }[] = []
  for (let i = start; i <= end; i = i + step) {
    points.push(formula(i))
  }
  return points
}

let data = genRandomPoints(
  (i) => ({ x: i, y: ~~(Math.random() * 10000) + i * 100 }),
  0,
  50
)

const example: ComponentDef = {
  name: 'Single Metric',
  component: SingleMetric,
  description: '',
  properties: props.props.SingleMetricProps.props,
  examples: [
    {
      props: {
        valueFormat: 'number-euro',
        label: 'Current Moneys',
        data: data,
      },
    },
    {
      props: {},
      customRenderer: (props) => {
        return (
          <Row style={{ gap: 16 }}>
            <SingleMetric
              valueFormat="number-bytes"
              color="magenta"
              data={genRandomPoints(
                (i) => ({ x: i, y: ~~(Math.random() * 1000) + i * 100 }),
                0,
                50
              )}
              label={'Lots of bytes'}
            />
            <SingleMetric
              valueFormat="number-dollar"
              color="green"
              data={genRandomPoints(
                (i) => ({
                  x: i,
                  y: ~~(Math.random() * 100000) + i * 100,
                }),
                0,
                30
              )}
              label={'Some dollars'}
            />
            <SingleMetric
              valueFormat="number-short"
              color="yellow"
              data={genRandomPoints(
                (i) => ({ x: i, y: ~~(Math.random() * 100000) + i * 100 }),
                0,
                150
              )}
              label={'More numbers for you mind '}
            />
          </Row>
        )
      },
    },
  ],
}

export default example
