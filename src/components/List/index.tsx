import React, { FC, useState, ReactNode, useEffect } from 'react'
import { styled } from 'inlines'
import { IconArrowheadRight, IconClose, IconPlus } from '../../icons'
import { Label } from '../FormGroup/Column/Label'
import { Badge, Button, Text, Input } from '../../components'
import { FormItemProps } from '../FormGroup/types'
import { FormItem } from '../FormGroup/Column/Item'
import { setValue } from '../FormGroup/utils'

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

const NewInput = ({ index, setOpen, v, type, value, field, onChange }) => {
  return (
    <Input
      // style={{ position: 'absolute' }}
      onFocus={() => setOpen(true)}
      key={index}
      //@ts-ignore
      type={'text'}
      clearButton
      value={v}
      onChange={(newStringValue) => {
        const newValue =
          type === 'number' ? parseInt(newStringValue) : newStringValue

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
  )
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
}> = ({
  type = 'string',
  field,
  label,
  onChange,
  value = [],
  values,
  isChild = false,
  deleteFunc,
}) => {
  const [open, setOpen] = useState(false)
  const [prevValue, setValue] = useState(value)

  if (Object.keys(value).length > 0 && !Array.isArray(value)) {
    const newVal = Object.values(value)
    const key = parseInt(Object.keys(value)[0])
    const newValue = [...prevValue]
    newValue[key] = newVal[0]
    value = newValue
  }

  const thingy = () => {}

  const addType = type === 'array' || type === 'set' ? [] : ''
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
      {values.type === 'array' ||
      (values.type === 'set' && Array.isArray(value)) ? (
        <styled.div onClick={thingy}>
          {!open &&
            value
              .filter((v, i) => i === 0)
              .map((v, index) => (
                <styled.div style={{ position: 'relative' }} key={index}>
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
                        [{v}]
                      </Text>
                      <Badge light color="neutral">
                        {value.length}
                      </Badge>
                    </styled.div>
                  )}
                  <NewInput
                    field={field}
                    index={index}
                    onChange={onChange}
                    setOpen={setOpen}
                    type={type}
                    v={[v]}
                    value={value}
                  />
                </styled.div>
              ))}
          {Array.isArray(value) &&
            open &&
            value.map((item, index) => (
              <List
                key={index}
                deleteFunc={() =>
                  onChange(
                    field,
                    value.filter((_, i) => i !== index)
                  )
                }
                values={values.values}
                onChange={onChange}
                field={field + '.' + index}
                label={label}
                type={values.values.type}
                value={value[index]}
                isChild
              />
              // </span>
            ))}
        </styled.div>
      ) : (
        <styled.div
          style={{ margin: '8px 0', '& > * + *': { marginTop: '8px' } }}
        >
          {Array.isArray(value) &&
            value
              .filter((v, i) => i === 0)
              .map((v, index) => (
                <styled.div style={{ position: 'relative' }} key={index}>
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
                      </Text>
                      <Badge light color="neutral">
                        {value.length}
                      </Badge>
                    </styled.div>
                  )}
                  <NewInput
                    field={field}
                    index={index}
                    onChange={onChange}
                    setOpen={setOpen}
                    type={type}
                    v={v}
                    value={value}
                  />
                </styled.div>
              ))}
          {Array.isArray(value) &&
            open &&
            value
              .filter((d, index) => index !== 0)
              .map((v, index) => (
                <Input
                  key={index + 1}
                  //@ts-ignore
                  type={'text'}
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
