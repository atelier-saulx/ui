import React, { FC, CSSProperties } from 'react'
import {
  ColorBackgroundColors,
  Text,
  styled,
  color as genColor,
  Button,
  IconAlert,
  IconClose,
  IconError,
  IconInfoFill,
} from '../..'

type ToastProps = {
  label?: string
  color?: ColorBackgroundColors
  description?: string
  style?: CSSProperties
  closeable?: boolean
  strong?: Boolean
  action?: { onClick: () => void; label: string }
  id?: any
}

export const Toast: FC<ToastProps> = ({
  label,
  action,
  closeable,
  color = 'default',
  description,
  style,
  strong,
  id,
  ...props
}) => {
  return (
    <styled.div
      style={{
        borderRadius: 8,
        backgroundColor: genColor(
          strong ? 'background' : 'standalone',
          strong ? color : 'modal',
          strong ? 'strong' : 'default'
        ),
        boxShadow: 'rgb(0 0 0 / 12%) 0px 8px 20px',
        cursor: 'pointer',
        padding: '0px 16px',
        height: '48px',
        // width: '400px',
        display: 'flex',
        alignItems: 'center',
        '@keyframes': {
          '0%': { transform: 'translateY(200px)', opacity: 0 },
          '50%': { transform: 'translateY(200px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        animationDuration: '0.5s',
        animationEffect: 'ease-in',
      }}
      {...props}
    >
      {color === 'negative' ? (
        <IconError color="inverted" />
      ) : color === 'warning' ? (
        <IconAlert color="inverted" />
      ) : (
        <IconInfoFill color={strong ? 'inverted' : 'default'} />
      )}
      <Text
        style={{ marginLeft: '16px' }}
        color={strong ? 'inverted' : 'default'}
      >
        {label}
      </Text>
      {action && (
        <Button
          style={{ marginLeft: '16px' }}
          size="xsmall"
          underline
          color={strong ? 'inverted' : 'system'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
      {closeable && (
        <IconClose
          style={{ marginLeft: '21px' }}
          color={strong ? 'inverted' : 'default'}
        />
      )}
      {/* {children} */}
    </styled.div>
  )
}
