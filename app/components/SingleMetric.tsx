import React from 'react'
import { SingleMetric } from '../../src'
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
        // color: 'informative',
        valueFormat: 'number-euro',
        label: 'Total Sessions',
        data: data,
      },
    },
  ],
}

export default example
