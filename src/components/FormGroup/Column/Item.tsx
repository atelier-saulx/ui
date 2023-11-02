import React, { FC, useMemo, useState } from 'react'
import { styled, Style } from 'inlines'
import { Label } from './Label'
import { FormItemProps, ValuesChanged } from '../types'
import { Input, Row, List, Toggle, Code } from '../..'
import { ObjectItem } from '../ObjectItem'

// | 'timestamp'
// | 'record'
// | 'set'
// | 'reference'
// | 'references'
// | 'text'
// | 'cardinality'

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
  // if (!label) {
  //   label = useMemo(
  //     () => field[0].toUpperCase() + field.slice(1).replace('.', ' '),
  //     [field]
  //   )
  // }

  // if (item.type === 'array' || item.type === 'set') {
  //   const parsedArr = []
  //   console.log(item)
  //   if (item?.values) {
  //     for (const i in item?.values) {
  //       parsedArr.push({ ...item.values[i], field: field + '.' + i })
  //     }
  //   }
  //   console.log(parsedArr)
  // }

  if (item.type === 'object') {
    const parsedObjArray = []
    const obj = item as { properties: { key: string } }
    if (obj?.properties) {
      for (const i in obj?.properties) {
        parsedObjArray.push({ ...obj.properties[i], field: field + '.' + i })
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

  if (!label) {
    label = useMemo(
      () => [
        field.split('.').slice(-1)[0][0].toUpperCase(),
        field.split('.').slice(-1)[0].substring(1),
      ],
      [field]
    )
  }

  if ((defaultValue && value === undefined) || value === '') {
    value = defaultValue
  }

  if (multiple && !value && !defaultValue) {
    value = ['']
  }

  if (typeof type === 'function') {
    return (
      <Label label={label} description={description}>
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
      </Label>
    )
  }

  if (options) {
    return (
      <Label label={label} description={description}>
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
      </Label>
    )
  }

  if (type === 'json') {
    return (
      <Label label={label} description={description}>
        <Code
          onChange={(v) => onChange(field, v)}
          value={value}
          language="json"
        />
      </Label>
    )
  }

  if (type === 'boolean') {
    return (
      <Label description={description} label={label}>
        <Toggle
          defaultValue
          label={label}
          value={value}
          onChange={(v) => onChange(field, v)}
          // {...props}
          // @ts-ignore
          style={props?.style}
        />
      </Label>
    )
  }
  if (type === 'range') {
    return (
      <Label label={label} description={description}>
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
      </Label>
    )
  }

  if (type === 'checkbox') {
    return (
      <Label description={description}>
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
      </Label>
    )
  }

  if (multiple || type === 'array' || type === 'set') {
    return (
      <List
        values={values}
        onChange={onChange}
        field={field}
        label={label}
        type={type}
        value={value}
      />
    )
  }

  const validateResult = validation ? validation(value) : true
  const isString = typeof validateResult === 'string'
  const isError = isString ? true : !validateResult

  return (
    <Label label={label} description={description}>
      {/* @ts-ignore FIX THIS TYPE */}
      <Input
        integer={type === 'integer' ? true : undefined}
        error={isError}
        message={isError && isString ? validateResult : undefined}
        autoFocus={autoFocus}
        value={value ?? ''}
        //  @ts-ignore
        type={type === 'integer' ? 'number' : type || 'text'}
        onChange={(v) => onChange(field, v)}
        {...props}
        // @ts-ignore
        style={Object.assign({ width: '100%' }, props?.style)}
      />
    </Label>
  )
}
