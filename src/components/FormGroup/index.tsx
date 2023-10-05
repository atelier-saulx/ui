import React, { FC, useRef, useState } from 'react'
import { useUpdate } from '../../hooks'
import { setValue, equalChanges } from './utils'
import {
  FormGroupProps,
  OnChangeField,
  ValuesChanged,
  FormItemProps,
} from './types'
import { FormGroupGrid } from './Grid'
import { FormGroupColumn } from './Column'

export const FormGroup: FC<FormGroupProps> = ({
  onChange,
  config = [],
  style,
  alwaysAccept,
  values,
  variant = 'column',
  autoFocus,
  // only relevant for grid
  labelWidth = 160,
  fieldWidth = 185,
}) => {
  const valuesChanged = useRef<ValuesChanged>({})

  const [hasChanges, setChanges] = useState(false)
  const update = useUpdate()

  const onChangeField: OnChangeField = (field, value) => {
    if (alwaysAccept) {
      const newV = {}
      setValue(field, newV, value)
      onChange(newV)
    } else {
      setChanges(true)
      setValue(field, valuesChanged.current, value)
      if (values && equalChanges(valuesChanged.current, values)) {
        setChanges(false)
      } else {
        update()
      }
    }
  }

  let parsedData: FormItemProps[]

  if (!Array.isArray(config)) {
    parsedData = []
    for (const field in config) {
      const item = config[field]
      if (item === null) {
        continue
      }
      if (typeof item === 'object' && !React.isValidElement(item)) {
        /* @ts-ignore FIX THIS TYPE */
        parsedData.push({ ...item, field })
      } else {
        parsedData.push({
          field,
          label: item,
        })
      }
    }
  } else {
    parsedData = config
  }

  if (variant === 'grid') {
    return (
      <FormGroupGrid
        autoFocus={autoFocus}
        onChange={onChange}
        parsedData={parsedData}
        labelWidth={labelWidth}
        fieldWidth={fieldWidth}
        onChangeField={onChangeField}
        style={style}
        hasChanges={hasChanges}
        valuesChanged={valuesChanged}
        values={values}
        setChanges={setChanges}
        alwaysAccept={alwaysAccept}
      />
    )
  }

  return (
    <FormGroupColumn
      autoFocus={autoFocus}
      onChange={onChange}
      parsedData={parsedData}
      labelWidth={labelWidth}
      fieldWidth={fieldWidth}
      onChangeField={onChangeField}
      style={style}
      hasChanges={hasChanges}
      valuesChanged={valuesChanged}
      values={values}
      setChanges={setChanges}
      alwaysAccept={alwaysAccept}
    />
  )
}
