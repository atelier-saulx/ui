import React, { FC, useState, ReactNode } from 'react'
import { styled } from 'inlines'
import { IconArrowheadRight, IconClose, IconPlus } from '../../icons'
import { Badge, Button, Text } from '../../components'
import { FormItemProps } from '../FormGroup/types'
import { FormItem } from '../FormGroup/Column/Item'

export const List: FC<{
  type?: FormItemProps['type']
  field: string
  label?: ReactNode
  items?: FormItemProps['items']
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
  items,
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
    const newVal = Object.values(value)
    const key = parseInt(Object.keys(value)[0])
    const newValue = [...prevValue]
    newValue[key] = newVal[0]
    value = Object.values(newValue)
    onChange(field, value)
  }

  const addType =
    items.type === 'object'
      ? {}
      : items.type === 'array' || items.type === 'set'
      ? ['']
      : ''

  return (
    <>
      <Text
        onClick={() => console.log(value)}
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
        {!open && items.type === 'array' && value.length > 1 && (
          <Badge style={{ marginLeft: 4 }} color="neutral" light>
            +{value.length}
          </Badge>
        )}
        {isChild && (
          <Button
            // hideFocusState
            size="small"
            // light
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
              <span
                key={newField}
                onFocus={() => setOpen(true)}
                style={{ position: 'relative' }}
              >
                {!open && items.type !== 'array' && value.length > 1 && (
                  <styled.div
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      inset: 0,
                      gap: 8,
                      color: 'transparent',
                      padding: 12,
                      overflow: 'hidden',
                      paddingLeft:
                        items.type === 'boolean' || items.type === 'checkbox'
                          ? 70
                          : 12,
                    }}
                  >
                    <Text
                      style={{
                        height: '100%',
                        marginLeft: 0,
                        overflow: 'hidden',
                        maxWidth: 'calc(100% - 60px)',
                      }}
                      color="inherit"
                    >
                      {items.type !== 'object' ? value[0] : ''}
                    </Text>
                    <Badge color="neutral" light>
                      +{value.length}
                    </Badge>
                  </styled.div>
                )}
                <FormItem
                  key={newField}
                  noLabel
                  objValues={items}
                  item={{
                    ...thing,
                    properties: item.items.properties,
                    type: item.items.type,
                    items: item.items.items ?? {},
                    field: newField,
                  }}
                  onChange={onChange}
                  hasChanges={hasChanges}
                  valuesChanged={valuesChanged}
                  setChanges={setChanges}
                  alwaysAccept={alwaysAccept}
                  onChangeObj={onChangeObj}
                  style={{ backgroundColor: 'red' }}
                  value={value[index]}
                  deleteFunc={() => {
                    onChange(
                      field,
                      value.filter((_, i) => i !== index)
                    )
                  }}
                />
                {items.type === 'array' ||
                  (items.type === 'object' && (
                    <styled.div
                      style={{
                        position: 'absolute',
                        top: '0',
                        right: 8,
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconClose
                        onClick={() => {
                          onChange(
                            field,
                            value.filter((_, i) => i !== index)
                          )
                        }}
                      />
                    </styled.div>
                  ))}
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
          Add {items.type as string}
        </Button>
      </styled.div>
    </>
  )
}
