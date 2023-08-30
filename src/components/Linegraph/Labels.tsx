import React from 'react'
import { Text } from '../..'
import { prettyNumber } from '@based/pretty-number'

export default ({ labels, labelHeight, valueFormat }) => {
  // let prevValue
  return labels.map((v, i) => {
    const value = v.label
    // if (valueFormat === 'number-short' && ~~value === ~~prevValue) {
    //   return <div style={{ height: labelHeight }} />
    // }
    // prevValue = value
    return (
      <div
        key={i}
        style={{
          height: labelHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Text size={12} weight="strong">
            {prettyNumber(value, valueFormat)}
            {/* {{ value, format: valueFormat }} */}
          </Text>
        </div>
      </div>
    )
  })
}
