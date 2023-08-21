import React, { FC } from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { ColorGroups, ColorContentColors } from '../../varsTypes'
import { Input } from '../Input'
import { Select } from '../Select'
import { Toggle } from '../Toggle'
import { Row } from '../Styled'

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
        <Row>
          <Text size={14}>children =</Text>
          <Input
            type="text"
            value={propState.children}
            onChange={(e) => {
              setPropState({
                ...propState,
                ...{ children: e.target.value },
              })
            }}
          />
        </Row>
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
              setPropState(prev => ({
                ...propState,
                ...{ color: e.target.value },
              }))
            }}
            value={propState.color}
          >
            {componentProps.color.type.map((item, idx) => (
              <option value={item.value}>{item.value}</option>
            ))}
          </select> */}
        </styled.div>
      )}

      {/* <Select
        onChange={() => console.log('snurpa')}
        placeholder="Placeholder"
        options={['yes', 'no', 'no-er', 'fljua8eop']}
      /> */}

      {/* Img url */}
      {componentProps.imgsrc && (
        <Row>
          <Text size={14}>imgsrc (image url) =</Text>
          <Input
            type="text"
            value={propState.imgsrc}
            onChange={(e) => {
              setPropState({
                ...propState,
                ...{ imgsrc: e.target.value },
              })
            }}
          />
        </Row>
      )}

      {/* Label */}
      {componentProps.label && (
        <Row>
          <Text size={14}>label =</Text>
          <Input
            type="text"
            value={propState.label}
            onChange={(e) => {
              setPropState({
                ...propState,
                ...{ label: e.target.value },
              })
            }}
          />
        </Row>
      )}
      {/* Size */}
      {componentProps.size && (
        <Row>
          <Text size={14}>size =</Text>
          <Select
            onChange={(e) => {
              // make sure you convert value to number here // or not for comp with size as strings
              setPropState((prev) => ({
                ...prev,
                ...{
                  size:
                    typeof componentProps.size.type[0].value === 'number'
                      ? +e
                      : e,
                },
              }))
            }}
            value={propState.size}
            options={componentProps.size.type.map((item, idx) => item.value)}
          />
        </Row>
      )}
      {/* Subtle */}
      {componentProps.subtle && (
        <Row>
          <Text size={14}>subtle =</Text>
          <Toggle
            size="medium"
            active={propState.subtle}
            onClick={(e) => {
              // Need to do like this with prevState, otherwise og component will overwrite again
              setPropState((prev) => ({
                ...prev,
                ...{ subtle: !propState.subtle },
              }))
            }}
          />
        </Row>
      )}

      {/* Weight */}
      {componentProps.weight && (
        <Row>
          <Text size={14}>weight =</Text>
          <Select
            onChange={(e) => {
              // console.log('🦧', e.target.value)
              setPropState((prev) => ({
                ...prev,
                ...{ weight: e },
              }))
            }}
            value={propState.weight}
            options={componentProps.weight.type.map((item, idx) => item.value)}
          />
        </Row>
      )}
    </styled.div>
  )
}
