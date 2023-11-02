import React from 'react'
import { styled } from 'inlines'
import { color as genColor } from '../../varsUtilities'

export const CustomWidthBar = ({
  percentage,
  color,
  noOfItems,
  index,
  barWidth,
}) => {
  let transparentHeight = 100 / noOfItems

  return (
    <styled.div
      style={{
        height: barWidth < 24 ? `${transparentHeight}%` : `${barWidth}px`,
        top:
          barWidth < 24
            ? `${transparentHeight * index}%`
            : `${barWidth * index}px`,
        position: 'absolute',

        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <styled.div
        style={{
          borderTopRightRadius: barWidth < 8 ? barWidth / 2 : 4,
          borderBottomRightRadius: barWidth < 8 ? barWidth / 2 : 4,
          marginLeft: 12,
          height: barWidth,
          width: `${percentage.toFixed()}%`,
          backgroundColor: genColor(
            'nonSemanticBackground',
            color || 'magenta',
            'muted'
          ),
        }}
      />
    </styled.div>
  )
}
