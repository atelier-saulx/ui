import React from 'react'
import { styled } from 'inlines'
import { Text } from '../../components/Text'
import { color as genColor, colorHash } from 'src/varsUtilities'

export const BarLegend = ({ data }) => {
  console.log(data, 'BARS')

  return (
    <styled.div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
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
            {item.label}
          </Text>
        </styled.div>
      ))}
    </styled.div>
  )
}
