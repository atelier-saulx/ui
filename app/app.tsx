import { render } from 'react-dom'
import React, { FC } from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import { color, Menu, Provider, ScrollArea, Toggle } from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import { OverviewComponent } from './OverviewComponent'
import { components } from './components'

export const client = based(basedConfig)

const App = () => {
  const route = useRoute('[component]')
  const component = route.query.component
  const filtered = components.filter((c) => {
    return c.name === component
  })
  // const toast = useToast()
  // const amount = toast.useCount()
  // const notify = () => {
  //   toast.add(
  //     <Toast
  //       color="informative"
  //       label="Toastable"
  //       strong
  //       closeable
  //       action={{ label: 'ACTION', onClick: () => console.log('oppa') }}
  //     >
  //       Bonjour dudes <br /> yo test
  //     </Toast>
  //   )
  // }

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
