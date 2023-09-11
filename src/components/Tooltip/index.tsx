import React from 'react'
import { styled, Style } from 'inlines'
import { useTooltip } from '../../hooks/useTooltip'

export const TooltipTest = () => {
  const toolTipTest = useTooltip('Tooltip placeholder', 'bottom')

  return (
    <>
      <styled.div {...toolTipTest} style={{ backgroundColor: 'yellow' }}>
        flip
      </styled.div>
    </>
  )
}
