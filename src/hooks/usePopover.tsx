import React, { ReactNode } from 'react'
import {
  removeOverlay,
  useOverlay,
  Text,
  color as genColor,
  styled,
  Style,
  PositionProps,
} from '../'

export const usePopover = (
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
  style?: Style
) => {
  const onMouseEnter = useOverlay(
    () => <>{children}</>,
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
        border: `1px solid ${genColor('border', 'default', 'subtle')}`,
        borderRadius: '16px',
        boxShadow:
          '0px 8px 16px -2px rgba(27, 36, 44, 0.12), 0px 2px 2px -1px rgba(27, 35, 44, 0.04)',
        backgroundColor: genColor('standalone', 'modal', 'default'),
        padding: '20px 16px',
        width: 'fit-content',
        overflow: 'inherit',
        position: 'relative',
        transform:
          position === 'top-right' || position === 'bottom-right'
            ? 'translateX(50%)'
            : position === 'top-left' || position === 'bottom-left'
            ? 'translateX(-50%)'
            : position === 'left' || position === 'right'
            ? 'translateY(-25%)'
            : '0px',
        marginLeft:
          position === 'top-right' || position === 'bottom-right'
            ? '-32px'
            : position === 'top-left' || position === 'bottom-left'
            ? '32px'
            : 'auto',

        ...style,
      },
    }
  )

  return {
    onMouseEnter,
    onMouseLeave: () => removeOverlay(),
  }
}
