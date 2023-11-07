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
        valueFormat: 'percentages',
        legend: true,
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
        return <PieGraph data={data} {...props} />
      },
    },
    {
      props: {
        valueFormat: 'number-euro',
      },
      customRenderer: (props) => {
        const data = [
          {
            value: 3,
            label: 'groep 1',
          },
          {
            value: 4,
            label: 'groep 2',
          },
        ]

        return <PieGraph data={data} {...props} />
      },
    },
  ],
}

export default example
