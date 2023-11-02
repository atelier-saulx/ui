import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { color as genColor, colorHash } from '../../varsUtilities'
import { ColorNonSemanticBackgroundColors } from 'src/varsTypes'
import { OverlayLabels } from './OverlayLabels'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

type StackedBarsProps = {
  label?: string
  value?: {}
  color?: ColorNonSemanticBackgroundColors
  totalValue?: number
  barWidth?: number
  valueFormat?: 'percentages' | NumberFormat
  spacing?: number
  direction?: 'vertical' | 'horizontal'
}

export const StackedBars: FC<StackedBarsProps> = ({
  label,
  barWidth = 12,
  value,
  color,
  totalValue,
  valueFormat,
  spacing = 6,
  direction,
}) => {
  console.log('Incoming --> ', color, direction)

  const [showLabel, setShowLabel] = useState(false)
  const [xPos, setXPos] = useState(0)
  const [yPos, setYPos] = useState(0)
  const [objKey, setObjKey] = useState('')
  const [objValue, setObjValue] = useState('')

  let sortable = []
  for (const x in value) {
    sortable.push([x, value[x]])
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1]
  })

  return (
    <styled.div
      style={{
        width: direction === 'vertical' ? 'auto' : '100%',
        marginBottom: direction !== 'vertical' && spacing,
        marginRight: direction === 'vertical' && spacing,
        height: direction === 'vertical' ? 300 : 'auto',
        display: 'flex',
        alignItems: direction === 'vertical' ? 'flex-end' : 'flex-start',
        flexDirection: direction === 'vertical' ? 'row' : 'column',
      }}
    >
      {showLabel && (
        <OverlayLabels
          xPos={xPos}
          yPos={yPos}
          objKey={objKey}
          objValue={objValue}
          valueFormat={valueFormat}
          direction={direction}
          label={label}
        />
      )}
      {sortable?.map((item, idx) => {
        return (
          <styled.div
            key={idx}
            style={{
              borderRadius: 4,
              marginBottom: direction !== 'vertical' && 1,
              marginRight: direction === 'vertical' && 1,
              height:
                direction === 'vertical'
                  ? `${(value[item[0]] / totalValue) * 100}%`
                  : barWidth,
              backgroundColor: genColor(
                'nonSemanticBackground',
                colorHash('nonSemanticBackground', item[0]),
                'strong'
              ),
              width:
                direction === 'vertical'
                  ? barWidth
                  : `${(value[item[0]] / totalValue) * 100}%`,
              '&:hover': {
                backgroundColor: genColor(
                  'nonSemanticBackground',
                  colorHash('nonSemanticBackground', item[0]),
                  'soft'
                ),
              },
            }}
            onMouseEnter={() => {
              setShowLabel(true)
              setObjKey(item[0])
              setObjValue(value[item[0]])
            }}
            onMouseLeave={() => setShowLabel(false)}
            onMouseMove={(e) => {
              setYPos(e.clientY + 12)
              setXPos(e.clientX + 12)
            }}
          />
        )
      })}
    </styled.div>
  )
}
