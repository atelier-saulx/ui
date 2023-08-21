import { DateRangeWidget, useRoute } from '@based/ui'
import { render } from 'react-dom'
import React, { useState } from 'react'
import { styled } from 'inlines'
import '../src/fonts.css'
import based from '@based/client'
import { Provider } from '../src/components/Provider'
import { color } from '../src'
import basedConfig from '../based.json'
import { Toast, useToast } from '../src/components/Toast'
import props from './props.json'

// console.log(components)

export const client = based(basedConfig)

const components = [
  {
    name: 'Button',
    properties: props.props.ButtonProps,
  },
]

const App = () => {
  const route = useRoute()
  const [textVal, setTextVal] = useState('')

  const toast = useToast()
  const notify = () => {
    toast.add(
      <Toast label="notify" type="success" description="Account created." />
    )
  }

  return (
    <styled.div
      style={{
        color: color('content', 'default', 'primary'),
        backgroundColor: color('background', 'default', 'muted'),
        padding: '16px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      xx
    </styled.div>
  )
}

render(
  <Provider client={client}>
    <App />
  </Provider>,
  document.body
)
