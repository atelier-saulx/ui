import React, { FC, useMemo, useState } from 'react'
import { styled, Style } from 'inlines'
import { Label } from './Label'
import { FormItemProps } from '../types'
import { Input, Row, Text, Button, Badge, List } from '../..'
import { IconPlus, IconArrowheadRight } from '../../../icons'
import { color } from '../../../varsUtilities'

export const FormItem: FC<{
  item: FormItemProps
  value?: any
  autoFocus?: boolean
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
    validation,
    options,
    default: defaultValue,
    multiple,
    addMultipleLabel = 'Add',
  },
  autoFocus,
  fieldWidth,
  value,
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

  if (multiple && !value && !defaultValue) {
    value = ['']
  }
  const [open, setOpen] = useState(false)

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

  if (multiple) {
    return (
      <List
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
        error={isError}
        message={isError && isString ? validateResult : undefined}
        autoFocus={autoFocus}
        value={value ?? ''}
        //  @ts-ignore
        type={type || 'text'}
        onChange={(v) => onChange(field, v)}
        {...props}
        // @ts-ignore
        style={Object.assign({ width: '100%' }, props?.style)}
      />
    </Label>
  )
}
