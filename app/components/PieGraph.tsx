import React from 'react'
import { PieGraph } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'PieGraph',
  properties: props.props.PieGraphProps.props,
  component: PieGraph,
  description: '',
  examples: [
    {
      props: {
        format: 'number-bytes',
      },
      customRenderer: (props) => {
        const data = [
          {
            label: 'Apples',
            value: 25455,
            color: 'violet',
          },
          {
            label: 'Sugar',
            value: 5484,
            color: 'magenta',
          },
          {
            label: 'Flour',
            value: 2566,
            color: 'grey',
          },
          {
            label: 'Cinnamon',
            value: 2566,
            color: 'blue',
          },
        ]

        const advancedPieData = [
          {
            label: 'Some countries',
            value: { en: 675, de: 200, nl: 600 },
            color: '#BADA55',
          },
          {
            label: 'More data',
            value: { en: 275, de: 600, nl: 50 },
          },
          {
            label: 'What logo?',
            value: { ax: 75, bc: 201, qr: 30 },
            color: '#0000ff',
          },
          {
            label: 'more data',
            value: { en: 70, de: 201, nl: 130 },
            color: '#ff8a00',
          },
        ]

        return <PieGraph data={data} {...props} />
      },
    },
  ],
}

export default example
