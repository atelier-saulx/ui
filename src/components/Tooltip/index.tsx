import React from 'react'
import { styled, Style } from 'inlines'
import { useTooltip } from '../../hooks/useTooltip'

export const TooltipTest = () => {
  const thingy = [
    useTooltip('Tooltip placeholder', 'top-left'),
    useTooltip('Tooltip placeholder', 'top'),
    useTooltip('Tooltip placeholder', 'top-right'),
    useTooltip('Tooltip placeholder', 'left'),
    useTooltip('Tooltip placeholder', 'left'),
    useTooltip('Tooltip placeholder', 'right'),
    useTooltip('Tooltip placeholder', 'bottom-left'),
    useTooltip('Tooltip placeholder', 'bottom'),
    useTooltip('Tooltip placeholder', 'bottom-right'),
  ]

  return (
    <styled.div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(3, 1fr)`,
        gridGap: '20px',
      }}
    >
      {thingy.map((tooltipTest) => (
        <styled.div {...tooltipTest} style={{ backgroundColor: 'yellow' }}>
          Flap
        </styled.div>
      ))}
    </styled.div>
  )
}
