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
import { Slider } from '../src/components/Slider'
import { Tooltip } from '../src/components/Tooltip'
import { Provider } from '../src/components/Provider'

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
    <>
      {' '}
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
        <styled.div style={{ width: '300px' }}>
          <Slider />
          <styled.div style={{ marginBottom: '24px' }} />
          <Tooltip />
        </styled.div>

        {components.map((c) => {
          return <OverviewComponent component={c} key={c.name} />
        })}
      </styled.div>
    </>
  )
}

render(
  <Provider>
    <App />
  </Provider>,
  document.body
)
