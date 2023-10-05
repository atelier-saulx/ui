import React, { FC, useMemo } from 'react'
import { styled, Style } from 'inlines'
import { Label } from './Label'
import { FormItemProps } from '../types'
import { Input, Row, Text } from '../..'

export const FormItem: FC<{
  item: FormItemProps
  value?: any
  style?: Style
  width?: number
  fieldWidth?: number
  onChange: (field: string, value: any) => void
}> = ({
  item: {
    props,
    type,
    field,
    label,
    description,
    options,
    default: defaultValue,
  },
  value,
  style,
  onChange,
}) => {
  if (!label) {
    label = useMemo(
      () => field[0].toUpperCase() + field.slice(1).replace('.', ' '),
      [field]
    )
  }

  if ((defaultValue && value === undefined) || value === '') {
    value = defaultValue
  }

  return (
    <Label
      style={{
        margin: 8,
        marginBottom: 16,
        ...style,
      }}
      label={label}
      description={description}
    >
      <Text>Something here...</Text>
    </Label>
  )
}
