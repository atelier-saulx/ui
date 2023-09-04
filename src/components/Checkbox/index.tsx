import React, { FC } from 'react'

import {
  styled,
  IconCheckSmall,
  IconMinus,
  color as genColor,
  usePropState,
  Style,
  Text,
} from '../..'

export type CheckboxProps = {
  description?: string
  disabled?: boolean
  indeterminate?: boolean
  label?: string
  onChange?: (value: boolean) => void
  style?: Style
  value?: boolean
  warning?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  description,
  disabled,
  indeterminate,
  label,
  onChange,
  style,
  value,
  warning,
}) => {
  const [checked, setChecked] = usePropState(value)

  return (
    <styled.div
      style={{
        display: 'flex',
        pointerEvents: disabled ? 'none' : 'auto',

        opacity: disabled ? 0.6 : 1,
      }}
    >
      <styled.button
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setChecked(!checked)
          onChange?.(!checked)
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
          // cursor: disabled ? 'not-allowed' : 'pointer',
          cursor: 'pointer',
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
            <IconMinus color="inverted" style={{ cursor: 'pointer' }} />
          ) : (
            <IconCheckSmall color="inverted" style={{ cursor: 'pointer' }} />
          )
        ) : null}
      </styled.button>
      {label && (
        <styled.div
          style={{ marginLeft: 12, marginTop: '-3px', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setChecked(!checked)
            onChange?.(!checked)
          }}
        >
          <Text size={14} weight="medium">
            {label}
          </Text>
          <Text light>{description}</Text>
        </styled.div>
      )}
    </styled.div>
  )
}
