import React from 'react'
import { MetricsWidget } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'MetricsWidget',
  // TODO  yves ,change to LogsProps once genprops works again
  properties: props.props.ModalProps.props,
  description: '',
  component: MetricsWidget,
  examples: [
    {
      props: {},
      customRenderer: () => {
        // generate some random data
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

        const testData = {
          technology: genRandomPoints(
            (i) => ({ x: i, y: ~~(Math.random() * 10) + i * 100 }),
            0,
            50
          ),
          science: genRandomPoints(
            (i) => ({ x: i, y: ~~(Math.random() * 10) + i * 100 }),
            0,
            100
          ),
          'Alaskan wildlife': [
            {
              label: 'Moose 🦆',
              value: 160000,
            },
            {
              label: 'Caribou 🦌',
              value: 576000,
            },
            {
              label: 'Bears 🐻',
              value: 43000,
            },
            {
              label: 'Wolves 🐺',
              value: 62000,
            },
          ],
          pietest: [
            {
              label: 'Yes sure if you like ugly shit',
              value: 1280,
            },
            {
              label: 'No sorry',
              value: 637,
            },
            {
              label: 'What logo?',
              value: 146,
            },
            {
              label: 'Mmm ?',
              value: 126,
            },
          ],
        }
        //todo fix type
        return <MetricsWidget label="Technology" data={testData} style={{}} />
      },
    },
  ],
}

export default example
