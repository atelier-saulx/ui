import React, { useState, useEffect } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { Button, AddIcon, Label, styled, Style, Text, Dialog, Input } from '~'
import { useDialog } from '~/components/Dialog'
import { SingleSetListItem } from './SingleSetListItem'

type SetListProps = {
  description?: string
  disabled?: boolean
  indent?: boolean
  onChange?(items: {}): void
  value?: any
  setType?: any
  style?: Style
  label?: string
}

export const SetList = ({
  description,
  onChange,
  disabled,
  indent,
  value,
  setType,
  label,
  style,
  ...props
}: SetListProps) => {
  const itemType = setType

  const [arr, setArr] = useState(value || [])
  const { open } = useDialog()
  const [inputVal] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  if (itemType === 'string') {
    arr.sort()
  } else {
    arr.sort((a, b) => a - b)
  }

  // console.log('INCOMING ARR', arr)

  // useEffect(() => {
  //   console.log('ARR from Component --> ', arr)
  // }, [arr])

  const addItemHandler = async () => {
    let inputVAL: number | string = ''
    open(
      <Dialog label="Add new item to the set">
        <Input
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          autoFocus
          label={`Add new ${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
          } `}
          value={inputVal}
          onChange={(e) => {
            inputVAL = e
          }}
        />
        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (typeof inputVAL === 'number') {
                // do nothing...
              } else if (itemType === 'int') {
                inputVAL = parseInt(inputVAL)
              } else if (itemType === 'float') {
                inputVAL = parseFloat(inputVAL)
              }
              if (arr?.includes(inputVAL)) {
                setErrorMessage(
                  'This item already exists in the set, none item was added'
                )
              } else {
                setErrorMessage('')
                setArr([...arr, inputVAL])
                onChange([...arr, inputVAL])
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  const deleteSpecificItem = (item, id) => {
    const index = arr.indexOf(item)

    console.log('🏵', item, index)

    const newArr = [...arr]
    newArr.splice(index, 1)
    setArr([...newArr])
    onChange(newArr)
  }

  const editSpecificItem = async (item, id) => {
    let inputVAL: number | string = ''
    await open(
      <Dialog label={`Edit ${arr[id]} `}>
        <Input
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          autoFocus
          value={inputVal}
          onChange={(e) => {
            inputVAL = e
          }}
        />
        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (arr.includes(inputVAL)) {
                setErrorMessage(
                  'This item already exists in the set, none item was added'
                )
              } else if (inputVAL && !arr.includes(inputVAL)) {
                setErrorMessage('')
                const index = arr.indexOf(item)

                const newArr = [...arr]
                newArr.splice(index, 1)
                newArr.push(inputVAL)

                console.log(' edit this inputValue --> id', index, inputVAL)

                setArr([...newArr])
                onChange(newArr)
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  return (
    <InputWrapper
      label={label}
      indent={indent}
      style={{ ...style }}
      disabled={disabled}
      descriptionBottom={description}
      errorMessage={errorMessage}
    >
      {/* @ts-ignore */}
      <Label label={props.label} style={{ marginBottom: 12 }} />
      {arr &&
        arr?.map((item, i) => (
          <SingleSetListItem
            item={item}
            key={i}
            id={i}
            itemType={itemType}
            deleteSpecificItem={deleteSpecificItem}
            editSpecificItem={editSpecificItem}
            arr={arr}
          />
        ))}
      <Button ghost icon={AddIcon} onClick={() => addItemHandler()}>
        Add{' '}
        {itemType === 'string'
          ? 'String'
          : itemType === 'int'
          ? 'Integer'
          : itemType === 'float'
          ? 'Float'
          : itemType === 'digest'
          ? 'Digest'
          : 'item'}
      </Button>
    </InputWrapper>
  )
}
