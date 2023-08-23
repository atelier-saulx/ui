import React from 'react'
import '../src/fonts.css'
import {
  Badge,
  Button,
  IconBolt,
  IconClipboard,
  Input,
  Text,
  DatePicker,
  DateRange,
  Avatar,
  Checkbox,
  AlertBanner,
  Slider,
  Toggle,
} from '../src'
import * as ui from '../src'
import props from './props.json'
import { ComponentDef } from './types'
import { wait } from '@saulx/utils'
import { Icon } from '../src/icons/Icon'

export const components: ComponentDef[] = [
  {
    name: 'Alert Banner',
    properties: props.props.AlertBannerProps.props,
    component: AlertBanner,
    description: 'Banners to alert',
    examples: [
      {
        props: {
          color: 'negative',
          label: 'WARNING BREAKING',
        },
      },
      {
        props: {
          color: 'warning',
          label: 'Warning Resolve',
          action: { label: 'RESOLVE', onClick: () => console.log('oppa ') },
          name: 'Warning with button',
          description: 'Click to resolve',
        },
      },
    ],
  },
  {
    name: 'Avatar',
    properties: props.props.AvatarProps.props,
    component: Avatar,
    description: 'Simple Avatar component',
    examples: [
      {
        props: {
          color: 'raspberry',
          children: 'sd',
          size: 'large',
          light: true,
          squared: true,
        },
      },
      {
        name: 'Solid Color Avatar',
        description: 'Rock solid',
        props: {
          color: 'aquamarine',
          children: 'F1',
          size: 'large',
          light: true,
          imgsrc: 'https://robohash.org/G2J.png?set=set1',
        },
      },
    ],
  },
  {
    name: 'Icon',
    properties: props.props.IconProps.props,
    component: Icon,
    description: 'Icons are generated from figma directly',
    examples: [
      {
        name: 'Large Icons',
        customRenderer: (props) => {
          const icons = []
          for (const key in ui) {
            if (key.startsWith('Icon') && !key.startsWith('IconSmall')) {
              icons.push(
                // @ts-ignore
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    width: 300,
                    alignItems: 'center',
                  }}
                >
                  {React.createElement(ui[key], props)}
                  <Text light style={{ marginLeft: 20 }}>
                    {key}
                  </Text>
                </div>
              )
            }
          }
          return (
            <div
              style={{
                gap: 12,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {icons}
            </div>
          )
        },
        props: {
          color: 'brand',
        },
      },
      {
        name: 'Small icons',
        customRenderer: (props) => {
          const icons = []
          for (const key in ui) {
            if (key.startsWith('IconSmall')) {
              icons.push(
                // @ts-ignore
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    width: 300,
                    alignItems: 'center',
                  }}
                >
                  {React.createElement(ui[key], props)}
                  <Text light style={{ marginLeft: 20 }}>
                    {key}
                  </Text>
                </div>
              )
            }
          }
          return (
            <div
              style={{
                gap: 12,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {icons}
            </div>
          )
        },
        props: {
          color: 'brand',
        },
      },
      {
        name: 'Clickable Icon',
        description:
          'When onClick is provided will add a hover state and larger hitbox',
        customRenderer: IconBolt,
        props: {
          onClick: () => {
            alert('bla')
          },
        },
      },
    ],
  },
  {
    name: 'Button',
    properties: props.props.ButtonProps.props,
    component: Button,
    description: 'Simple button component',
    examples: [
      {
        props: {
          children: 'Click me',
        },
      },

      {
        name: 'Async action indicators',
        description: 'Visual indication of errors and loading state',
        props: {
          onClick: async () => {
            await wait(5000)
          },
          color: 'primary',
          children: 'Do something async',

          light: true,
        },
      },
      {
        props: {
          color: 'alert',
          onClick: async () => {
            throw new Error('Flap!')
          },
          children: 'Throw an error!',
          size: 'small',
          light: true,
        },
      },
      {
        name: 'Colors',
        props: {
          children: 'System color',
          icon: () => <IconClipboard />,
          color: 'neutral',
          size: 'small',
          ghost: true,
        },
      },
      {
        props: {
          children: 'Bare Button',
          color: 'alert',
          size: 'xsmall',
          underline: true,
          onClick: async () => {
            await wait(1000)
          },
        },
      },
    ],
  },
  {
    name: 'Badge',
    properties: props.props.BadgeProps.props,
    component: Badge,
    description: 'Badge component',
    examples: [
      {
        props: {
          children: 'Hello badge',
          color: 'informative',
          light: false,
        },
      },
    ],
  },
  {
    name: 'Checkbox',
    properties: props.props.CheckboxProps.props,
    component: Checkbox,
    description: 'Simple checkbox component',
    examples: [
      {
        props: {
          children: 'Click me',
        },
      },

      {
        props: {
          onClick: async () => {
            await wait(1000)
          },
          warning: true,
          children: 'Do something async',
        },
        name: 'Warning',
        description: 'Visual indication of errors ',
      },
    ],
  },
  {
    name: 'Date Picker',
    properties: props.props.DatePickerProps.props,
    description: 'Single day picker',
    component: DatePicker,
    examples: [
      {
        props: { onChange: (e) => console.log(e) },
      },
    ],
  },
  {
    name: 'Date Range',
    properties: {}, // props.props.DateRangeProps.props,
    description: 'Range of date picker',
    component: DateRange,
    examples: [
      {
        props: { onChange: (e) => console.log(e) },
      },
    ],
  },
  {
    name: 'FileInput',
    component: Input,
    description: 'Single file input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          type: 'file',
        },
      },
    ],
  },
  {
    name: 'Slider',
    component: Slider,
    description: 'Range Slider',
    properties: props.props.SliderProps.props,
    examples: [
      {
        props: {
          items: [
            { id: 'flip', title: 'Flippie', index: 0 },
            { id: 'flap', title: 'Flap', index: 1 },
            { id: 'Flurp', title: 'Flupr', index: 2 },
          ],
        },
      },
      {
        props: {
          min: 0,
          max: 60,
          steps: 5,
          onChange: (v) => console.log(v),
          color: 'alert',
        },
      },
    ],
  },
  {
    name: 'SearchInput',
    component: Input,
    description: 'Text Input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          placeholder: 'Search & navigate',
          type: 'search',
        },
      },
    ],
  },
  {
    name: 'SelectInput',
    component: Input,
    description: 'Select input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          placeholder: 'Select something',
          options: [
            { label: 'Item one', value: 'value1' },
            { label: 'Item two', value: 'value2' },
            { label: 'Item three', value: 'value3' },
          ],
          type: 'select',
        },
      },
    ],
  },
  {
    name: 'Text',
    component: Text,
    description: 'Text including typeography',
    properties: props.props.TextProps.props,
    examples: [
      {
        props: {
          children: 'Some Text',
          weight: 'medium',
        },
      },
    ],
  },
  {
    name: 'TextInput',
    component: Input,
    description: 'Text Input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          defaultValue: 'hello world',
          placeholder: 'placeholder',
          beforeIcon: () => <IconBolt />,
          type: 'text',
        },
      },
    ],
  },
  {
    name: 'Toggle',
    component: Toggle,
    description: 'Toggle button',
    properties: props.props.ToggleProps.props,
    examples: [
      {
        props: {
          size: 'large',
          active: true,
          disabled: false,
        },
      },
      {
        props: {
          size: 'medium',
          active: true,
          onClick: (v) => console.log(v),
          color: 'neutral',
        },
      },
    ],
  },
]
