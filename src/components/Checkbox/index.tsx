import React, { FC } from 'react'

import {
  styled,
  IconCheckSmall,
  IconMinus,
  color as genColor,
  usePropState,
  Style,
} from '../..'

export type CheckboxProps = {
  active?: boolean
  indeterminate?: boolean
  onClick?: (e) => void | (() => void)
  style?: Style
  warning?: boolean
  disabled?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  active,
  indeterminate,
  onClick,
  style,
  warning,
  disabled,
}) => {
  const [checked, setChecked] = usePropState(active)

  return (
    <styled.button
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        const newChecked = !checked
        setChecked(newChecked)
        onClick?.(newChecked)
      }}
      style={{
        width: '16px',
        height: '16px',
        borderRadius: '4px',
        border: '1px solid',
        borderColor: genColor(
          'action',
          checked ? 'primary' : warning ? 'alert' : 'neutral',
          checked || warning ? 'normal' : 'subtleNormal'
        ),
        backgroundColor: checked
          ? genColor('action', 'primary', 'normal')
          : 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': !disabled
          ? {
              borderColor: genColor(
                'action',
                checked ? 'primary' : warning ? 'alert' : 'neutral',
                checked || warning ? 'hover' : 'subtleHover'
              ),
              backgroundColor: checked
                ? genColor('action', 'primary', 'hover')
                : null,
            }
          : null,
        '&:active': !disabled
          ? {
              borderColor: 'transparent',
              backgroundColor: genColor(
                'action',
                checked ? 'primary' : 'neutral',
                checked ? 'active' : 'subtleActive'
              ),
            }
          : null,
        '&:focus': !disabled
          ? {
              outline: '1px solid',
              outlineColor: genColor('action', 'primary', 'selected'),
              outlineOffset: '1px',
            }
          : null,
        transition: 'all 0.2s',
        ...style,
      }}
    >
      {checked ? (
        indeterminate ? (
          <IconMinus color="inverted" />
        ) : (
          <IconCheckSmall color="inverted" />
        )
      ) : null}
    </styled.button>
  )
}
