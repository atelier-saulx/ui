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
} from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import props from './props.json'
import { ComponentDef } from './types'
import { OverviewComponent } from './OverviewComponent'

export const client = based(basedConfig)

const components: ComponentDef[] = [
  {
    name: 'Avatar',
    properties: props.props.ButtonProps.props,
    component: Avatar,
    description: 'Simple Avatar component',
    examples: [
      {
        color: 'raspberry',
        label: 's',
        size: 'large',
        subtle: true,
        squared: true,
      },
      {
        color: 'raspberry',
        label: 's',
        size: 'large',
        subtle: false,
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
        children: 'Ghost',
        icon: () => <IconClipboard />,
        color: 'system',
        name: 'Ghost',
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
        header={'Components'}
        data={components.map((c) => {
          return {
            label: c.name,
            value: c.name,
          }
        })}
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
