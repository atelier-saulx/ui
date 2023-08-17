import React, { FC } from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { ColorGroups, ColorContentColors } from '../../varsTypes'

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
  // console.log('Yolo', componentProps)
  // console.log('PRopSaata', propState)

  // console.log(typeof componentProps.size.type[0].value, '🦓')

  return (
    <styled.div style={{ border: '1px solid red', padding: 12 }}>
      {/* Lot of props tools */}
      {/* Children */}
      {componentProps.children && (
        <styled.div
          style={{ padding: 6, border: '1px solid blue', display: 'flex' }}
        >
          <Text size={14}>children =</Text>
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
      {/* Colors --> Get options from typescript colors, make them in array i guesss */}
      {componentProps.color && (
        <styled.div
          style={{ padding: 6, border: '1px solid blue', display: 'flex' }}
        >
          <Text size={14}>color =</Text>
          {/* <select
            onChange={(e) => {
              // make sure you convert value to number here
              setPropState({
                ...propState,
                ...{ color: e.target.value },
              })
            }}
            value={propState.color}
          >
            {componentProps.color.type.map((item, idx) => (
              <option value={item.value}>{item.value}</option>
            ))}
          </select> */}
        </styled.div>
      )}

      {/* Size */}
      {componentProps.size && (
        <styled.div
          style={{ padding: 6, border: '1px solid blue', display: 'flex' }}
        >
          <Text size={14}>size =</Text>
          <select
            onChange={(e) => {
              // make sure you convert value to number here // or not for comp with size as strings
              setPropState({
                ...propState,
                ...{
                  size:
                    typeof componentProps.size.type[0].value === 'number'
                      ? +e.target.value
                      : e.target.value,
                },
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
      {/* Subtle */}
      {componentProps.subtle && (
        <styled.div
          style={{ padding: 6, border: '1px solid blue', display: 'flex' }}
        >
          <Text size={14}>subtle =</Text>
          <input
            type="checkbox"
            value={propState.subtle}
            onChange={(e) => {
              setPropState({
                ...propState,
                ...{ subtle: !propState.subtle },
              })
            }}
          />
        </styled.div>
      )}

      {/* Weight */}
      {componentProps.weight && (
        <styled.div
          style={{ padding: 6, border: '1px solid blue', display: 'flex' }}
        >
          <Text size={14}>weight =</Text>
          <select
            onChange={(e) => {
              // console.log('🦧', e.target.value)
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
