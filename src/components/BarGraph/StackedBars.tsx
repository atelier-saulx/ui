import React, { FC } from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { ColorNonSemanticBackgroundColors } from 'src/varsTypes'

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
}

export const StackedBars: FC<StackedBarsProps> = ({
  label,
  barWidth = 12,
  value,
  color,
  largestValue,
}) => {
  console.log('Incoming --> ', color)

  let valKeys = Object.keys(value)

  return (
    <styled.div style={{ width: '100%', marginBottom: 6 }}>
      {valKeys?.map((key, idx) => {
        return (
          <styled.div
            key={idx}
            style={{
              height: barWidth,
              backgroundColor: genColor(
                'nonSemanticBackground',
                color || 'magenta',
                'muted'
              ),
              width: ` ${(value[key] / largestValue) * 100}%`,
              '&:hover': {
                backgroundColor: genColor(
                  'nonSemanticBackground',
                  color || 'magenta',
                  'strong'
                ),
              },
            }}
          >
            {/* {key} : {value[key]} */}
          </styled.div>
        )
      })}
    </styled.div>
  )
}
