import '../src/colors.css'

import { render } from 'react-dom'
import React, { useState } from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import {
  color,
  IconRefresh,
  Menu,
  Input,
  Provider,
  ScrollArea,
  useTooltip,
} from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import { OverviewComponent } from './OverviewComponent'
import { components } from './examples'
import { ThemeSwitch } from './ThemeSwitch'
import { BpTablet } from '../src/utils/breakpoints'

export const client = based(basedConfig)

const App = () => {
  const route = useRoute('[component]')
  const component = route.query.component
  const filtered = components.filter((c) => {
    return c.name === component
  })
  const [filter, setFilter] = useState('')

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
          <styled.div style={{ marginBottom: 16 }}>
            <styled.div
              style={{
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconRefresh
                style={{ marginRight: 8 }}
                color="brand"
                onClick={() => localStorage.clear()}
              />
              <ThemeSwitch />
            </styled.div>
            <Input
              value={filter}
              type="search"
              style={{ width: 220 }}
              placeholder="Filter..."
              onChange={(v) => {
                setFilter(v)
              }}
            />
          </styled.div>
        }
        data={{
          components: components
            .filter(
              (c) =>
                !filter || c.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((c) => {
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
          [BpTablet]: {
            paddingLeft: '0px',
            paddingRight: '0px',
          },
          paddingTop: '24px',
          paddingBottom: '24px',
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        {/* <Log
          data={{ time: 122212, type: 'error', log: 'thissucks' }}
          logs={'asd'}
          service={'env-db'}
          filter={false}
          multi={false}
          index={0}
        /> */}
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
  document.getElementById('root')
)
