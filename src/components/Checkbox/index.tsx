import React, { FC, CSSProperties, MouseEvent } from 'react'
import { Label } from '../Label'
import { color, spaceToPx } from '~/utils'
import { CheckIcon, DashIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'
import { Color, Space } from '~/types'
import { styled } from 'inlines'

export type CheckboxProps = {
  checked?: boolean
  indeterminate?: boolean
  description?: string
  style?: CSSProperties
  onChange?: (value: boolean) => void
  label?: string
  space?: Space
  small?: boolean
  color?: Color
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Checkbox: FC<CheckboxProps> = ({
  checked: checkedProp,
  indeterminate,
  description,
  style,
  onChange,
  onClick,
  label,
  space,
  small,
  color: colorProp = 'accent',
  ...props
}) => {
  const [checked, setChecked] = usePropState(checkedProp)
  const { listeners, hover } = useHover()

  const clickHandler = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  return (
    <button
      onClick={(e) => {
        clickHandler()
        if (onClick) {
          onClick(e)
        }
      }}
      style={{
        display: 'flex',
        alignItems: !description ? 'center' : '',
        marginBottom: space ? spaceToPx(space) : null,
        ...style,
      }}
      {...listeners}
    >
      <styled.div
        style={{
          border: 'rgba(00,00,00,00) solid 2px',
          borderRadius: 4,
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: small ? 18 : 22,
          width: small ? 18 : 22,
          marginRight: 12,
          '@media (hover: hover)': {
            '&:hover': {
              border: 'rgba(44,60,234,0.2) solid 2px',
            },
          },
        }}
      >
        <div
          style={{
            backgroundColor: checked
              ? color(colorProp, hover ? 'hover' : null)
              : null,
            border: `1px solid ${color('border')}`,
            // outline: hover ? 'rgba(44,60,234,0.2) solid 2px' : null,
            borderRadius: 4,
            height: small ? 16 : 20,
            width: small ? 16 : 20,
            marginRight: 12,
            marginLeft: -1,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          {...props}
        >
          {checked && indeterminate ? (
            <DashIcon size={small ? 10 : 14} color="accent:contrast" />
          ) : checked ? (
            <CheckIcon size={small ? 12 : 14} color="accent:contrast" />
          ) : null}
        </div>
      </styled.div>

      <Label
        label={label}
        description={description}
        style={{ textAlign: 'left' }}
      />
    </button>
  )
}
