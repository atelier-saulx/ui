import React, { FC, useMemo } from 'react'
import { styled, Style } from 'inlines'
import { Label } from './Label'
import { FormItemProps, ValuesChanged } from '../types'
import { Code, Input, Row, Toggle } from '../..'
import { List } from '../..'
import { ObjectItem } from '../ObjectItem'
// }> = ({
// item: {

// },

export const FormItemInner: FC<{
  item: FormItemProps
  autoFocus?: boolean
  value?: any
  style?: Style
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
  fieldWidth = 185,
  width = 160,
  autoFocus,
  item: {
    validation,
    props,
    type,
    field,
    label,
    description,
    options,
    default: defaultValue,
    multiple,
    items,
    addMultipleLabel = 'Add',
    properties,
    meta,
  },
  value,
  onChange,
  item,
  onChangeObj,
  objValues,
  hasChanges,
  valuesChanged,
  setChanges,
  alwaysAccept,
  style,
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

  if (multiple || type === 'array' || type === 'set') {
    return (
      <styled.div style={{ width: '100%', marginBottom: 16 }}>
        <List
          item={item}
          items={items}
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
      </styled.div>
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
      <Label
        style={{
          marginBottom: 16,
          ...style,
        }}
        labelWidth={width}
        label={label}
        description={description}
      >
        <styled.div style={{ width: fieldWidth }}>
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
            ...props,
          })}
        </styled.div>
      </Label>
    )
  }

  if (options) {
    return (
      <Label
        style={{
          marginBottom: 16,
          ...style,
        }}
        labelWidth={width}
        label={label}
        description={description}
      >
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
          style={Object.assign({ width: fieldWidth }, props?.style)}
        />
      </Label>
    )
  }
  if (type === 'json') {
    return (
      <styled.div style={{ width: '100%', marginBottom: 16 }}>
        <Label labelWidth={width} label={label} description={description} />
        {meta?.format === 'rich-text' ? (
          // @ts-ignore
          <Input
            autoFocus={autoFocus}
            value={JSON.parse(value) ?? ''}
            type={'rich-text'}
            onChange={({ json }) => onChange(field, json)}
            {...props}
          />
        ) : (
          <Code
            onChange={(v) => onChange(field, v)}
            value={value}
            language="json"
          />
        )}
      </styled.div>
      // </Label>
    )
  }

  if (type === 'boolean') {
    return (
      <Toggle
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
      <Label
        style={{
          marginBottom: 16,
          ...style,
        }}
        labelWidth={width}
        label={label}
        description={description}
      >
        <Row style={{ minWidth: fieldWidth }}>
          <Input
            autoFocus={autoFocus}
            onChange={(v) => {
              onChange(field, {
                min: v,
                max: v > value?.max ? v : value?.max ?? v,
              })
            }}
            value={value?.min}
            type="number"
            placeholder="Min"
            {...props}
            // @ts-ignore
            style={Object.assign(
              { width: (fieldWidth - 9) / 2, marginRight: 9 },
              props?.style
            )}
          />
          <Input
            autoFocus={autoFocus}
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
            style={Object.assign({ width: (fieldWidth - 9) / 2 }, props?.style)}
          />
        </Row>
      </Label>
    )
  }

  if (type === 'checkbox') {
    return (
      <Input
        autoFocus={autoFocus}
        type="checkbox"
        value={value}
        onChange={(v) => onChange(field, v)}
        label={label}
        {...props}
        // @ts-ignore
        style={Object.assign(
          { marginBottom: 16, marginRight: 32 },
          props?.style
        )}
      />
    )
  }

  const validateResult = validation ? validation(value) : true
  const isString = typeof validateResult === 'string'
  const isError = isString ? true : !validateResult

  if (type === 'file') {
    return (
      <styled.div
        style={{
          marginBottom: 16,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: fieldWidth * 2,
        }}
      >
        <Label
          labelWidth={width - 10}
          label={label}
          description={description}
        />
        <Input
          error={isError}
          message={isError && isString ? validateResult : undefined}
          autoFocus={autoFocus}
          // value={value ?? ''}
          // @ts-ignore
          type={type}
          onChange={(v) => onChange(field, v)}
          {...props}
          // @ts-ignore
          style={Object.assign(
            { minWidth: fieldWidth, width: '100%' },
            props?.style
          )}
        />
      </styled.div>
    )
  }

  return (
    <Input
      error={isError}
      message={isError && isString ? validateResult : undefined}
      autoFocus={autoFocus}
      value={value ?? ''}
      // @ts-ignore
      type={
        // @ts-ignore
        type === 'integer' || type === 'timestamp' || type === 'int'
          ? 'number'
          : // @ts-ignore
          type === 'string' ||
            type === 'id' ||
            type === 'reference' ||
            //@ts-ignore
            type === 'url'
          ? 'text'
          : type
      }
      onChange={(v) => onChange(field, v)}
      {...props}
      // @ts-ignore
      style={Object.assign(
        { minWidth: fieldWidth, width: '100%' },
        props?.style
      )}
    />
  )
}

export const FormItem: FC<{
  item: FormItemProps
  value?: any
  autoFocus?: boolean
  meta?: any
  width?: number
  fieldWidth?: number
  onChange: (field: string, value: any) => void
  onChangeObj: any
  objValues
  hasChanges: boolean
  valuesChanged: ValuesChanged
  setChanges: (val: boolean) => any
  alwaysAccept: boolean
  style?: Style
  noLabel?: boolean
}> = (props) => {
  let { label, field, type, options } = props.item

  //@ts-ignore
  if (type === 'int') {
    type = 'integer'
  }

  if (
    //@ts-ignore
    type === 'id' ||
    //@ts-ignore
    type === 'int' ||
    type === 'references'
  ) {
    return <></>
  }

  if (
    options ||
    typeof type === 'function' ||
    props.noLabel ||
    type === 'array' ||
    type === 'json' ||
    type === 'range' ||
    type === 'file'
  )
    return <FormItemInner {...props} />

  if (!label) {
    label = useMemo(
      () => field[0].toUpperCase() + field.slice(1).replace('.', ' '),
      [field]
    )
  }

  return (
    <Label
      description={props.item.description}
      label={label}
      style={props.style}
      labelWidth={props.width ?? 160}
    >
      <FormItemInner {...props} />
    </Label>
  )
}
