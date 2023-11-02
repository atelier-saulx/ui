import React, { FC, useState, ReactNode, useEffect } from 'react'
import { styled } from 'inlines'
import { IconArrowheadRight, IconClose, IconPlus } from '../../icons'
import { Label } from '../FormGroup/Column/Label'
import { Badge, Button, Text, Input } from '../../components'
import { FormItemProps } from '../FormGroup/types'
import { ObjectItem } from '../FormGroup/ObjectItem'
import { getValue } from '../FormGroup/utils'
import { FormItem } from '../FormGroup/Column/Item'

const genType = (type) => {
  return type === 'text' || type === 'string' || type === 'password'
    ? 'text'
    : type === 'number' || type === 'integer' || type === 'timestamp'
    ? 'number'
    : 'text'
}

export const List: FC<{
  type?: FormItemProps['type']
  field: string
  label?: ReactNode
  values?: FormItemProps['values']
  value?: any
  onChange: (field: string, value: any) => void
  isChild?: boolean
  deleteFunc?: () => void

  onChangeObj
  hasChanges
  valuesChanged
  setChanges
  alwaysAccept

  item
}> = ({
  type = 'string',
  field,
  label,
  onChange,
  value = [],
  values,
  isChild = false,
  deleteFunc,

  onChangeObj,
  hasChanges,
  valuesChanged,
  setChanges,
  alwaysAccept,

  item,
}) => {
  const [open, setOpen] = useState(false)
  const [prevValue, setValue] = useState(value)

  if (Object.keys(value).length > 0 && !Array.isArray(value)) {
    console.log(true)
    const newVal = Object.values(value)
    const key = parseInt(Object.keys(value)[0])
    const newValue = [...prevValue]
    newValue[key] = newVal[0]
    value = Object.values(newValue)
    onChange(field, value)
  }

  const addType = type === 'array' || type === 'set' ? [''] : ''

  return (
    <Label>
      <Text
        weight="strong"
        style={{
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          width: '100%',
        }}
      >
        {field}
        <Button
          hideFocusState
          size="small"
          light
          color="system"
          onClick={() => setOpen(!open)}
          style={{ border: '1px solid transparent' }}
          icon={
            <IconArrowheadRight
              color="default"
              style={{
                transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: '0.2s all',
              }}
            />
          }
        />
        {isChild && (
          <Button
            hideFocusState
            size="small"
            light
            color="system"
            onClick={deleteFunc}
            style={{
              border: '1px solid transparent',
              marginLeft: 'auto',
            }}
            icon={<IconClose color="default" />}
          />
        )}
      </Text>
      <styled.div
        style={{
          margin: '8px 0',
          '& > * + *': { marginTop: '8px' },
          gap: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {value
          .filter((_, i) => (open ? true : i === 0))
          .map((thing, index) => {
            const newField = field + '.' + index

            return (
              <span key={newField} onFocus={() => setOpen(true)}>
                <FormItem
                  noLabel
                  objValues={values}
                  item={{
                    ...thing,
                    properties: item.values.properties,
                    type: item.values.type,
                    values: item.values.values ?? {},
                    field: newField,
                  }}
                  onChange={onChange}
                  hasChanges={hasChanges}
                  valuesChanged={valuesChanged}
                  setChanges={setChanges}
                  alwaysAccept={alwaysAccept}
                  onChangeObj={onChangeObj}
                  value={value[index]}
                />
              </span>
            )
          })}
      </styled.div>
      <styled.div style={{ display: 'flex' }}>
        <Button
          color="system"
          size="small"
          hideFocusState
          icon={<IconPlus />}
          style={{ border: '1px solid transparent' }}
          onClick={() => {
            setOpen(true)
            onChange(field, [...value, addType])
          }}
        >
          Add {type as string}
        </Button>
      </styled.div>
    </Label>
  )
}
