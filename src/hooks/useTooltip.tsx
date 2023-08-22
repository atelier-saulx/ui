import React, { ReactNode } from 'react'
import { removeOverlay } from '../components/Overlay'
import { useOverlay } from './useOverlay'
import { Text } from '../components/Text'
import { color as genColor } from '../varsUtilities'
import { styled } from 'inlines'

export const useTooltip = (
  text: string | ReactNode,
  position: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
) => {
  const onMouseEnter = useOverlay(
    () => (
      <Text weight="strong" color="inverted" style={{ whiteSpace: 'nowrap' }}>
        {text}
      </Text>
    ),
    null,
    { variant: 'detached', position: position },
    undefined,
    undefined,
    {
      overlay: false,
      style: {
        padding: '4px 8px',
        width: 'fit-content',

        backgroundColor: genColor('background', 'inverted', 'strong'),
      },
    }
  )

  return {
    onMouseEnter,
    //   onMouseLeave: () => removeOverlay(),
  }
}
