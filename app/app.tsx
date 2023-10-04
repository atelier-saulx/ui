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
import { components, hooks } from './examples'
import { ThemeSwitch } from './ThemeSwitch'
import { BasedLogo } from '../src/icons/BasedLogo'

export const client = based(basedConfig)

const App = () => {
  const route = useRoute('[component]')
  const component = route.query.component
  const filtered = [...components, ...hooks].filter((c) => {
    return c.name === component
  })
  const [filter, setFilter] = useState('')

  console.log(components)

  // basic elements
  const basics = components
    .filter((c) => {
      if (c.name === 'Text' || c.name === 'Button') {
        return { label: c.name, value: c.name }
      }
    })
    .map((c) => {
      return { label: c.name, value: c.name }
    })

  // layout
  const layout = components
    .filter((c) => {
      if (
        c.name === 'Accordion' ||
        c.name === 'Container' ||
        c.name === 'Divider' ||
        c.name === 'Tabs' ||
        c.name === 'ScrollArea'
      ) {
        return { label: c.name, value: c.name }
      }
    })
    .map((c) => {
      return { label: c.name, value: c.name }
    })

  // data display
  const dataDisplay = components
    .filter((c) => {
      if (
        c.name === 'BarGraph' ||
        c.name === 'PieGraph' ||
        c.name === 'LineGraph' ||
        c.name === 'Table' ||
        c.name === 'NewTable' ||
        c.name === 'MetricsWidget'
      ) {
        return { label: c.name, value: c.name }
      }
    })
    .map((c) => {
      return { label: c.name, value: c.name }
    })

  // feedback
  const feedback = components
    .filter((c) => {
      if (
        c.name === 'Alert Banner' ||
        c.name === 'Avatar' ||
        c.name === 'Badge' ||
        c.name === 'Counter' ||
        c.name === 'Status' ||
        c.name === 'Thumbnail' ||
        c.name === 'Toast' ||
        c.name === 'Tooltip'
      ) {
        return { label: c.name, value: c.name }
      }
    })
    .map((c) => {
      return { label: c.name, value: c.name }
    })
  // forms
  const forms = components
    .filter((c) => {
      if (
        c.name === 'CheckboxInput' ||
        c.name === 'Code Editor' ||
        c.name === 'Color Input' ||
        c.name === 'Date Picker' ||
        c.name === 'Date Range' ||
        c.name === 'FileInput' ||
        c.name === 'NumberInput' ||
        c.name === 'Radiobuttons' ||
        c.name === 'SearchInput' ||
        c.name === 'Slider' ||
        c.name === 'SelectInput' ||
        c.name === 'TextAreaInput' ||
        c.name === 'TextInput' ||
        c.name === 'Toggle'
      ) {
        return { label: c.name, value: c.name }
      }
    })
    .map((c) => {
      return { label: c.name, value: c.name }
    })

  // navigation
  const navigation = components
    .filter((c) => {
      if (
        c.name === 'Menu' ||
        c.name === 'Breadcrumbs' ||
        c.name === 'Top Navigation'
      ) {
        return { label: c.name, value: c.name }
      }
    })
    .map((c) => {
      return { label: c.name, value: c.name }
    })

  const icon = components
    .filter((c) => {
      if (c.name === 'Icon') {
        return { label: c.name, value: c.name }
      }
    })
    .map((c) => {
      return { label: c.name, value: c.name }
    })

  // just to filter out the names that are allready in categorys
  let basicsArray = basics.map((item) => Object.values(item)[0])
  let formsArray = forms.map((item) => Object.values(item)[0])
  let layoutArray = layout.map((item) => Object.values(item)[0])
  let dataDisplayArray = dataDisplay.map((item) => Object.values(item)[0])
  let navigationArray = navigation.map((item) => Object.values(item)[0])
  let feedbackArray = feedback.map((item) => Object.values(item)[0])
  let iconArray = icon.map((item) => Object.values(item)[0])

  const restOfComponents = components
    .filter((c) => !basicsArray.includes(c.name))
    .filter((c) => !formsArray.includes(c.name))
    .filter((c) => !layoutArray.includes(c.name))
    .filter((c) => !dataDisplayArray.includes(c.name))
    .filter((c) => !navigationArray.includes(c.name))
    .filter((c) => !feedbackArray.includes(c.name))
    .filter((c) => !iconArray.includes(c.name))
    .filter(
      (c) => !filter || c.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((c) => {
      return {
        label: c.name,
        value: c.name,
      }
    })

  // basics
  // content
  // layout
  // controls // interaction // forms
  // feedback
  // navigation
  // data display

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
        data={{
          basics: basics,
          ['Data Display']: dataDisplay,
          feedback: feedback,
          forms: forms,
          icons: icon,
          layout: layout,
          navigation: navigation,
          misc: restOfComponents,

          // components: components
          //   .filter(
          //     (c) =>
          //       !filter || c.name.toLowerCase().includes(filter.toLowerCase())
          //   )
          //   .map((c) => {
          //     return {
          //       label: c.name,
          //       value: c.name,
          //     }
          //   }),
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
