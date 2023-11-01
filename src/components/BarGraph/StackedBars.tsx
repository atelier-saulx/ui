import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { ColorNonSemanticBackgroundColors } from 'src/varsTypes'
import { OverlayLabels } from './OverlayLabels'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { Text } from '../Text'
//
// {
//     label: 'Countrie votes',
//     value: {
//         en: 546,
//         de: 433,
//         nl: 903
//     },
//     color: 'blue'
// }

type StackedBarsProps = {
  label?: string
  value?: {}
  color?: ColorNonSemanticBackgroundColors
  largestValue?: number
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
  largestValue,
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

  let valKeys = Object.keys(value)

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
        />
      )}
      {valKeys?.map((key, idx) => {
        return (
          <styled.div
            key={idx}
            style={{
              borderTopRightRadius: 4,
              borderTopLeftRadius: direction === 'vertical' ? 4 : 0,
              borderBottomRightRadius: direction === 'vertical' ? 0 : 4,
              borderBottomLeftRadius: 0,
              marginBottom: direction !== 'vertical' && 1,
              marginRight: direction === 'vertical' && 1,
              height:
                direction === 'vertical'
                  ? `${(value[key] / largestValue) * 100}%`
                  : barWidth,
              backgroundColor: genColor(
                'nonSemanticBackground',
                color || 'magenta',
                'muted'
              ),
              width:
                direction === 'vertical'
                  ? barWidth
                  : `${(value[key] / largestValue) * 100}%`,
              '&:hover': {
                backgroundColor: genColor(
                  'nonSemanticBackground',
                  color || 'magenta',
                  'strong'
                ),
              },
            }}
            onMouseEnter={() => {
              setShowLabel(true)
              setObjKey(key)
              setObjValue(value[key])
            }}
            onMouseLeave={() => setShowLabel(false)}
            onMouseMove={(e) => {
              console.log('x:', e.clientX, 'y:', e.clientY)
              // if (labelRef.current) {
              //   labelRef.current.style.left = e.clientX
              //   labelRef.current.style.top = e.clientY
              // }
              // setLabelXY({ x: e.clientX, y: e.clientY })

              //     setYPos(e.clientY + 20)
              setYPos(e.clientY + 12)
              setXPos(e.clientX + 12)
            }}
          />
        )
      })}
    </styled.div>
  )
}
