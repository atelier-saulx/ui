import React from 'react'
import { LineGraph, styled } from '../../src'
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

const example: ComponentDef = {
  name: 'LineGraph',
  component: LineGraph,
  properties: props.props.LineGraphProps.props,
  description: '',
  examples: [
    {
      props: { label: 'Single line', valueFormat: 'number-euro' },
      customRenderer: (props) => {
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
              {...props}
            />
          </styled.div>
        )
      },
    },
    {
      props: { label: 'Single line 50000', valueFormat: 'number-short' },
      customRenderer: (props) => {
        return (
          <styled.div
            style={{
              width: 600,
              height: 364,
              marginBottom: 24,
            }}
          >
            <LineGraph
              data={{
                en: {
                  data: genRandomPoints(
                    (i) => ({
                      x: i,
                      y: ~~(Math.random() * 10000000) + i * 100,
                    }),
                    0,
                    50000
                  ),
                  minMax: true,
                },
              }}
              {...props}
            />
          </styled.div>
        )
      },
    },
    {
      props: { label: 'Multi line 30', valueFormat: 'number-dollar' },
      customRenderer: (props) => {
        return (
          <styled.div
            style={{
              width: 600,
              height: 364,
              marginBottom: 24,
            }}
          >
            <LineGraph
              data={{
                line1: {
                  data: genRandomPoints(
                    (i) => ({
                      x: i,
                      y: ~~(Math.random() * 100000) + i * 100,
                    }),
                    0,
                    30
                  ),
                  fill: true,
                  color: 'magenta',
                },
                line2: {
                  data: genRandomPoints(
                    (i) => ({
                      x: i,
                      y: ~~(Math.random() * 100000) + i * 100,
                    }),
                    0,
                    30
                  ),
                },
              }}
              {...props}
            />
          </styled.div>
        )
      },
    },
    {
      props: { label: 'Multiline Scattered', valueFormat: 'number-short' },
      customRenderer: (props) => {
        return (
          <styled.div
            style={{
              width: 600,
              height: 364,
              marginBottom: 24,
            }}
          >
            <LineGraph
              data={{
                en: {
                  data: genRandomPoints(
                    (i) => ({ x: i, y: i * i + Math.random() * 1e3 }),
                    0,
                    50
                  ),
                  color: 'red',
                },
                nl: {
                  data: genRandomPoints(
                    (i) => ({ x: i, y: i * i * 1.4 + Math.random() * 1e3 }),
                    0,
                    40
                  ),
                  color: 'green',
                },
                de: {
                  data: genRandomPoints(
                    (i) => ({ x: i, y: i * i * 1.2 + Math.random() * 1e3 }),
                    10,
                    50
                  ),
                },
              }}
              label="Multiline scattered"
              {...props}
            />
          </styled.div>
        )
      },
    },
    {
      props: {
        label: 'Date multiple stepsize scatteered',
        //  valueFormat: 'number-dollar',
        xFormat: 'date',
      },
      customRenderer: (props) => {
        return (
          <styled.div
            style={{
              width: 600,
              height: 364,
              marginBottom: 24,
            }}
          >
            <LineGraph
              data={{
                en: {
                  data: genRandomPoints(
                    (i) => ({
                      x: new Date('2020-1-1').getTime() + 20 * 60 * 60 * i,
                      y: Math.sin(i * 0.007) * 10 + 20 + Math.random() * 10,
                    }),
                    0,
                    2000
                  ),
                },
                pt: {
                  data: genRandomPoints(
                    (i) => ({
                      x: new Date('2020-1-1').getTime() + 20 * 60 * 60 * i,
                      y:
                        Math.sin((i + 300) * 0.007) * 10 +
                        20 +
                        Math.random() * 10,
                    }),
                    0,
                    2000
                  ),
                  color: 'teal',
                },
              }}
              {...props}
            />
          </styled.div>
        )
      },
    },
  ],
}

export default example
