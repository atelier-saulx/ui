import React, { FC, useMemo, useState } from 'react'
import { styled, Style } from 'inlines'
import { Label } from './Label'
import { FormItemProps } from '../types'
import {
  Input,
  Row,
  Text,
  Button,
  Badge,
  List,
  Toggle,
  Code,
  Modal,
  FormGroup,
} from '../..'
import { IconPlus, IconArrowheadRight } from '../../../icons'
import { color } from '../../../varsUtilities'

// | 'timestamp'
// | 'string'
// | 'object'
// | 'array'
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
  if (type === 'object' || (type === 'record' && !value && !defaultValue)) {
    value = {}
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

  if (type === 'object') {
    return (
      <Modal.Root>
        <Modal.Trigger>
          <Button onClick={() => console.log(value)}>
            Open Overlay: {label}
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          {({ close }) => {
            return (
              <>
                <Modal.Title>{label}</Modal.Title>
                {console.log(item)}
                <FormGroup
                  variant="grid"
                  config={properties}
                  values={value}
                  onChange={onChange}
                />
              </>
            )
          }}
        </Modal.Content>
      </Modal.Root>
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
        // onChange={(v) => onChange(field, v)}
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
