import React, { FC, ReactNode } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { IconSmallClose } from '../../icons'
import { ColorActionColors } from '../../varsTypes'
import { ClickHandler } from '../../types'
import { BpTablet } from '../../utils/breakpoints'

export type TagProps = {
  color?: ColorActionColors
  disabled?: boolean
  onClick?: ClickHandler
  onClose?: () => void
  children?: ReactNode
  style?: Style
}

export const Tag: FC<TagProps> = ({
  color = 'neutral',
  disabled,
  onClick,
  onClose,
  children,
  style,
}) => {
  return (
    <styled.div
      onClick={onClick}
      style={{
        backgroundColor: genColor('action', color, 'subtleNormal'),
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
        padding: '0px 8px',
        pointerEvents: disabled ? 'none' : '',
        width: 'fit-content',
        '&:hover': onClick
          ? {
              backgroundColor: genColor('action', color, 'subtleHover'),
            }
          : null,
        [BpTablet]: {
          backgroundColor: genColor('action', color, 'subtleNormal'),
        },
        '&:active': onClick
          ? {
              backgroundColor: genColor('action', color, 'subtleActive'),
            }
          : null,
        ...style,
      }}
    >
      <Text
        selectable="none"
        size={14}
        weight="medium"
        style={{ marginRight: 4 }}
      >
        {children}
      </Text>
      <styled.div
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          console.log('onclose')
          onClose?.()
        }}
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: genColor('action', 'neutral', 'subtleHover'),
          },
          [BpTablet]: {
            backgroundColor: genColor('action', color, 'subtleNormal'),
          },
          '&:active': {
            backgroundColor: genColor('action', 'neutral', 'subtleActive'),
          },
        }}
      >
        <IconSmallClose />
      </styled.div>
    </styled.div>
  )
}
