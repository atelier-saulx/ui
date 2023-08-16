import React, { FC } from 'react'
import { styled } from 'inlines'

type ControlsProps = {
  componentProps: {}
  propState: {}
  setPropState: React.Dispatch<React.SetStateAction<{}>>
}

export const Controls: FC<ControlsProps> = ({
  componentProps,
  propState,
  setPropState,
}) => {
  console.log('Yolo', componentProps)
  console.log('PRopSaata', propState)

  return (
    <styled.div style={{ border: '1px solid red', padding: 12 }}>
      <b>Controls</b>

      {/* Lot of props tools */}
      {/* Children */}
      {componentProps.children && (
        <styled.div style={{ padding: 6, border: '1px solid blue' }}>
          Enter Text:
          <input
            value={propState.children}
            onChange={(e) => {
              setPropState({
                ...propState,
                ...{ children: e.target.value },
              })
            }}
          />
        </styled.div>
      )}

      {/* Size */}
      {componentProps.size && (
        <styled.div style={{ padding: 6, border: '1px solid blue' }}>
          Size:
          <select
            onChange={(e) => {
              // make sure you convert value to number here
              setPropState({
                ...propState,
                ...{ size: +e.target.value },
              })
            }}
            value={propState.size}
          >
            {componentProps.size.type.map((item, idx) => (
              <option value={item.value}>{item.value}</option>
            ))}
          </select>
        </styled.div>
      )}
      {/* Weight */}
      {componentProps.weight && (
        <styled.div style={{ padding: 6, border: '1px solid blue' }}>
          Weight:
          <select
            onChange={(e) => {
              console.log('🦧', e.target.value)
              setPropState({
                ...propState,
                ...{ weight: e.target.value },
              })
            }}
            value={propState.weight}
          >
            {componentProps.weight.type.map((item, idx) => (
              <option value={item.value}>{item.value}</option>
            ))}
          </select>
        </styled.div>
      )}
    </styled.div>
  )
}
