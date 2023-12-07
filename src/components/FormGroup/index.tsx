import React, { FC, useRef, useState } from 'react'
import { useUpdate, useWindowResize } from '../../hooks'
import { setValue, equalChanges, parseData } from './utils'
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
  confirmationLabel,
  confirmationVariant,
  variant = 'column',
  autoFocus,
  labelWidth = 160,
  fieldWidth = 185,
}) => {
  const valuesChanged = useRef<ValuesChanged>({})
  const { width } = useWindowResize()
  const [hasChanges, setChanges] = useState(false)
  const update = useUpdate()

  const onChangeField: OnChangeField = (field, value) => {
    if (alwaysAccept) {
      // valuesChanged.current = {}
      setValue(field, valuesChanged.current, value)
      onChange(valuesChanged.current)
      update()
      // const newV = {}
      // setValue(field, newV, value)
      // onChange(newV)
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

  const parsedData = parseData(config)

  if (variant === 'grid' && width >= 480) {
    return (
      <FormGroupGrid
        autoFocus={autoFocus}
        onChange={onChange}
        confirmationVariant={confirmationVariant}
        confirmationLabel={confirmationLabel}
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
      confirmationLabel={confirmationLabel}
      confirmationVariant={confirmationVariant}
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
