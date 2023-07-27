import React, { useEffect, useState } from 'react'
import { Label, Button, AddIcon, Input, Dialog, Style } from '~'
import { InputWrapper } from '../Input/InputWrapper'
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
  // console.log('Set type?', setType)

  console.log(value, ' value ?>')

  const itemType = setType
  const [arr, setArr] = useState(value)
  const [set, setSet] = useState<any>(new Set(arr))
  const { open } = useDialog()
  const [inputVal] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  // console.log(set, '?????')
  console.log(arr, 'ARr yo??')

  console.log(itemType, ' <-- Set items type')

  useEffect(() => {
    setArr(value)
    setSet(new Set(value))
  }, [value])

  useEffect(() => {
    console.log(set, '🏴❤️‍🔥')
    onChange(set)
  }, [arr])

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
              if (set.has(inputVAL)) {
                setErrorMessage(
                  'This item already exists in the set, none item was added'
                )
              } else {
                setErrorMessage('')
                set.add(inputVAL)
                setArr(Array.from(set))
                // console.log(set, '🏴‍☠️')
                // onChange({ type: 'set', set: set })
                //   onChange(Array.from(set))
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  const deleteSpecificItem = (item, id, set) => {
    const newSet = new Set(set)
    newSet.delete(item)
    setArr(Array.from(newSet))
    setSet(newSet)
    //    onChange(Array.from(newSet))
  }

  const editSpecificItem = async (item, idx, set) => {
    let inputVAL: number | string = ''
    await open(
      <Dialog label={`Edit ${arr[idx]} `}>
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
              if (inputVAL) {
                if (itemType === 'string') {
                  const editTempSet = set.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      return inputVAL
                    }
                    return item
                  })
                  onChange(editTempSet)
                  setArr(editTempSet)
                } else if (itemType === 'int') {
                  const editTempSet = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      // @ts-ignore
                      return parseInt(inputVAL)
                    }
                    return item
                  })
                  onChange(editTempSet)
                  setArr(editTempSet)
                } else if (itemType === 'float') {
                  const editTempSet = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      // @ts-ignore
                      return parseFloat(inputVAL)
                    }
                    return item
                  })
                  onChange(editTempSet)
                  setArr(editTempSet)
                } else if (itemType === 'digest') {
                  const editTempSet = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      // @ts-ignore
                      return inputVAL
                    }
                    return item
                  })
                  onChange(editTempSet)
                  setArr(editTempSet)
                }
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
