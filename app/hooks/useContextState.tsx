import React, { ReactNode, FC } from 'react'
import {
  Button,
  useOverlay,
  Text,
  useContextState,
  StateProvider,
  useObjectState,
  Divider,
} from '../../src'
import { ComponentDef } from '../types'

export const positionProp = {}

const Nested: FC = () => {
  const [hello, setHello] = useContextState<number>('hello')
  const [flap, setFlap] = useContextState<number>('flap', 10)

  return (
    <div>
      <Text>
        Inside context <b>{hello}</b>
      </Text>
      <Button
        style={{ marginTop: 16, marginBottom: 16 }}
        onClick={(e) => {
          setHello(hello + 1)
        }}
      >
        Add to value
      </Button>
      <Divider />
      <Text style={{ marginTop: 32 }}>
        Other value (default) <b>{flap}</b>
      </Text>
      <Button
        style={{ marginTop: 16 }}
        onClick={(e) => {
          setFlap(flap + 1)
        }}
      >
        Add to flap
      </Button>
    </div>
  )
}

const example: ComponentDef = {
  name: 'useContextState',
  component: (props) => {
    return <div>custom</div>
  },
  description: 'State manager for certain areas of an app',
  properties: {},
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        const [obj, setObj] = useObjectState({
          hello: 0,
        })
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <StateProvider
              values={obj}
              onChange={(key, value) => {
                setObj({ [key]: value })
              }}
            >
              <Text>
                Outside of context <b>{obj.hello}</b>
              </Text>
              <Nested />
            </StateProvider>
          </div>
        )
      },
    },
  ],
}

export default example
