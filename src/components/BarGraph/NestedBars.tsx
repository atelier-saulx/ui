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

  return (
    <styled.div
      style={{
        display: 'flex',
        marginBottom: spacing,
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
        />
      )}
      {valKeys.map((itemKey, idx) => (
        <styled.div
          key={idx}
          style={{
            height: barWidth,
            backgroundColor: color(
              'nonSemanticBackground',
              colorHash('nonSemanticBackground', itemKey),
              'strong'
            ),
            borderTopRightRadius: idx === valKeys.length - 1 ? 4 : 0,
            borderBottomRightRadius: idx === valKeys.length - 1 ? 4 : 0,
            width: `${(value[itemKey] / largestValue) * 100}%`,
            '&:hover': {
              backgroundColor: color(
                'nonSemanticBackground',
                colorHash('nonSemanticBackground', itemKey),
                'soft'
              ),
            },
          }}
          onMouseEnter={() => {
            setShowLabel(true)
            setObjKey(itemKey)
            setObjValue(value[itemKey])
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
