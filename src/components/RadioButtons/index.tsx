import React, { ReactNode, FC } from 'react'
import { usePropState } from '../../hooks/usePropState'
import { ColorActionColors } from '../../varsTypes'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { styled } from 'inlines'
import { RadioButton } from './RadioButton'

type RadioButtonsProps = {
  color?: ColorActionColors
  data?: Array<{
    label?: ReactNode
    value: string | boolean | number
    description?: string
  }>
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  onChange?: (value: string | number | boolean) => void
  value?: string | boolean | number
}

export const RadioButtons: FC<RadioButtonsProps> = ({
  color = 'primary',
  data,
  direction,
  disabled,
  onChange,
  value,
}) => {
  const selectedIndex = data?.findIndex((item) => item.value === value)
  const [active, setActive] = usePropState(selectedIndex)

  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap: direction === 'horizontal' ? 16 : 0,
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {data?.map((item, index) => {
        const onClick = () => {
          setActive(index)
          onChange?.(data[index].value)
        }
        return (
          <styled.div
            key={index}
            style={{
              display: 'flex',
              marginBottom: 8,
              marginTop: 8,
            }}
          >
            <RadioButton
              active={active === index}
              color={color}
              value={data[active]}
              onClick={onClick}
            />
            {item.label && (
              <styled.div
                style={{
                  marginLeft: 12,
                  marginTop: '-5px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={onClick}
              >
                <Text selectable="none" size={14} weight="medium">
                  {item.label}
                </Text>
                <Text
                  selectable="none"
                  style={{ color: genColor('content', 'default', 'secondary') }}
                >
                  {item.description}
                </Text>
              </styled.div>
            )}
          </styled.div>
        )
      })}
    </styled.div>
  )
}
