import React, { CSSProperties, FC } from 'react'
import { Text, Label } from '~'
import { styled } from 'inlines'
import { border, Color, color } from '~/utils'
import { InputWrapper } from '../Input/InputWrapper'
import { usePropState } from '~/hooks'

type ToggleProps = {
  value?: boolean
  label?: string
  description?: string
  descriptionBottom?: string
  text?: string
  disabled?: boolean
  indent?: boolean
  style?: CSSProperties
  color?: Color
  onChange?: (value: boolean) => void
}

export const Toggle: FC<ToggleProps> = ({
  value = false,
  indent,
  label,
  disabled,
  description,
  descriptionBottom,
  text,
  color: colorProp = 'accent',
  style,
  onChange,
  ...props
}) => {
  const [checked, setChecked] = usePropState(value)

  return (
    <InputWrapper
      indent={indent}
      value=""
      descriptionBottom={descriptionBottom}
      disabled={disabled}
      color={colorProp}
      style={{
        width: 'fit-content',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        const newChecked = !checked
        setChecked(newChecked)
        onChange?.(newChecked)
      }}
    >
      <Label
        label={label}
        description={description}
        style={{ marginRight: 12 }}
      />

      <div {...props} style={{ ...style }}>
        <div
          style={{
            display: 'flex',
            marginTop: label || description ? 8 : 0,
            alignItems: 'center',
          }}
        >
          <styled.input
            onChange={() => {
              const newChecked = !checked
              setChecked(newChecked)
              onChange?.(newChecked)
            }}
            type="checkbox"
            checked={checked}
            style={{
              display: 'flex',
              width: 32,
              height: 21,
              borderRadius: 10,
              alignItems: 'center',
              marginRight: 12,
              position: 'relative',
              cursor: 'pointer',
              border: border('1px', 'border'),
              backgroundColor: color(checked ? colorProp : 'lightbackdrop'),
              '@media (hover: hover)': {
                '&:hover': {
                  backgroundColor: checked ? color(colorProp, 'active') : null,
                },
              },
              '&:before': {
                content: '" "',
                width: '16px',
                height: '16px',
                backgroundColor: color('background'),
                borderRadius: '8px',
                display: 'block',
                position: 'absolute',
                //  left: !checked && '2px',
                //  right: checked ? '2px' : 'auto',
                transform: !checked ? 'translateX(2px)' : `translateX(14px)`,
                transition: 'transform 0.1s linear',
              },
            }}
          />
          {text && <Text weight={400}>{text}</Text>}
        </div>
      </div>
    </InputWrapper>
  )
}
