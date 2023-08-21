import {} from '@based/ui'
import { render } from 'react-dom'
import React from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import { color, Button, Badge, IconClipboard, Text } from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import props from './props.json'
import { ComponentDef } from './types'
import { OverviewComponent } from './OverviewComponent'

export const client = based(basedConfig)

const components: ComponentDef[] = [
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
]

const App = () => {
  const route = useRoute()

  return (
    <styled.div
      style={{
        flexWrap: 'wrap',
        color: color('content', 'default', 'primary'),
        backgroundColor: color('background', 'default', 'muted'),
        padding: '16px 32px',
        display: 'flex',
        gap: '10px',
      }}
    >
      {components.map((c) => {
        return <OverviewComponent component={c} key={c.name} />
      })}
    </styled.div>
  )
}

render(<App />, document.body)
