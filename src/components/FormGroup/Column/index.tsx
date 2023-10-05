import React, { FC, ReactNode } from 'react'
import { border } from '../../../varsUtilities'
import { Text, Confirmation, RowEnd, Row, RowSpaced, Column } from '../..'
import { FormItem } from './Item'
import { getValue } from '../utils'
import { Style, styled } from 'inlines'
import { FormGroupVariantProps } from '../types'

export const FormGroupColumn: FC<FormGroupVariantProps> = ({
  onChange,
  parsedData,
  fieldWidth,
  onChangeField,
  labelWidth,
  hasChanges,
  valuesChanged,
  values,
  alwaysAccept,
  setChanges,
  style,
}) => {
  const fields: ReactNode[] = []

  for (const d of parsedData) {
    fields.push(
      <FormItem
        fieldWidth={fieldWidth}
        width={labelWidth}
        key={d.field}
        item={d}
        onChange={onChangeField}
        value={
          hasChanges
            ? getValue(d.field, valuesChanged.current) ??
              d.value ??
              getValue(d.field, values)
            : d.value ?? getValue(d.field, values)
        }
      />
    )
  }

  return <Column style={style}>{fields}</Column>
}
