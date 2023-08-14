import React, { createElement } from 'react'
import { render } from 'react-dom'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'
import * as icons from '../src/icons'
import { color, vars } from '../src'
import { Viewer } from './Viewer'

const IconDns = icons.IconDns
const IconAlarmClock = icons.IconAlarmClock

import basedConfig from '../based.json'
import { Button } from './components/Button'
import { Text } from './components/Text'
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
        color: color('content', 'default', 'primary'),
        backgroundColor: color('background', 'default', 'muted'),
        padding: '16px 32px',
      }}
    >
      <IconDns color="inverted" />

      <Button
        label="Button label"
        onClick={() => console.log('yo yo')}
        beforeIcon={<IconAlarmClock />}
        style={{ marginBottom: 12 }}
        dropdownIndicator
        loading
      />
      <Button
        label="Button label"
        style={{ marginBottom: 12 }}
        // beforeIcon={<IconAlarmClock />}
        afterIcon={<IconAlarmClock />}
        // dropdownIndicator
        // disabled
        // loading
        // subtle
      />
      <Button
        label="Button label"
        size="medium"
        color="alert"
        subtle
        style={{ marginBottom: 12 }}
      />
      <Button
        label="Button label"
        size="medium"
        style={{ marginBottom: 12 }}
        afterIcon={<IconAlarmClock />}
        color="neutral"
        subtle
      />
      <Button
        // ghost
        beforeIcon={<IconAlarmClock />}
        label="Button label"
        size="small"
        disabled
        onClick={() => console.log('flippien')}
      />
      <Text color="informative">hellwo</Text>
    </div>
  )
}

render(
  <Provider client={client}>
    <App />
  </Provider>,
  document.body
)
