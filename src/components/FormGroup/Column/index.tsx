import React, { FC, ReactNode } from 'react'
import { border } from '../../../varsUtilities'
import { Text, Confirmation, RowEnd, Row, Column, Button } from '../..'
import { FormItem } from './Item'
import { getValue } from '../utils'
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
  autoFocus,
  style,
  confirmationLabel,
  confirmationVariant,
}) => {
  const fields: ReactNode[] = []
  let hasAutoFocus = false

  for (const d of parsedData) {
    fields.push(
      <FormItem
        autoFocus={!hasAutoFocus && autoFocus}
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
    hasAutoFocus = true
  }

  return (
    <Column
      style={{
        width: '100%',
        ...style,
      }}
    >
      {fields}
      {alwaysAccept || !hasChanges ? null : (
        <Confirmation
          label={confirmationLabel}
          variant={confirmationVariant}
          onCancel={() => {
            valuesChanged.current = {}
            setChanges(false)
          }}
          onConfirm={async () => {
            await onChange(valuesChanged.current)
            valuesChanged.current = {}
            setChanges(false)
          }}
        />
      )}
    </Column>
  )
}
