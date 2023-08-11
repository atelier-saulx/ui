import React, { createElement } from 'react'
import { render } from 'react-dom'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'
import * as icons from '../src/icons'
import { color, vars } from '../src'
import { Viewer } from './Viewer'

const IconDns = icons.IconDns

import basedConfig from '../based.json'
export const client = based(basedConfig)

const App = () => {
  // const children: any = []

  // for (const name in icons) {
  //   children.push(
  //     <div
  //       style={{
  //         padding: 10,
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         borderRadius: 10,
  //         color: color('content', 'invertedPrimary'),
  //       }}
  //     >
  //       {createElement(icons[name])}
  //     </div>
  //   )
  // }
  // return (
  //   <div
  //     style={{
  //       padding: 10,
  //       gap: 10,
  //       width: 'calc(100vw - 20px)',
  //       overflow: 'hidden',
  //       flexWrap: 'wrap',
  //       display: 'flex',
  //     }}
  //   >
  //     {children}
  //   </div>
  // )

  return (
    <div
      style={{
        fontFamily: 'SF Pro',
        fontWeight: '500',
        color: color('content', 'default', 'primary'),
        backgroundColor: color('action', 'primary', 'normal'),
      }}
    >
      <IconDns />
    </div>
  )
}

render(
  <Provider client={client}>
    <App />
  </Provider>,
  document.body
)
