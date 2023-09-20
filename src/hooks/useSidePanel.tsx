import React, { ReactNode } from 'react'
import { keyframes } from 'inlines'
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
} from '../'

const openAni = keyframes({
  '0%': { transform: 'scale(80%, 80%)' },
  '100%': { transform: 'scale(100%, 100%)' },
})

export const useSidePanel = (
  children: ReactNode | ReactNode[],
  position: 'left' | 'right',
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
          // transition: 'all 1s !important',
          position: 'absolute',
          height: '100%',
          maxHeight: 'calc(100vh - 48px)',
          width: '902px',
          backgroundColor: genColor('standalone', 'modal', 'default'),
          borderRadius: '12px',
          marginLeft: position === 'left' ? 0 : 'auto',
          marginRight: position === 'right' ? 48 : 'auto',
          display: 'flex',
          flexDirection: 'column',
          animation: openAni,
          animationDuration: '0.2s',
          animationFillMode: 'forwards',
          transformOrigin: 'center center',
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
          <Button
            onClick={() => {
              removeOverlay()
            }}
            afterIcon={<IconClose />}
            size="small"
            color="system"
            style={{ border: 'none', borderRadius: '50%' }}
          />
        </styled.div>
        {children}
        <styled.div
          style={{
            marginTop: 'auto',
            marginBottom: '0px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 24,
            borderTop: `1px solid ${genColor('border', 'default', 'strong')}`,
          }}
        >
          <Button
            color="system"
            // style={{ minHeight: '40px' }}
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
        transition: 'none !important',
        animation: 'none !important',
        backgroundColor: genColor('standalone', 'dimmer', 'default'),
        width: '100vw',
        overflow: 'inherit',
        position: 'fixed',
        display: 'flex',
        border: 'none',
        borderRadius: '0px',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: '24px',
      },
    }
  )

  return {
    open,
    close: () => removeOverlay(),
  }
}
