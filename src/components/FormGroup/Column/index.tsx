import React, { FC, ReactNode } from 'react'
import { Confirmation, Column } from '../../../components'
import { FormItem } from './Item'
import { getValue } from '../utils'
import { FormGroupVariantProps } from '../types'

import { ObjectItem } from '../ObjectItem'

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
  field,
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
        onChangeObj={onChange}
        objValues={values}
        hasChanges={hasChanges}
        valuesChanged={valuesChanged}
        setChanges={setChanges}
        alwaysAccept={alwaysAccept}
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
      {alwaysAccept || !hasChanges
        ? null
        : confirmationVariant !== 'none' && (
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
