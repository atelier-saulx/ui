import React, { ReactNode } from 'react'
import {
  removeOverlay,
  useOverlay,
  Text,
  color as genColor,
  styled,
} from '../../src'

export const useTooltip = (
  text: string | ReactNode,
  position:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left'
    | 'left'
    | 'right' = 'bottom'
) => {
  const onMouseEnter = useOverlay(
    () => (
      <Text weight="strong" color="inverted" style={{ whiteSpace: 'nowrap' }}>
        {text}
      </Text>
    ),
    null,
    { variant: 'detached', position: position.split('-')[0] },
    undefined,
    undefined,
    {
      overlay: false,
      style: {
        padding: '4px 8px',
        width: 'fit-content',
        borderRadius: '4px',
        overflow: 'inherit',
        border: 'none',
        position: 'relative',
        boxShadow: 'none',
        backgroundColor: genColor('background', 'inverted', 'strong'),
        transform:
          position === 'top-right' || position === 'bottom-right'
            ? 'translateX(50%)'
            : position === 'top-left' || position === 'bottom-left'
            ? 'translate(-50%)'
            : '0px',
        marginLeft:
          position === 'top-right' || position === 'bottom-right'
            ? '-32px'
            : position === 'top-left' || position === 'bottom-left'
            ? '32px'
            : 'auto',
        '&::after': {
          content: `''`,
          borderRadius: '3px',
          width: '12px',
          height: '12px',
          backgroundColor: genColor('background', 'inverted', 'strong'),
          transform: 'rotate(45deg)',
          position: 'absolute',
          bottom:
            position === 'top' ||
            position === 'top-right' ||
            position === 'top-left'
              ? '-4px'
              : 'unset',
          top:
            position === 'bottom' ||
            position === 'bottom-right' ||
            position === 'bottom-left'
              ? '-4px'
              : 'unset',
          marginLeft: 'auto',
          marginRight: 'auto',

          left:
            position === 'top' || position === 'bottom'
              ? '0px'
              : position === 'top-right' || position === 'bottom-right'
              ? '10px'
              : 'unset',
          right:
            position === 'top' || position === 'bottom'
              ? '0px'
              : position === 'top-left' || position === 'bottom-left'
              ? '10px'
              : 'unset',
        },
      },
    }
  )

  return {
    onMouseEnter,
    // onMouseLeave: () => removeOverlay(),
  }
}
