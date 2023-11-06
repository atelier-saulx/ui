import React, { FC, useMemo, useState } from 'react'
import { styled, Style } from 'inlines'
import { Label } from './Label'
import { FormItemProps, ValuesChanged } from '../types'
import { Input, Row, List, Toggle, Code, Button } from '../..'
import { ObjectItem } from '../ObjectItem'
import { IconClose } from 'src/icons'

// | 'timestamp'
// | 'record'
// | 'set'
// | 'reference'
// | 'references'
// | 'text'
// | 'cardinality'

const FormItemInner: FC<{
  item: FormItemProps
  value?: any
  autoFocus?: boolean
  width?: number
  fieldWidth?: number
  onChange: (field: string, value: any) => void
  onChangeObj: any
  objValues
  hasChanges: boolean
  valuesChanged: ValuesChanged
  setChanges: (val: boolean) => any
  alwaysAccept: boolean
}> = ({
  item: {
    props,
    type,
    field,
    label,
    description,
    validation,
    options,
    default: defaultValue,
    multiple,
    values,
    addMultipleLabel = 'Add',
    properties,
  },
  autoFocus,
  fieldWidth,
  value,
  onChange,
  item,
  onChangeObj,
  width,
  objValues,
  hasChanges,
  valuesChanged,
  setChanges,
  alwaysAccept,
}) => {
  if ((defaultValue && value === undefined) || value === '') {
    value = defaultValue
  }

  if (multiple && !value && !defaultValue) {
    value = ['']
  }

  if (multiple || type === 'array' || type === 'set') {
    return (
      <Label>
        <List
          item={item}
          values={values}
          onChangeObj={onChangeObj}
          onChange={onChange}
          field={field}
          label={label}
          type={type}
          value={value}
          hasChanges={hasChanges}
          valuesChanged={valuesChanged}
          setChanges={setChanges}
          alwaysAccept={alwaysAccept}
        />
      </Label>
    )
  }

  if (item.type === 'object') {
    const parsedObjArray = []
    if (properties) {
      for (const i in properties) {
        parsedObjArray.push({ ...properties[i], field: field + '.' + i })
      }
    }
    const objectArray = [
      ...new Set(
        parsedObjArray
          .map((item) => item.field.split('.')[0])
          .filter((e, i, a) => a.indexOf(e) !== i)
      ),
    ]

    return (
      <ObjectItem
        key={objectArray[0]}
        d={objectArray[0]}
        autoFocus={autoFocus}
        onChange={onChangeObj}
        labelWidth={width}
        fieldWidth={fieldWidth}
        onChangeField={onChange}
        style={{
          width: '100%',
        }}
        values={objValues}
        hasChanges={hasChanges}
        valuesChanged={valuesChanged}
        setChanges={setChanges}
        alwaysAccept={alwaysAccept}
        parsedObjArray={parsedObjArray}
        field={field}
      />
    )
  }

  if (typeof type === 'function') {
    return (
      <>
        {React.createElement(type, {
          // @ts-ignore
          value,
          onChange,
          autoFocus,
          type,
          field,
          label,
          description,
          validation,
          options,
          defaultValue,
          multiple,
          ...props,
        })}
      </>
    )
  }

  if (options) {
    return (
      <Input
        type="select"
        value={value}
        autoFocus={autoFocus}
        onChange={(v) => {
          onChange(field, v)
        }}
        options={options.map((value, i) => {
          if (typeof value !== 'object') {
            return { value: String(i), label: value }
          }
          return { value }
        })}
        {...props}
        // @ts-ignore
        style={props?.style}
      />
    )
  }

  if (type === 'json') {
    return (
      <Code
        onChange={(v) => onChange(field, v)}
        value={value}
        language="json"
      />
    )
  }

  if (type === 'boolean') {
    return (
      <Toggle
        defaultValue
        label={label}
        value={value}
        onChange={(v) => onChange(field, v)}
        // {...props}
        // @ts-ignore
        style={props?.style}
      />
    )
  }
  if (type === 'range') {
    return (
      <Row style={{ width: '100%' }}>
        <Input
          onChange={(v) => {
            onChange(field, {
              min: v,
              max: v > value?.max ? v : value?.max ?? v,
            })
          }}
          autoFocus={autoFocus}
          value={value?.min}
          type="number"
          placeholder="Min"
          {...props}
          // @ts-ignore
          style={Object.assign(
            { marginRight: 16, width: fieldWidth / 2 },
            props?.style
          )}
        />
        <Input
          onChange={(v) => {
            onChange(field, {
              max: v,
              min: v < value?.min ? v : value?.min ?? 0,
            })
          }}
          value={value?.max}
          type="number"
          placeholder="Max"
          {...props}
          // @ts-ignore
          style={Object.assign({ width: fieldWidth / 2 }, props?.style)}
        />
      </Row>
    )
  }

  if (type === 'checkbox') {
    return (
      <Input
        label={label}
        type="checkbox"
        value={value}
        autoFocus={autoFocus}
        onChange={(v) => onChange(field, v)}
        {...props}
        // @ts-ignore
        style={props?.style}
      />
    )
  }

  const validateResult = validation ? validation(value) : true
  const isString = typeof validateResult === 'string'
  const isError = isString ? true : !validateResult

  return (
    <Input
      integer={type === 'integer' ? true : undefined}
      error={isError}
      message={isError && isString ? validateResult : undefined}
      autoFocus={autoFocus}
      value={value ?? ''}
      clearButton
      //  @ts-ignore
      type={type === 'integer' ? 'number' : type === 'string' ? 'text' : type}
      onChange={(v) => onChange(field, v)}
      {...props}
      // @ts-ignore
      style={Object.assign({ width: '100%' }, props?.style)}
    />
  )
}

export const FormItem: FC<{
  item: FormItemProps
  value?: any
  autoFocus?: boolean
  width?: number
  fieldWidth?: number
  onChange: (field: string, value: any) => void
  onChangeObj: any
  objValues
  hasChanges: boolean
  valuesChanged: ValuesChanged
  setChanges: (val: boolean) => any
  alwaysAccept: boolean
  noLabel?: boolean
  deleteFunc?: () => void
}> = (props) => {
  let { label, field, type, options } = props.item

  if (
    options ||
    typeof type === 'function' ||
    props.noLabel ||
    type === 'array' ||
    type === 'range'
  )
    return (
      <span style={{ position: 'relative' }}>
        <FormItemInner {...props} />
        <styled.div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            top: 0,
            bottom: 0,
            right: 13,
          }}
        >
          {(props.value === '' || type === 'boolean') && (
            <IconClose onClick={props.deleteFunc}>placeholder</IconClose>
          )}
        </styled.div>
      </span>
    )

  if (!label) {
    label = useMemo(
      () => field[0].toUpperCase() + field.slice(1).replace('.', ' '),
      [field]
    )
  }

  return (
    <Label description={props.item.description} label={label}>
      <FormItemInner {...props} />
    </Label>
  )
}
