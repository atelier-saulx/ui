import React from 'react'
import { styled, Style } from 'inlines'
import { useTooltip } from '../../hooks/useTooltip'

export const Tooltip = () => {
  const toolTipTest = useTooltip('Tooltip placeholder', 'bottom')

  return (
    <styled.div {...toolTipTest} style={{ backgroundColor: 'yellow' }}>
      flip
    </styled.div>
  )
}
