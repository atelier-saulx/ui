import React, { FC, useState, useEffect } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { Button } from '../Button'
import { usePropState } from '../../hooks/usePropState'
import { IconClose, IconCheckLarge } from '~/icons'
import { color } from '../../varsUtilities'
import { ClickHandler } from '~/types'

// return true or false
type ConfirmationProps = {
  style?: Style
  onClick?: ClickHandler
}

export const Confirmation: FC<ConfirmationProps> = ({ style, onClick }) => {
  const [checked, setChecked] = usePropState(undefined)

  return (
    <styled.div style={{ display: 'flex', alignItems: 'center', ...style }}>
      <Text light>Apply changes?</Text>
      <Button
        icon={<IconClose />}
        size="xsmall"
        style={{
          marginLeft: '8px',
          padding: '3px',
          '&:hover': {
            backgroundColor: color('background', 'neutral', 'subtle'),
          },
          '&:active': {
            backgroundColor: color('background', 'neutral', 'muted'),
          },
        }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setChecked(false)
          onClick?.(false as any)
        }}
      />
      <Button
        icon={<IconCheckLarge />}
        size="xsmall"
        color="primary"
        style={{
          marginLeft: '8px',
          padding: '3px',
          '&:hover': {
            backgroundColor: color('background', 'neutral', 'subtle'),
          },
          '&:active': {
            backgroundColor: color('background', 'neutral', 'muted'),
          },
        }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setChecked(true)
          onClick?.(true as any)
        }}
      />
    </styled.div>
  )
}
