import {} from '@based/ui'
import { render } from 'react-dom'
import React from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import { color, Button, Badge, IconClipboard, Text, Input } from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import props from './props.json'
import { ComponentDef } from './types'
import { OverviewComponent } from './OverviewComponent'
import { DatePicker } from '../src/components/DatePicker'
import { DateRange } from '../src/components/DateRange'

export const client = based(basedConfig)

const components: ComponentDef[] = [
  {
    name: 'Date Picker',
    properties: props.props.DatePickerProps.props,
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
    component: DateRange,
    examples: [
      {
        onChange: (e) => console.log(e),
      },
    ],
  },
  {
    name: 'Button',
    properties: props.props.ButtonProps.props,
    component: Button,
    examples: [
      {
        children: 'Click me',
      },
      {
        children: 'Click me',
        icon: () => <IconClipboard />,
        color: 'system',
      },
    ],
  },
  {
    name: 'Badge',
    properties: props.props.BadgeProps.props,
    component: Badge,
    examples: [
      {
        children: 'Hello badge',
      },
    ],
  },
  {
    name: 'Text',
    component: Text,
    properties: props.props.TextProps.props,
    examples: [
      {
        children: 'Some Text',
        weight: 300,
      },
    ],
  },
  {
    name: 'Input',
    component: Input,
    properties: props.props.InputProps.props,
    examples: [
      {
        value: 'Some Text',
        type: 'text',
      },
    ],
  },
]

const App = () => {
  const route = useRoute()

  return (
    <styled.div
      style={{
        flexWrap: 'wrap',
        color: color('content', 'default', 'primary'),
        backgroundColor: color('background', 'default', 'muted'),
        padding: '100px',
        display: 'flex',
        gap: '64px',
        justifyContent: 'center',
      }}
    >
      {components.map((c) => {
        return <OverviewComponent component={c} key={c.name} />
      })}
    </styled.div>
  )
}

render(<App />, document.body)
