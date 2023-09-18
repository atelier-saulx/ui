import React, { FC, useState, useEffect } from 'react'
import {
  ColorBackgroundColors,
  Text,
  styled,
  Style,
  color as genColor,
  Button,
  IconAlert,
  IconClose,
  IconError,
  IconInfoFill,
  useToast,
} from '~'

export type ToastProps = {
  action?: { onClick: () => void; label: string }
  closeable?: boolean
  color?: ColorBackgroundColors
  description?: string
  id?: any
  label?: string
  strong?: boolean
  style?: Style
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
  const { remove } = useToast()
  const [closeState, setCloseState] = useState(false)
  const closeFunc = () => {
    setCloseState(true)
    setTimeout(() => remove(id), 200)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!closeable) closeFunc()
    }, 5e3)
    return () => clearTimeout(timeout)
  })

  return (
    <styled.div
      onClick={closeable ? () => null : () => remove(id)}
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
        opacity: closeState ? 0 : 1,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        '@keyframes': {
          '0%': { transform: 'translateY(200px)', opacity: 0 },
          '50%': { transform: 'translateY(200px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        animationDuration: '0.5s',
        animationEffect: 'ease-in',
        ...style,
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
          onClick={closeFunc}
          style={{ marginLeft: '21px' }}
          color={strong ? 'inverted' : 'default'}
        />
      )}
      {/* {children} */}
    </styled.div>
  )
}
