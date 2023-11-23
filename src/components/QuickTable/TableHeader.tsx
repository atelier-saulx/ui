import React from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { color } from '../../varsUtilities'

export const TableHeader = ({ width, columnWidth, headerColumns }) => {
  return (
    <styled.div
      style={{
        borderTop: `1px solid ${color(
          'inputBorder',
          'neutralNormal',
          'default'
        )}`,
        borderBottom: `1px solid ${color(
          'inputBorder',
          'neutralNormal',
          'default'
        )}`,
        display: 'flex',
        width: width,
        overflowX: 'hidden',
        // height: 40,
      }}
    >
      {headerColumns.map((item, idx) => (
        <styled.div
          key={idx}
          style={{
            minWidth: columnWidth,
            height: 40,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text weight="medium" transform="capitalize">
            {item}
          </Text>
        </styled.div>
      ))}
    </styled.div>
  )
}
