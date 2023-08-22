import { render } from 'react-dom'
import React from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import {
  Badge,
  border,
  Button,
  color,
  IconBolt,
  IconClipboard,
  Input,
  Menu,
  Provider,
  ScrollArea,
  Slider,
  Text,
  DatePicker,
  DateRange,
  Avatar,
  Checkbox,
  AlertBanner,
} from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import props from './props.json'
import { ComponentDef } from './types'
import { OverviewComponent } from './OverviewComponent'
import { wait } from '@saulx/utils'
import { CheckboxItem } from '../src/components/Checkbox/CheckboxItem'

export const client = based(basedConfig)
{
  /* <AlertBanner
color="warning"
label="Alert"
style={{ marginBottom: '12px' }}
/>
<AlertBanner
color="warning"
label="Alert"
action={{ label: 'ACTION', onClick: () => console.log('oppa') }}
/> */
}
const components: ComponentDef[] = [
  {
    name: 'Alert Banner',
    properties: props.props.AlertBannerProps.props,
    component: AlertBanner,
    description: 'Banners to alert',
    examples: [
      {
        color: 'negative',
        label: 'WARNING BREAKING',
      },
      {
        color: 'warning',
        label: 'Warning Resolve',
        action: { label: 'RESOLVE', onClick: () => console.log('oppa ') },
        name: 'Warning with button',
        description: 'Click to resolve',
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
        color: 'raspberry',
        children: 'sd',
        size: 'large',
        light: true,
        squared: true,
      },
      {
        color: 'aquamarine',
        children: 'F1',
        size: 'large',
        light: true,
        name: 'Solid Color Avatar',
        description: 'Rock solid',
        imgsrc: 'https://robohash.org/G2J.png?set=set1',
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
        children: 'Click me',
      },

      {
        onClick: async () => {
          await wait(1000)
        },
        color: 'primary',
        children: 'Do something async',
        name: 'Async action indicators',
        description: 'Visual indication of errors and loading state',
        light: true,
      },
      {
        color: 'alert',
        onClick: async () => {
          throw new Error('Flap!')
        },
        children: 'Throw an error!',
        size: 'small',
        light: true,
      },
      {
        children: 'System color',
        icon: () => <IconClipboard />,
        color: 'neutral',
        size: 'small',
        name: 'Colors',
        ghost: true,
      },
      {
        children: 'Bare Button',
        color: 'alert',
        size: 'xsmall',
        underline: true,
        onClick: async () => {
          await wait(1000)
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
        children: 'Hello badge',
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
        children: 'Click me',
      },

      {
        onClick: async () => {
          await wait(1000)
        },
        children: 'Do something async',
        name: 'Warning',
        description: 'Visual indication of errors ',
        warning: true,
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
        onChange: (e) => console.log(e),
      },
    ],
  },
  {
    name: 'Date Range',
    properties: props.props.DateRangeProps.props,
    description: 'Range of date picker',
    component: DateRange,
    examples: [
      {
        onChange: (e) => console.log(e),
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
        children: 'Some Text',
        weight: 300,
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
        defaultValue: 'hello world',
        placeholder: 'placeholder',
        beforeIcon: () => <IconBolt />,
        type: 'text',
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
        placeholder: 'Search & navigate',
        type: 'search',
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
        placeholder: 'Select something',
        options: [
          { label: 'Item one', value: 'value1' },
          { label: 'Item two', value: 'value2' },
          { label: 'Item three', value: 'value3' },
        ],
        type: 'select',
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
        type: 'file',
      },
    ],
  },
]

const App = () => {
  const route = useRoute('[component]')
  const component = route.query.component
  const filtered = components.filter((c) => {
    return c.name === component
  })

  return (
    <styled.div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <Menu
        // header={'HEADER'}
        data={{
          Dashboard: {
            Content: 'Content',
            Morestuff: 'morestuff',
          },
          components: components.map((c) => {
            return {
              label: c.name,
              value: c.name,
            }
          }),
        }}
        active={component}
        onChange={(v) => {
          route.setQuery({ component: v })
        }}
      />

      <ScrollArea
        style={{
          color: color('content', 'default', 'primary'),
          backgroundColor: color('background', 'default', 'muted'),
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '24px',
          paddingBottom: '24px',
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        {filtered.map((c) => {
          return <OverviewComponent component={c} key={c.name} />
        })}
      </ScrollArea>
    </styled.div>
  )
}

render(
  <Provider>
    <App />
  </Provider>,
  document.body
)
