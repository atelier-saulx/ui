import React, { FC } from 'react'
import { Checkbox } from '.'
import { Text, styled, color as genColor } from '../..'
import { CheckboxItemProps } from '../../types'

export const CheckboxItem: FC<CheckboxItemProps> = ({
  label,
  description,
  active,
  indeterminate,
  onClick,
  style,
  warning,
  disabled,
}) => {
  return (
    <styled.div style={{ display: 'flex', ...style }}>
      <Checkbox
        active={active}
        indeterminate={indeterminate}
        onClick={onClick}
        warning={warning}
        disabled={disabled}
        style={{ marginTop: '4px', marginRight: '12px' }}
      />
      <styled.div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text color="default">{label}</Text>
        <Text
          style={{
            color: genColor('content', 'default', 'secondary'),
          }}
        >
          {description}
        </Text>
      </styled.div>
    </styled.div>
  )
}
