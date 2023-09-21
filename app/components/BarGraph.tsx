import { BarGraph, BpTablet } from '../../src'

import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'BarGraph',
  // TODO yves change these props
  properties: props.props.BarGraphProps.props,
  component: BarGraph,
  description: '100 bars for breakfast',
  examples: [
    {
      props: {
        color: 'green',
        style: { width: 540, [BpTablet]: { width: 'unset' } },
        format: 'number-euro',
        data: [
          {
            label: 'Moose 🦆',
            value: 160000,
            // color: 'violet',
          },
          {
            label: 'Caribou 🦌',
            value: 576000,
          },
          {
            label: 'Bears 🐻',
            value: 43000,
            // color: 'green',
          },
          {
            label: 'Wolves 🐺',
            value: 62000,
            // color: 'blue',
          },
        ],
      },
    },
    {
      props: {
        style: { width: 540, [BpTablet]: { width: 'unset' } },
        direction: 'vertical',
        data: [
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
      },
    },
  ],
}

export default example
