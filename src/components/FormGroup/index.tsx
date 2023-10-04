import React, { FC, useMemo, ReactNode, useRef, useState } from 'react'
import { useUpdate } from '../../hooks'
import { border } from '../../varsUtilities'
import { styled, Style } from 'inlines'
import { Label } from './Label'
import {
  RowSpaced,
  Input,
  Text,
  Confirmation,
  RowEnd,
  Row,
} from '../../components'

const Empty = styled('div', {
  minWidth: 350,
  width: 350,
})

const Group: FC<{ children: ReactNode; style?: Style }> = ({
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
  item: { type, field, label, description, options, default: defaultValue },
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
          style={{ width: fieldWidth }}
          onChange={(v) => {
            onChange(field, v)
          }}
          options={options}
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
            style={{ width: 90, marginRight: 8 }}
            type="number"
            placeholder="Min"
          />
          <Input
            onChange={(v) => {
              onChange(field, {
                max: v,
                min: v < value?.min ? v : value?.min ?? 0,
              })
            }}
            value={value?.max}
            style={{ width: 90 }}
            type="number"
            placeholder="Max"
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
        style={{
          marginBottom: 16,
          marginRight: 32,
        }}
        label={label}
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
        style={{ minWidth: fieldWidth, width: '100%' }}
        placeholder={label}
        value={value ?? ''}
        type={type || 'text'}
        onChange={(v) => onChange(field, v)}
      />
    </Label>
  )
}

export type SettingGroupItem = {
  label?: ReactNode
  value?: any
  type?: 'number' | 'text' | 'range' | 'boolean'
  description?: ReactNode
  field: string
  options?: any[]
  default?: any
}

export type FormGroupProps = {
  style?: Style
  fieldWidth?: number
  labelWidth?: number
  onChange: (changes: { [field: string]: any }) => void | Promise<void>
  values?: { [field: string]: any }
  data?:
    | SettingGroupItem[]
    | {
        [field: string]:
          | null
          | ReactNode
          | (Omit<SettingGroupItem, 'field'> & { field?: string })
      }
  alwaysAccept?: boolean
}

const getValue = (field, values?: { [field: string]: any }): any => {
  const path = field.split('.')
  let v = values
  for (const f of path) {
    if (v === undefined || v === null) {
      return undefined // or emptty string...
    }
    v = v[f]
  }
  return v
}

const setValue = (field, values: { [field: string]: any }, value: any) => {
  const path = field.split('.')
  let v = values
  for (let i = 0; i < path.length - 1; i++) {
    const f = path[i]
    v = v[f] ?? (v[f] = {})
  }
  v[path[path.length - 1]] = value
}

const emptyDivs = (arr: ReactNode[]) => {
  for (let i = 0; i < 5; i++) {
    arr.push(<Empty key={'e' + i} />)
  }
}

const equalChanges = (
  changes: { [key: string]: any },
  values: { [key: string]: any }
): boolean => {
  for (const key in changes) {
    const c = changes[key]
    const v = values[key]
    const cType = typeof c
    const vType = typeof v
    if (cType !== vType) {
      return false
    }
    if (cType === 'object' && c !== null) {
      if (v === null) {
        return false
      }
      if (!equalChanges(c, v)) {
        return false
      }
    } else if (c !== v) {
      return false
    }
  }
  return true
}

export const FormGroup: FC<FormGroupProps> = ({
  onChange,
  data = [],
  style,
  alwaysAccept,
  labelWidth = 160,
  fieldWidth = 185,
  values,
}) => {
  const valuesChanged = useRef<{ [field: string]: any }>({})

  const [hasChanges, setChanges] = useState(false)
  const update = useUpdate()

  const onChangeField = (field: string, value: any) => {
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

  let parsedData: SettingGroupItem[]

  if (!Array.isArray(data)) {
    parsedData = []
    for (const field in data) {
      const item = data[field]
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
    parsedData = data
  }

  const checkBoxes: ReactNode[] = []
  const rest: ReactNode[] = []

  for (const d of parsedData) {
    if (d.type === 'boolean') {
      checkBoxes.push(
        <SettingsField
          fieldWidth={fieldWidth}
          width={labelWidth}
          key={d.field}
          item={d}
          onChange={onChangeField}
          value={
            d.value ??
            (hasChanges
              ? getValue(d.field, valuesChanged.current) ??
                d.value ??
                getValue(d.field, values)
              : getValue(d.field, values))
          }
        />
      )
    } else {
      rest.push(
        <SettingsField
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
    }
  }

  if (rest.length) {
    emptyDivs(rest)
  }

  if (checkBoxes.length) {
    emptyDivs(checkBoxes)
  }

  return (
    <Group style={style}>
      {rest}
      {checkBoxes.length && rest.length ? (
        <Row
          style={{
            width: '100%',
            borderTop: border(1),
            marginTop: 16,
            padding: 8,
            paddingTop: 16,
            flexWrap: 'wrap',
          }}
        >
          {checkBoxes}
        </Row>
      ) : (
        checkBoxes
      )}
      {alwaysAccept || !hasChanges ? null : (
        <RowEnd
          style={{
            borderTop: border(1),
            width: '100%',
            marginTop: 16,
            paddingTop: 16,
            marginRight: 8,
          }}
        >
          <Text light>Apply changes</Text>
          <Confirmation
            onCancel={() => {
              valuesChanged.current = {}
              setChanges(false)
            }}
            onAccept={async () => {
              await onChange(valuesChanged.current)
              valuesChanged.current = {}
              setChanges(false)
            }}
          />
        </RowEnd>
      )}
    </Group>
  )
}
