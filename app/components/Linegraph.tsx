import React from 'react'
import { LineGraph, styled } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'LineGraph',
  component: LineGraph,
  properties: props.props.LineGraphProps.props,
  description: '',
  examples: [
    {
      props: { label: 'single line' },
      customRenderer: (props) => {
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

        return (
          <styled.div
            style={{
              width: 600,
              height: 364,
              marginBottom: 24,
            }}
          >
            <LineGraph
              data={genRandomPoints(
                (i) => ({ x: i, y: ~~(Math.random() * 10) + i * 100 }),
                0,
                50
              )}
              label="Single Line"
            />
          </styled.div>
        )
      },
    },
  ],
}

export default example
