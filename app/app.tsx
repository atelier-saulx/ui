import '../src/colors.css'
import { render } from 'react-dom'
import React, { useState } from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import {
  color,
  Menu,
  Input,
  Provider,
  ScrollArea,
  BpMobile,
  RowSpaced,
} from '../src'
import { useRoute } from 'kabouter'
import basedConfig from '../based.json'
import { OverviewComponent } from './OverviewComponent'
import {
  layout,
  hooks,
  navigation,
  display,
  feedback,
  icons,
  input,
  overlay,
  graphs,
  misc,
} from './examples'
import { ThemeSwitch } from './ThemeSwitch'
import { BasedLogo } from '../src/icons/BasedLogo'
import { useQuery } from '@based/react'

export const client = based(basedConfig)

const App = () => {
  const route = useRoute('[component]')
  const component = route.query.component
  const filtered = [
    ...layout,
    ...hooks,
    ...navigation,
    ...display,
    ...feedback,
    ...icons,
    ...input,
    ...overlay,
    ...misc,
    ...graphs,
  ].filter((c) => {
    return c.name === component
  })

  const [filter, setFilter] = useState('')

  const filterThis = (comp) => {
    let a = comp
      .filter(
        (c) => !filter || c.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((c) => {
        return {
          label: c.name,
          value: c.name,
        }
      })

    return a
  }

  return (
    <styled.div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Menu
        // shrinkable
        mobileAllowed
        collapse
        header={
          <styled.div style={{ marginBottom: 16, width: '100%' }}>
            <RowSpaced style={{ marginLeft: 8 }}>
              <BasedLogo />
              <ThemeSwitch />
            </RowSpaced>
            <Input
              value={filter}
              type="search"
              style={{ width: '100%', marginTop: 24 }}
              placeholder="Filter..."
              onChange={(v) => {
                setFilter(v)
              }}
            />
          </styled.div>
        }
        config={{
          display: filterThis(display),
          feedback: filterThis(feedback),
          input: filterThis(input),
          layout: filterThis(layout),
          icons: filterThis(icons),
          navigation: filterThis(navigation),
          overlays: filterThis(overlay),
          misc: filterThis(misc),
          graphs: filterThis(graphs),
          hooks: filterThis(hooks),
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
          [BpMobile]: {
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
        {filtered.map((c) => {
          return <OverviewComponent component={c} key={c.name} />
        })}
      </ScrollArea>
    </styled.div>
  )
}

render(
  <Provider client={client}>
    <App />
  </Provider>,
  document.getElementById('root')
)
