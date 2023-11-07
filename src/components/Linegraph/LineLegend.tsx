import React, { useState } from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { color, colorHash } from '../../varsUtilities'

export const LineLegend = ({ data }) => {
  const [nestedLabelData, setNestedLabelData] = useState(false)

  // check if if object entrie data has a label
  for (const [key, value] of Object.entries(data)) {
    if (Object.keys(data[key]).includes('label')) {
      if (!nestedLabelData) {
        setNestedLabelData(true)
      }
    }
  }

  const labelAndColorArr = []

  for (const property in data) {
    labelAndColorArr.push({
      label: data[property].label,
      color: data[property].color,
    })
  }

  return (
    nestedLabelData && (
      <styled.div
        style={{
          display: 'flex',
          gap: 20,
          justifyContent: 'center',
          marginTop: 16,
        }}
      >
        {labelAndColorArr.map((item, idx) => (
          <styled.div
            style={{ display: 'flex', gap: 6, alignItems: 'center' }}
            key={idx}
          >
            <styled.div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: color(
                  'nonSemanticBackground',
                  item?.color || colorHash('nonSemanticBackground', item.label),
                  'strong'
                ),
              }}
            />
            <Text size={12} weight="medium" truncate>
              {item.label}
            </Text>
          </styled.div>
        ))}
      </styled.div>
    )
  )
}
