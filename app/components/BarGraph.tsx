import { BarGraph, BpTablet } from '../../src'

import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'BarGraph',
  properties: props.props.BarGraphProps.props,
  component: BarGraph,
  description: '100 bars for breakfast',
  examples: [
    {
      props: {
        color: 'green',
        style: { width: 400, [BpTablet]: { width: 'unset' } },
        valueFormat: 'number-euro',
        // direction: 'vertical',
        nested: true,
        // barWidth: 34,
        spacing: 8,
        data: [
          {
            label: 'Show 1',
            value: { en: 2342, nl: 444, de: 5464, ch: 9434, be: 666 },
          },
          {
            label: 'Show 2',
            value: { nl: 1342, de: 688, be: 4888 },
          },
        ],
      },
    },
    {
      props: {
        color: 'green',
        style: { width: 400, [BpTablet]: { width: 'unset' } },
        valueFormat: 'number-euro',
        // direction: 'vertical',
        stacked: true,
        spacing: 24,
        data: [
          {
            label: 'Show 1',
            value: { en: 2342, nl: 444, de: 5464, ch: 9434, be: 666 },
            color: 'violet',
          },
          {
            label: 'Show 2',
            value: { en: 1342, nl: 688, de: 4888 },
            color: 'magenta',
          },
        ],
      },
    },
    {
      props: {
        style: { width: 540, [BpTablet]: { width: 'unset' } },
        direction: 'vertical',
        barWidth: 6,
        color: 'violet',
        data: [
          {
            label: 'Moose 🦆',
            value: 160000,
            color: 'green',
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
          {
            label: 'Owls 🦉',
            value: 962000,
            color: 'blue',
          },
          {
            label: 'Gorillas 🦍',
            value: 57839,
          },
          {
            label: 'Chipmunks 🐿',
            value: 255000,
          },
          {
            label: 'Cows 🐄',
            value: 90000,
          },
        ],
      },
    },
    {
      props: {
        color: 'green',
        style: { width: 540, [BpTablet]: { width: 'unset' } },
        valueFormat: 'number-euro',
        data: [
          {
            label: 'Moose 🦆',
            value: 160000,
            color: 'violet',
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
            color: 'blue',
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
            color: 'green',
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
    {
      props: {
        style: { width: 540, [BpTablet]: { width: 'unset' } },
        barWidth: 100,
        data: [
          {
            label: 'Moose 🦆',
            value: 160000,
            color: 'blue',
          },
          {
            label: 'Caribou 🦌',
            value: 576000,
            color: 'orange',
          },
          {
            label: 'Bears 🐻',
            value: 43000,
            color: 'red',
          },
        ],
      },
    },
  ],
}

export default example
