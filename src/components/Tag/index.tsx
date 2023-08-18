import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { IconClose } from '../../icons'
import { ColorActionColors } from '../../varsTypes'

type TagProps = {
  color?: ColorActionColors
  disabled?: boolean
  onClick?: () => void
  label?: string
  style?: Style
}

export const Tag: FC<TagProps> = ({
  color = 'neutral',
  disabled,
  onClick,
  label,
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
        '&:hover': {
          backgroundColor: genColor('action', color, 'subtleHover'),
        },
        '&:active': {
          backgroundColor: genColor('action', color, 'subtleActive'),
        },
        ...style,
      }}
    >
      <Text size={14} weight="medium" style={{ marginRight: 4 }}>
        {label}
      </Text>
      <IconClose />
    </styled.div>
  )
}
