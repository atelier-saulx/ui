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
    <Tooltip value="Send message" keyHint="Enter">
      <Button>Send message</Button>
    </Tooltip>
  )
}

export const OnIconButton = () => {
  return (
    <Tooltip value="Close" keyHint="Esc">
      <IconButton variant="close" />
    </Tooltip>
  )
}
