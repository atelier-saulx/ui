import React, {
  FC,
  ReactNode,
  CSSProperties,
  FunctionComponent,
  useContext,
} from 'react'
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
import { ToastContext, ToastContextType } from './ToastContext'

type ToastProps = {
  label?: string
  icon?: FunctionComponent | ReactNode
  // topLeft?: ReactNode
  // topRight?: ReactNode
  color?: ColorBackgroundColors
  description?: string
  children?: ReactNode
  style?: CSSProperties
  closeable?: boolean
  strong?: Boolean
  // type?: 'success' | 'error' | 'warning'
  action?: { onClick: () => void; label: string }
}

export const Toast: FC<ToastProps> = ({
  label,
  icon,
  action,
  closeable,
  color = 'default',
  // topLeft,
  // topRight,
  description,
  children,
  style,
  // type,
  strong,
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
