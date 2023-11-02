import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { colorHash, color } from '../../varsUtilities'
import { NumberFormat } from '@based/pretty-number'
import { NestedOverlayLabels } from './NestedOverlayLabels'

type NestedBarsProps = {
  value: {}
  label?: string
  largestValue?: number
  barWidth?: number
  spacing?: number
  valueFormat?: 'percentages' | NumberFormat
  direction?: 'horizontal' | 'vertical'
}

export const NestedBars: FC<NestedBarsProps> = ({
  value,
  largestValue,
  valueFormat,
  label,
  spacing = 0,
  barWidth = 26,
  direction,
}) => {
  const [showLabel, setShowLabel] = useState(false)
  const [xPos, setXPos] = useState(0)
  const [yPos, setYPos] = useState(0)
  const [objKey, setObjKey] = useState('')
  const [objValue, setObjValue] = useState('')

  let valKeys = Object.keys(value)

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
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column-reverse' : 'row',
        marginBottom: direction !== 'vertical' && spacing,
        marginRight: direction === 'vertical' && spacing,
        minHeight: direction === 'vertical' ? 400 : 'auto',
      }}
    >
      {showLabel && (
        <NestedOverlayLabels
          xPos={xPos}
          yPos={yPos}
          objKey={objKey}
          objValue={objValue}
          valueFormat={valueFormat}
          direction={direction}
          value={value}
          label={label}
        />
      )}
      {sortable.map((item, idx) => (
        <styled.div
          key={idx}
          style={{
            height:
              direction === 'vertical'
                ? `${(value[item[0]] / largestValue) * 100}%`
                : barWidth,
            backgroundColor: color(
              'nonSemanticBackground',
              colorHash('nonSemanticBackground', item[0]),
              'strong'
            ),
            // borderTopRightRadius: idx === valKeys.length - 1 ? 4 : 0,
            // borderBottomRightRadius: idx === valKeys.length - 1 ? 4 : 0,

            borderTopRightRadius: idx === valKeys.length - 1 && 4,
            borderTopLeftRadius:
              direction === 'vertical' && idx === valKeys.length - 1 ? 4 : 0,
            borderBottomRightRadius:
              direction === 'vertical' ? 0 : idx === valKeys.length - 1 ? 4 : 0,
            borderBottomLeftRadius: 0,

            width:
              direction === 'vertical'
                ? barWidth
                : `${(value[item[0]] / largestValue) * 100}%`,
            '&:hover': {
              backgroundColor: color(
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
      ))}
    </styled.div>
  )
}
