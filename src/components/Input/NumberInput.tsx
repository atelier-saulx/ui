import React from 'react'
import { styled, ChevronDownIcon, ChevronUpIcon, color } from '~'

export const NumberInput = ({
  onChange,
  value,
  min,
  max,
  multipleOf = 1,
  exclusiveMinimum,
  exclusiveMaximum,
}) => {
  return (
    <styled.div
      style={{
        position: 'absolute',
        right: 8,
        top: '50%',
        transform: 'translate3d(0,-50%,0)',
        display: 'flex',
        flexDirection: 'column',
        width: 15,
        height: 20,
      }}
    >
      <styled.div
        style={{
          border: `1px solid ${color('border')}`,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 10,
          '@media (hover: hover)': {
            '&:hover': {
              backgroundColor: color('border'),
            },
          },
        }}
        onClick={() => {
          onChange({
            target: {
              value:
                exclusiveMaximum && String(+value + multipleOf) >= max
                  ? String(+value)
                  : multipleOf && max && String(+value + multipleOf) <= max
                  ? String(+value + multipleOf)
                  : multipleOf && !max && !exclusiveMaximum
                  ? String(+value + multipleOf)
                  : String(+value),
            },
          })
        }}
      >
        <ChevronUpIcon size={9} strokeWidth={2.5} />
      </styled.div>
      <styled.div
        style={{
          border: `1px solid ${color('border')}`,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 10,
          '@media (hover: hover)': {
            '&:hover': {
              backgroundColor: color('border'),
            },
          },
        }}
        onClick={() => {
          onChange({
            target: {
              value:
                exclusiveMinimum && String(+value - multipleOf) <= min
                  ? String(+value)
                  : multipleOf && min && String(+value - multipleOf) >= min
                  ? String(+value - multipleOf)
                  : multipleOf && !min && !exclusiveMinimum
                  ? String(+value - multipleOf)
                  : String(+value),
            },
          })
        }}
      >
        <ChevronDownIcon size={9} strokeWidth={2.5} />
      </styled.div>
    </styled.div>
  )
}
