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
        style: { width: 500, [BpTablet]: { width: 'unset' } },
        valueFormat: 'number-dollar',
        direction: 'vertical',
        barWidth: 24,
        showAxis: true,
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
          {
            label: 'Show 3',
            value: { netherlands: 1342, deutschland: 1688, belgium: 2838 },
          },
        ],
      },
    },
    {
      props: {
        style: { width: 400, [BpTablet]: { width: 'unset' } },
        valueFormat: 'number-euro',
        direction: 'vertical',
        showAxis: true,
        stacked: true,
        spacing: 24,
        data: [
          {
            label: 'Show 1',
            value: { en: 2342, nl: 444, de: 5464, ch: 19434, be: 666 },
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
        barWidth: 42,
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
            barWidth: 20,
          },
          {
            label: 'Owls 🦉',
            value: 962000,
            color: 'blue',
            barWidth: 188,
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
        // showAxis: true,
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
        showAxis: true,
        spacing: 32,
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
        showAxis: true,
        barWidth: 100,
        data: [
          {
            label: 'Moose 🦆',
            value: 160000,
            color: 'blue',
            barWidth: 24,
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
