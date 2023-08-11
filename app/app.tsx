import React, { createElement } from 'react'
import { render } from 'react-dom'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'
import * as icons from '../src/icons'
import { color } from '../src'

const IconDns = icons.IconDns

import basedConfig from '../based.json'
export const client = based(basedConfig)

const App = () => {
  const children: any = []

  console.info(color('content', 'invertedPrimary'))

  for (const name in icons) {
    children.push(
      <div
        style={{
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          color: color('content', 'invertedPrimary'),
          background: color('action', 'primary'),
        }}
      >
        {createElement(icons[name])}
      </div>
    )
  }
  return (
    <div
      style={{
        padding: 10,
        gap: 10,
        width: 'calc(100vw - 20px)',
        overflow: 'hidden',
        flexWrap: 'wrap',
        display: 'flex',
        // backgroundColor: color('action', 'primary'),
      }}
    >
      {children}
    </div>
  )
}

render(
  <Provider client={client}>
    <App />
  </Provider>,
  document.body
)
