import { Tooltip } from './index.js'
import React from 'react'
import { Button } from '../Button/index.js'
import { IconButton } from '../IconButton/index.js'

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
}

export const OnButton = () => {
  return (
    <div style={{ display: 'flex', gap: 12, paddingTop: 24 }}>
      <Tooltip value="Send message" keyHint="Enter">
        <Button>Send message</Button>
      </Tooltip>
      <Tooltip value="Change start date">
        <Button variant="secondary">July 2, 2024</Button>
      </Tooltip>
    </div>
  )
}

export const OnIconButton = () => {
  return (
    <div style={{ display: 'flex', paddingTop: 24 }}>
      <Tooltip value="Close" keyHint="Esc">
        <IconButton variant="close" />
      </Tooltip>
    </div>
  )
}
