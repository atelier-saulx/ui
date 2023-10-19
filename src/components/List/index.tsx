import React, { FC, useState, ReactNode } from 'react'
import { styled } from 'inlines'
import { IconArrowheadRight, IconPlus } from '../../icons'
import { Label } from '../FormGroup/Column/Label'
import { Badge, Button, Text, Input } from '../../components'
import { FormItemProps } from '../FormGroup/types'

export const List: FC<{
  type?: FormItemProps['type']
  field: string
  label?: ReactNode
  value?: any
  values?: any
  onChange: (field: string, value: any) => void
}> = ({ type, field, label, onChange, value, values }) => {
  const [open, setOpen] = useState(false)
  if (!value) {
    if (type === 'array') {
      value = ['']
      return
    } else {
      value = ''
      return
    }
  }
  const addType = type === 'array' ? [''] : ''
  // console.log('value', value, 'Asldkja;sldkj;alskdfj')
  console.log('value', value)

  return (
    <Label>
      <Text
        weight="strong"
        style={{ display: 'flex', gap: 4, alignItems: 'center' }}
      >
        {label}
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
      </Text>
      {type === 'array' ? (
        value.map((item, i) => (
          <List
            values={values}
            type={values.type}
            field={field + '.' + i}
            label={label}
            onChange={onChange}
            value={item.value}
          />
        ))
      ) : (
        <styled.div
          style={{ margin: '8px 0', '& > * + *': { marginTop: '8px' } }}
        >
          {value
            .filter((d, index) => index === 0)
            .map((v, index) => (
              <styled.div style={{ position: 'relative' }}>
                {!open && value.length > 1 && (
                  <styled.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      gap: 4,
                    }}
                  >
                    <Text selectable="none" style={{ opacity: 0 }}>
                      {v}
                      {/* {value.length > 1 ? v + ',' : v} */}
                    </Text>
                    <Badge light color="neutral">
                      {value.length}
                    </Badge>
                  </styled.div>
                )}
                <Input
                  // style={{ position: 'absolute' }}
                  onFocus={() => setOpen(true)}
                  key={index}
                  type={type === 'number' ? 'number' : 'text'}
                  clearButton
                  value={v}
                  // value={open ? v : value.length > 1 ? v + ',' : v}
                  onChange={(newStringValue) => {
                    const newValue =
                      type === 'number'
                        ? parseInt(newStringValue)
                        : newStringValue

                    if (!newStringValue && value.length > 1) {
                      onChange(
                        field,
                        value.filter((_, i) => i !== index)
                      )
                      return
                    }

                    const newFieldValue = [...value]
                    newFieldValue[index] = newValue
                    onChange(field, newFieldValue)
                  }}
                />
              </styled.div>
            ))}
          {open &&
            value
              .filter((d, index) => index !== 0)
              .map((v, index) => (
                <Input
                  key={index + 1}
                  type={type === 'number' ? 'number' : 'text'}
                  clearButton
                  value={v}
                  onChange={(newStringValue) => {
                    const newValue =
                      type === 'number'
                        ? parseInt(newStringValue)
                        : newStringValue

                    if (!newStringValue && value.length > 1) {
                      onChange(
                        field,
                        value.filter((_, i) => i !== index + 1)
                      )
                      return
                    }
                    const newFieldValue = [...value]
                    newFieldValue[index + 1] = newValue
                    onChange(field, newFieldValue)
                  }}
                />
              ))}
        </styled.div>
      )}

      <styled.div style={{ display: 'flex' }}>
        <Button
          color="system"
          size="small"
          hideFocusState
          icon={<IconPlus />}
          style={{ border: '1px solid transparent' }}
          onClick={() => {
            onChange(field, [...value, addType])
          }}
        >
          Add {label}
        </Button>
      </styled.div>
    </Label>
  )
}
