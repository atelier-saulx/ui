import React, { FC } from 'react'
import { usePropState } from '../../hooks/usePropState'
import { styled, Text, color as genColor } from '../../'
import { RadioButton } from './RadioButton'

type RadioButtonsProps = {
  value?: string | boolean | number
  data?: Array<{
    label?: string
    value: string | boolean | number
    description?: string
  }>
  label?: string
  description?: string
  direction?: 'horizontal' | 'vertical'
  indent?: boolean
  disabled?: boolean
  descriptionBottom?: string
  onChange?: (value: string | number | boolean) => void
}

//TODO

export const RadioButtons: FC<RadioButtonsProps> = ({
  direction,
  data,
  value,
  onChange,
}) => {
  const selectedIndex = data?.findIndex((item) => item.value === value)
  const [active, setActive] = usePropState(selectedIndex)

  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        marginBottom: 8,
        marginTop: 8,
      }}
    >
      {data?.map((item, index) => {
        const onClick = () => {
          setActive(index)
          onChange?.(data[index].value)
        }
        return (
          <label
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 4,
              marginTop: 4,
              marginRight: 16,
              cursor: 'pointer',
              borderRadius: 8,
              border: '1px solid red',
            }}
          >
            <RadioButton
              active={active === index}
              value={data[active]}
              onClick={onClick}
              key={index}
            />
          </label>
        )
      })}
    </styled.div>
  )
}
