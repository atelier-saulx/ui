import '../src/colors.css'

import { render } from 'react-dom'
import React, { useState } from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import { color, Menu, Input, Provider, ScrollArea } from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import { OverviewComponent } from './OverviewComponent'
import { components, hooks } from './examples'
import { ThemeSwitch } from './ThemeSwitch'

export const client = based(basedConfig)

const App = () => {
  const route = useRoute('[component]')
  const component = route.query.component
  const filtered = [...components, ...hooks].filter((c) => {
    return c.name === component
  })
  const [filter, setFilter] = useState('')
  const [value, setValue] = useState(false)

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
                justifyContent: 'end',
              }}
            >
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
          hooks: hooks
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
        {/* <Dropdown
          data={[
            { label: 'Option uno', icon: () => <IconEmojiSmile /> },
            { label: 'Option dos', icon: () => <IconEmojiSmile /> },
            {
              label: 'Option trois',
              type: 'checkbox',
              value: value,
              onChange: () => setValue(!value),
            },
            // { label: 'Option trois', type: 'radio', value: false },
            {
              label: 'Option more',
              icon: () => <IconEmojiSmile />,
              caption: 'More',
              data: [
                { label: 'SubOption 1' },
                {
                  label: 'SubOption 2',
                  type: 'checkbox',
                  value: value,
                  onChange: () => setValue(!value),
                },
                {
                  label: 'SubOption 3',
                  caption: 'Caption',
                  data: [
                    { label: 'SupperdeSup 1' },
                    { label: 'SupperdeSup 2' },
                  ],
                },
              ],
            },
          ]}
        /> */}
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
