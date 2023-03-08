import React, { ReactNode } from 'react'
import { removeOverlay } from '~/components/Overlay'
import { useOverlay } from '~/hooks'

export const useTooltip = (
  text: string | ReactNode,
  position: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
) => {
  const onMouseEnter = useOverlay(
    () => <>{text}</>,
    null,
    { variant: 'detached', position: position },

    undefined,
    undefined,
    {
      overlay: false,
      style: { padding: '4px 8px', width: 'fit-content' },
    }
  )

  return {
    onMouseEnter,
    onMouseLeave: () => removeOverlay(),
  }
}
