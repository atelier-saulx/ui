import React, { createElement } from 'react'
import { render } from 'react-dom'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'
import * as icons from '../src/icons'
import { color, vars } from '../src'
import { Viewer } from './Viewer'

const IconDns = icons.IconDns
const IconAlarmClock = icons.IconAlarmClock

console.log(typeof IconAlarmClock)

import basedConfig from '../based.json'
import { Button } from '../src/components/Button'
import { Text } from '../src/components/Text'
import { Avatar } from '../src/components/Avatar'
import { Badge } from '../src/components/Badge'
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
  // Non-semantic/Background/Orange/Strong
  // Background/Neutral/Strong
  return (
    <div
      style={{
        color: color('content', 'default', 'primary'),
        backgroundColor: color('background', 'default', 'muted'),
        padding: '16px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* <IconDns /> */}
      <Badge
        label="asdfasdf"
        color="emerald"
        subtle
        afterIcon={<IconAlarmClock />}
      />
      <Badge
        label=""
        color="warning"
        // subtle
        icon={<IconAlarmClock />}
        // afterIcon={<IconAlarmClock />}
      />
      <Badge
        label="asdfasdasdasasfasdfasdf"
        color="grape"
        subtle
        icon={<IconAlarmClock />}
        // afterIcon={<IconAlarmClock />}
      />
      <Badge
        label="asdfasdasdasasfasdfasdf"
        color="informative"
        // subtle
        icon={<IconAlarmClock />}
        afterIcon={<IconAlarmClock />}
      />
      <Avatar
        label="as"
        size="large"
        subtle
        imgsrc="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg"
      />
      <Avatar label="as" size="medium" />
      <Avatar label="as" size="small" subtle />
      <Avatar label="as" size="xsmall" />
      <Avatar
        label="as"
        size="xxsmall"
        subtle
        imgsrc="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg"
      />
      <Button
        label="Button label"
        onClick={() => console.log('yo yo')}
        icon={<IconAlarmClock />}
        style={{ marginBottom: 12 }}
        dropdownIndicator
        loading
      />
      <Button
        label="Button label"
        style={{ marginBottom: 12 }}
        icon={'IconChevronDownSmall'}
        afterIcon={IconAlarmClock}
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
        afterIcon={IconAlarmClock}
        color="neutral"
        subtle
      />
      <Button
        // ghost
        icon="IconAlert"
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
