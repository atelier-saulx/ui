import React, { FC, ReactNode } from 'react'
import { IconErrorFill, IconAlertFill, IconInfoFill } from '../../icons'
import { styled, Style } from 'inlines'
import { Center } from '../Styled'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { ColorBackgroundColors } from '../../varsTypes'

export type ContainerProps = {
  color?: ColorBackgroundColors
  children?: ReactNode
  style?: Style
  action?: { onClick: () => void; label: string }
}

export const Container: FC<ContainerProps> = ({
  color = 'default',
  children,
  style,
  action,
}) => {
  const contentColor = color === 'default' ? 'default' : 'inverted'

  return (
    <Center
      style={{
        width: '100%',
        padding: action ? '8px' : '12px',
        backgroundColor: genColor('background', color, 'strong'),
        ...style,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          marginRight: children ? 8 : 0,
          width: 16,
          height: 16,
          maxWidth: '100%',
          maxHeight: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {color === 'negative' ? (
          <IconErrorFill color={contentColor} />
        ) : color === 'warning' ? (
          <IconAlertFill color={contentColor} />
        ) : (
          <IconInfoFill color={contentColor} />
        )}
      </styled.div>
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text selectable="none" size={14} weight="strong" color={contentColor}>
          {children}
        </Text>
        {action && (
          <Text
            size={14}
            weight="strong"
            onClick={action.onClick}
            underline
            color={contentColor}
            style={{
              marginLeft: '10px',
            }}
          >
            {action.label}
          </Text>
        )}
      </styled.div>
    </Center>
  )
}
