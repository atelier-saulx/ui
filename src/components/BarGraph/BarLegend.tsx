import React, { FC } from 'react'
import { styled } from 'inlines'
import { Text } from '../../components/Text'
import { color as genColor, colorHash } from '../../varsUtilities'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

type BarLegendProps = {
  data: any
  direction: 'vertical' | 'horizontal'
  valueFormat: NumberFormat
  nested: boolean
  stacked: boolean
}

export const BarLegend: FC<BarLegendProps> = ({
  data,
  direction = 'horizontal',
  valueFormat = 'number-short',
  nested,
  stacked,
}) => {
  if (nested || stacked) {
    const nestedDataKeysArr = []
    let flatArr
    if (nested || stacked) {
      for (let i = 0; i < data.length; i++) {
        let arr = Object.keys(data[i].value)
        nestedDataKeysArr.push(arr)
      }
    }
    //flatten array
    let tempData = []
    flatArr = [...nestedDataKeysArr.flat()]
    const dataSet = new Set(flatArr)
    Array.from(dataSet).map((item) => tempData.push({ label: item }))
    data = [...tempData]
  }

  return (
    <styled.div
      style={{
        display: 'flex',
        gap: direction === 'vertical' && !nested && !stacked ? 4 : 20,
        justifyContent: 'center',
        flexDirection:
          direction === 'vertical' && !nested && !stacked ? 'column' : 'row',
        marginTop: 24,
      }}
    >
      {data.map((item, idx) => (
        <styled.div
          style={{ display: 'flex', gap: 6, alignItems: 'center' }}
          key={idx}
        >
          <styled.div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: item.color
                ? genColor(
                    'nonSemanticBackground',
                    item.color || 'magenta',
                    'muted'
                  )
                : genColor(
                    'nonSemanticBackground',
                    colorHash('nonSemanticBackground', item.label),
                    'strong'
                  ),
            }}
          />
          <Text size={12} weight="medium" truncate>
            {item.label}{' '}
          </Text>
          {!nested && !stacked && (
            <Text weight="strong">
              {' '}
              {direction === 'vertical' && valueFormat
                ? prettyNumber(item.value, valueFormat)
                : direction === 'vertical' && item.percentage.toFixed(1) + '%'}
            </Text>
          )}
        </styled.div>
      ))}
    </styled.div>
  )
}
