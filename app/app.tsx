import { useRoute } from '@based/ui'
import { render } from 'react-dom'
import React, { createElement, useState } from 'react'

import based from '@based/client'
import { Provider, useQuery } from '@based/react'
import * as icons from '../src/icons'
import { color, vars } from '../src'
import basedConfig from '../based.json'
import { Button } from '../src/components/Button'
import { Text } from '../src/components/Text'
import { Avatar } from '../src/components/Avatar'
import { Previewer } from '../src/components/Previewer'
import { Badge } from '../src/components/Badge'
import { Counter } from '../src/components/Counter'
import { Center, Column } from '../src/components/Styled'
import { Status } from '../src/components/Status'
import { AlertBanner } from '../src/components/AlertBanner'
import { ModalWarning } from '../src/components/Modal/warning'
import { styled } from 'inlines'
import { Menu } from '../src/components/Menu'
import { MenuItem } from '../src/components/Menu/MenuItem'
import { Toggle } from '../src/components/Toggle'
import { Input } from '../src/components/Input/Index'
import { TestButton } from '../src/components/RadioButtons/testButton'
import { RadioButtons } from '../src/components/RadioButtons'
import { ClickableIcon } from '../src/components/ClickableIcon'
import { Checkbox } from '../src/components/Checkbox'
import { ProgressCircle } from '../src/components/ProgressCircle/ProgressCircle'

export const client = based(basedConfig)

const IconDns = icons.IconDns
const IconAlarmClock = icons.IconAlarmClock

console.log(typeof IconAlarmClock)

const App = () => {
  const route = useRoute()
  const [textVal, setTextVal] = useState('')

  const [toggle, setToggle] = useState(true)
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
      <ProgressCircle value={0.1} color="inverted" />
      <Checkbox />
      <Checkbox warning />
      <ClickableIcon icon={<IconAlarmClock />} />
      <RadioButtons
        onChange={console.log}
        data={[
          { label: 'Appeltjes', value: 'Apples', description: 'jonagold' },
          {
            label: 'Sinasapple',
            value: 'Oranges',
            description: 'oranje rond fruit',
          },
          { label: 'Banaan', value: 'Bananas', description: 'chiquita ' },
        ]}
      />
      <Toggle size="medium" active={toggle} onClick={setToggle} />
      {toggle && <Toggle />}
      <Toggle size="large" disabled active />
      <Menu
        collapse
        header={<Text style={{ marginBottom: 24 }}>Menu</Text>}
        active={route.path.page}
        onChange={(page) => route.setPath({ page })}
        data={{
          project: 'Project settings',
          general: 'General',
          Nested: {
            nested1: 'Nested item 1',
            nested2: 'Nested item 2',
          },
          Blurf: [
            {
              icon: <IconAlarmClock />,
              value: 'based',
              label: 'Based',
              onClick: () => console.log('hello'),
            },
            'Button',
          ],
        }}
        style={{ backgroundColor: 'white' }}
      />
      <MenuItem label="asdfasasdfasdfdf" active style={{ height: '40px' }}>
        asdasdasd
      </MenuItem>
      {/* <IconDns /> */}
      <Input
        type="text"
        //  pattern="[A-Za-z]{3}"
        placeholder="Input placeholder"
        onChange={(e) => setTextVal(e.target.value)}
        //    onError={(e) => console.log('aefa', e)}
        value={textVal}
      />
      <ModalWarning label="warning label" />
      <ModalWarning label="Warning label breaking" color="negative" />
      <AlertBanner color="warning" />
      <AlertBanner />
      <AlertBanner color="negative" />
      <Status color="blue" label="asdasdasdasd" />
      <Status color="blue" label="asdasdasdasd" subtle />
      <Status color="blue" label="asdasdasdasd" ghost />
      <Status color="blue" label="asdasdasdasd" subtle ghost />
      <styled.div
        style={{
          display: 'flex',
          // border: '1px solid red',
          minWidth: 'fit-content',
          minHeight: 'fit-content',
          gap: 10,
        }}
      >
        <Column>
          <Counter label={12000} />
          <Counter label={99} subtle />
        </Column>
        <Column>
          <Counter label={99} color="neutral" />
          <Counter label={99} color="neutral" subtle />
        </Column>
        <Column>
          <Counter label={99} color="brand" />
          <Counter label={99} color="brand" subtle />
        </Column>
        <Column>
          <Counter label={99} color="negative" />
          <Counter label={99} color="negative" subtle />
        </Column>
        <Column>
          <Counter label={99} color="positive" />
          <Counter label={99} color="positive" subtle />
        </Column>
        <Column>
          <Counter label={99} color="informative" />
          <Counter label={99} color="informative" subtle />
        </Column>
      </styled.div>
      <Badge
        label="asdfasdf"
        color="informative"
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
      <Previewer
        component={
          <Text size={18} color="informative">
            flappie
          </Text>
        }
        propsName="TextProps"
      />
      <Previewer
        component={<Avatar label="yollow" />}
        propsName="AvatarProps"
      />
    </div>
  )
}

render(
  <Provider client={client}>
    <App />
  </Provider>,
  document.body
)
