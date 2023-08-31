import React, { ReactNode } from 'react'
import {
  removeOverlay,
  useOverlay,
  Text,
  color as genColor,
  styled,
  Style,
  PositionProps,
  IconClose,
  Button,
} from '../../src'

export const useSidePanel = (
  children: ReactNode | ReactNode[],
  position:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left'
    | 'left'
    | 'right' = 'bottom',
  style?: Style,
  title?: string,
  cancel: { onClick: () => void; label: string } = {
    onClick: console.log,
    label: 'Cancel',
  },
  primaryAction: { onClick: () => void; label: string } = {
    onClick: console.log,
    label: 'Primary Action',
  }
) => {
  const open = useOverlay(
    () => (
      <styled.div
        style={{
          height: '100%',
          maxHeight: 'calc(100vh - 48px)',
          width: '400px',
          backgroundColor: genColor('standalone', 'modal', 'default'),
          borderRadius: '12px',
          marginLeft: position === 'left' ? 0 : 'auto',
          marginRight: position === 'right' ? 48 : 'auto',
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
      >
        <styled.div
          style={{
            display: 'flex',
            height: '16px',
            padding: '32px 24px',
            borderBottom: `1px solid ${genColor(
              'border',
              'default',
              'strong'
            )}`,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text size={18} weight="strong">
            {title}
          </Text>
          <styled.div
            onClick={() => {
              removeOverlay()
            }}
            style={{
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: genColor('action', 'neutral', 'subtleHover'),
              },
              '&:active': {
                backgroundColor: genColor('action', 'neutral', 'subtleActive'),
              },
            }}
          >
            <IconClose />
          </styled.div>
        </styled.div>
        {children}
        <styled.div
          style={{
            marginTop: 'auto',
            marginBottom: '0px',
            height: '40px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 24,
            borderTop: `1px solid ${genColor('border', 'default', 'strong')}`,
          }}
        >
          <Button
            color="system"
            onClick={() => {
              cancel?.onClick()
              removeOverlay()
            }}
          >
            {cancel?.label}
          </Button>
          <Button onClick={primaryAction?.onClick}>
            {primaryAction?.label}
          </Button>
        </styled.div>
      </styled.div>
    ),
    null,
    {
      variant: 'detached',
      position: position.split('-')[0] as PositionProps['position'],
    },
    undefined,
    undefined,
    {
      overlay: false,
      style: {
        backgroundColor: genColor('standalone', 'dimmer', 'default'),
        width: '100vw',
        height: '100vh',
        overflow: 'inherit',
        position: 'fixed',
        display: 'flex',
        border: 'none',
        borderRadius: '0px',
        top: 0,
        left: 0,
        padding: '24px',
      },
    }
  )

  return {
    open,
    close: () => removeOverlay(),
  }
}
