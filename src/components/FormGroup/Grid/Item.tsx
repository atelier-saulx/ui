import React, { FC, useMemo, ReactNode } from 'react'
import { border } from '../../../varsUtilities'
import { styled, Style } from 'inlines'
import { Label } from './Label'
import { RowSpaced, Input, Row } from '../../../components'
import { SettingGroupItem } from '../types'

export const Empty = styled('div', {
  minWidth: 350,
  width: 350,
})

export const Group: FC<{ children: ReactNode; style?: Style }> = ({
  children,
  style,
}) => {
  return (
    <RowSpaced
      style={{
        ...style,
        borderTop: border(1),
        marginLeft: -8,
        marginRight: -8,
        marginTop: 16,
        paddingTop: 8,
        flexWrap: 'wrap',
      }}
    >
      {children}
    </RowSpaced>
  )
}

export const SettingsField: FC<{
  item: SettingGroupItem
  value?: any
  style?: Style
  width?: number
  fieldWidth?: number
  onChange: (field: string, value: any) => void
}> = ({
  fieldWidth = 185,
  width = 160,
  item: {
    props,
    type,
    field,
    label,
    description,
    options,
    default: defaultValue,
  },
  value,
  style,
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

  if (typeof type === 'function') {
    return (
      <Label
        style={{
          margin: 8,
          marginBottom: 16,
          ...style,
        }}
        labelWidth={width}
        label={label}
        description={description}
      >
        <styled.div style={{ width: fieldWidth }}>
          {React.createElement(type, {
            value,
            onChange,
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
          margin: 8,
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

  if (type === 'range') {
    return (
      <Label
        style={{
          margin: 8,
          marginBottom: 16,
          ...style,
        }}
        labelWidth={width}
        label={label}
        description={description}
      >
        <Row style={{ minWidth: fieldWidth }}>
          <Input
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

  if (type === 'boolean') {
    return (
      <Input
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

  return (
    <Label
      style={{
        margin: 8,
        ...style,
      }}
      labelWidth={width}
      label={label}
      description={description}
    >
      {/* @ts-ignore FIX THIS TYPE */}
      <Input
        placeholder={label}
        value={value ?? ''}
        type={type || 'text'}
        onChange={(v) => onChange(field, v)}
        {...props}
        // @ts-ignore
        style={Object.assign(
          { minWidth: fieldWidth, width: '100%' },
          props?.style
        )}
      />
    </Label>
  )
}
