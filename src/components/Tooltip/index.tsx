import React, { ReactNode } from 'react'
import * as TooltipBase from '@radix-ui/react-tooltip'
import { color } from '../../varsUtilities'

export type TooltipProps = {
  children: ReactNode
  text: string
  position?: 'top' | 'right' | 'bottom' | 'left'
}

export function Tooltip({ children, text, position }: TooltipProps) {
  return (
    <TooltipBase.Provider delayDuration={0}>
      <TooltipBase.Root>
        <TooltipBase.Trigger asChild>{children}</TooltipBase.Trigger>
        <TooltipBase.Portal>
          <TooltipBase.Content
            side={position}
            style={{
              fontSize: 12,
              lineHeight: '20px',
              fontFamily: 'Inter',
              fontWeight: 600,
              color: color('content', 'inverted', 'primary'),
              padding: '4px 8px',
              borderRadius: 4,
              background: color('background', 'inverted', 'strong'),
            }}
            sideOffset={5}
          >
            {text}
            <TooltipBase.Arrow
              style={{
                fill: color('background', 'inverted', 'strong'),
              }}
            />
          </TooltipBase.Content>
        </TooltipBase.Portal>
      </TooltipBase.Root>
    </TooltipBase.Provider>
  )
}
