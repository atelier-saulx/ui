import React, { createElement } from 'react'
import { render } from 'react-dom'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'
import * as icons from '../src/icons'
import { color } from '../src'

import basedConfig from '../based.json'
export const client = based(basedConfig)

const App = () => {
  const children: any = []

  for (const name in icons) {
    children.push(
      <div
        style={{
          margin: 20,
          // background: 'black',
        }}
      >
        {/* <div>{name}</div> */}
        {createElement(icons[name])}
      </div>
    )
  }
  return (
    <div
      style={{
        width: '100%',
        flexWrap: 'wrap',
        display: 'flex',
        backgroundColor: color('global', 'emerald', -8),
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
