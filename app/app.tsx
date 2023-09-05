import { render } from 'react-dom'
import React, { FC, useEffect, useState } from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import {
  color,
  IconRefresh,
  Menu,
  Provider,
  ScrollArea,
  useTooltip,
} from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import { OverviewComponent } from './OverviewComponent'
import { components } from './components'
import { Button } from '../src'

export const client = based(basedConfig)

const App = () => {
  const route = useRoute('[component]')
  const component = route.query.component
  const filtered = components.filter((c) => {
    return c.name === component
  })

  const toolTipLocalStorageBtn = useTooltip(
    'Clear localstorage',
    'bottom-right'
  )

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
        header={
          <Button
            color="system"
            icon={<IconRefresh />}
            onClick={() => localStorage.clear()}
            size="small"
            style={{ marginBottom: 16 }}
            {...toolTipLocalStorageBtn}
          />
        }
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
          hooks: {},
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
