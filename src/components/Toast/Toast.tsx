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
  IconErrorFill,
  IconInfoFill,
  IconWarningFill,
  IconCheckCircleFill,
  useToast,
} from '~'

export type ToastProps = {
  action?: { onClick: () => void; label: string }
  closeable?: boolean
  color?: ColorBackgroundColors
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
        <IconErrorFill color={strong ? 'inverted' : 'negative'} />
      ) : color === 'warning' ? (
        <IconWarningFill color={strong ? 'default' : 'warning'} />
      ) : color === 'positive' ? (
        <IconCheckCircleFill color={strong ? 'inverted' : 'positive'} />
      ) : color === 'informative' ? (
        <IconInfoFill color={strong ? 'inverted' : 'informative'} />
      ) : null}
      <Text
        selectable="none"
        style={{ marginLeft: '16px' }}
        color={
          (strong && color === 'warning') || color === 'default'
            ? 'default'
            : strong
            ? 'inverted'
            : 'default'
        }
      >
        {label}
      </Text>
      {action && (
        <Button
          style={{
            marginLeft: '16px',
            '& div div': {
              color:
                (!strong && color === 'neutral') ||
                (!strong && color === 'inverted')
                  ? `${genColor(
                      'background',
                      'informative',
                      'strong'
                    )} !important`
                  : 'inherit',
            },
          }}
          size="xsmall"
          underline
          color={
            (strong && color === 'warning') || color === 'default'
              ? 'system'
              : strong
              ? 'inverted'
              : 'primary'
          }
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
      {closeable && (
        <IconClose
          onClick={closeFunc}
          style={{ marginLeft: '21px' }}
          color={
            strong && color === 'warning'
              ? 'default'
              : strong
              ? 'inverted'
              : 'default'
          }
        />
      )}
      {/* {children} */}
    </styled.div>
  )
}
