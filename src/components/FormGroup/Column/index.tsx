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

  const objectArray = [
    ...new Set(
      parsedData
        .map((item) => item.field.split('.')[0])
        .filter((e, i, a) => a.indexOf(e) !== i)
    ),
  ]

  const filteredArray = parsedData.filter(
    (item) => !objectArray.includes(item.field.split('.')[0])
  )
  // console.log(valuesChanged)

  for (const d of objectArray) {
    const parsedObjArray = parsedData.filter((i) => i.field.split('.')[0] === d)
    fields.push(
      <ObjectItem
        key={d}
        d={d}
        autoFocus={!hasAutoFocus && autoFocus}
        onChange={onChange}
        labelWidth={labelWidth}
        fieldWidth={fieldWidth}
        onChangeField={onChangeField}
        style={{
          ...style,
          width: '100%',
        }}
        hasChanges={hasChanges}
        valuesChanged={valuesChanged}
        values={values}
        setChanges={setChanges}
        alwaysAccept={alwaysAccept}
        parsedObjArray={parsedObjArray}
        field={field}
      />
    )
  }

  for (const d of filteredArray) {
    console.log(d)
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
