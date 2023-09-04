import React, { FC } from 'react'
import { Checkbox } from '.'
import { Text, styled, color as genColor, Style } from '../..'

export type CheckboxItemProps = {
  value?: boolean
  description?: string
  disabled?: boolean
  indeterminate?: boolean
  label?: string
  onChange?: (value: boolean) => void
  style?: Style
  warning?: boolean
}

export const CheckboxItem: FC<CheckboxItemProps> = ({
  label,
  value,
  description,
  indeterminate,
  onChange,
  style,
  warning,
  disabled,
}) => {
  return (
    <styled.div style={{ display: 'flex', ...style }}>
      <Checkbox
        value={value}
        indeterminate={indeterminate}
        onChange={onChange}
        warning={warning}
        disabled={disabled}
        style={{ marginTop: '4px', marginRight: '12px' }}
      />
      <styled.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid red',
        }}
      >
        <Text style={{ display: 'flex' }} color="default">
          {label}
        </Text>
        <Text style={{ display: 'flex' }} light>
          {description}
        </Text>
      </styled.div>
    </styled.div>
  )
}
