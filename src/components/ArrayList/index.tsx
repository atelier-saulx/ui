import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, AddIcon, Dialog, Input, Text } from '~'
import { useDialog } from '~/components/Dialog'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SingleArrayListItem } from './SingleArrayListItem'

type ArrayListProps = {
  description?: string
  indent?: boolean
  disabled?: boolean
  style?: CSSProperties
  onChange?(ids: string[] | number[]): void
  value?: any[]
  arrayType?: any
  label?: string
}

export const ArrayList = ({
  description,
  indent,
  disabled,
  onChange,
  value = [],
  style,
  arrayType,
  ...props
}: ArrayListProps) => {
  const { open } = useDialog()
  const id = JSON.stringify(value)
  const [arr, setArr] = useState<any[]>([])
  const [draggingIndex, setDraggingIndex] = useState<number>()
  const ref = useRef<string>()
  const idsRef = useRef<any[]>()
  const [inputVal] = useState('')
  const [renderCounter, setRenderCounter] = useState(1)

  console.log(value, onChange, arrayType, 'from array')

  if (ref.current !== id) {
    // if the external value changed
    ref.current = id
    if (id !== JSON.stringify(arr)) {
      // console.log('change?!', id, arr)
      // and it's not the same as the internal value
      // => update the internal array
      value.forEach((item, i) => {
        arr[i] = item
      })
      arr.splice(value.length)
      // and clear the ids cache
      idsRef.current = null
    }
  }

  if (!idsRef.current) {
    // if no ids cache
    const set = new Set()
    // create an array of unique values to act as id
    idsRef.current = value.map((item) => {
      let cnt = 0
      while (set.has(item)) {
        item = `${item}-${cnt++}`
      }
      set.add(item)
      return item
    })
  }

  const ids = idsRef.current
  // console.log('ids', ids)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setRenderCounter((c) => c + 1)
  }, [arr.length, ids.length, idsRef.current.length])

  const onDragStart = ({ active }) => {
    setDraggingIndex(ids.indexOf(active.id))
  }

  const onDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id)
      const newIndex = ids.indexOf(over.id)
      // update the array
      const newArray = arrayMove(arr, oldIndex, newIndex)
      // update the ids
      idsRef.current = arrayMove(idsRef.current, oldIndex, newIndex)
      onChange(newArray)
      setArr(newArray)
    }

    setDraggingIndex(-1)
  }

  const itemType = arrayType

  const addItemHandler = async () => {
    let inputChanged: string | number = ''
    let inputToNumber: number

    const ok = await open(
      <Dialog
        label={`Add new ${
          itemType.charAt(0).toUpperCase() + itemType.slice(1)
        } `}
      >
        {itemType !== 'object' && (
          <Input
            type={
              itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
            }
            autoFocus
            value={inputVal}
            onChange={(e) => {
              inputChanged = e
              inputToNumber =
                typeof inputChanged === 'number'
                  ? inputChanged
                  : itemType === 'float'
                  ? parseFloat(inputChanged)
                  : parseInt(inputChanged)
            }}
          />
        )}

        {itemType === 'object' && (
          <div>
            <Text>Add a new object?</Text>
          </div>
        )}

        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (inputChanged && typeof ok !== 'boolean') {
                if (itemType === 'string') {
                  onChange([...arr, inputChanged])
                  setArr([...arr, inputChanged])
                  idsRef.current = [...idsRef.current, inputChanged]
                } else if (itemType === 'int') {
                  onChange([...arr, inputToNumber])
                  setArr([...arr, inputToNumber])
                  idsRef.current = [...idsRef.current, inputToNumber]
                } else if (itemType === 'float') {
                  onChange([...arr, inputToNumber])
                  setArr([...arr, inputToNumber])
                  idsRef.current = [...idsRef.current, inputToNumber]
                } else if (itemType === 'digest') {
                  onChange([...arr, inputChanged])
                  setArr([...arr, inputChanged])
                  idsRef.current = [...idsRef.current, inputChanged]
                }
              }
              if (itemType === 'object' && typeof ok !== 'boolean') {
                onChange([...arr, { test: 1 }])
                setArr([...arr, { test: 1 }])
                idsRef.current = [...idsRef.current, { test: 1 }]
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  const deleteSpecificItem = async (item, idx) => {
    arr.splice(idx, 1)
    idsRef.current = [...arr]
    onChange(arr)
    setRenderCounter((c) => c + 1)
  }

  const editSpecificItem = async (item, idx, arr) => {
    let inputVAL = ''
    await open(
      <Dialog label={`Edit ${arr[idx]} `}>
        <Input
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          autoFocus
          value={inputVal}
          onChange={(e) => {
            // TODO: fix this the same...
            inputVAL = String(e)
          }}
        />
        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (inputVAL) {
                // make a extra array to track the editid items
                if (itemType === 'string') {
                  const editTempArr = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      return inputVAL
                    }
                    return item
                  })
                  setArr(editTempArr)
                  onChange(editTempArr)
                } else if (itemType === 'int') {
                  const editTempArr = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      return parseInt(inputVAL)
                    }
                    return item
                  })
                  setArr(editTempArr)
                  onChange(editTempArr)
                } else if (itemType === 'float') {
                  const editTempArr = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      return parseFloat(inputVAL)
                    }
                    return item
                  })
                  setArr(editTempArr)
                  onChange(editTempArr)
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
      indent={indent}
      disabled={disabled}
      descriptionBottom={description}
      style={style}
      hideClearButton
    >
      <Label label={props.label} style={{ marginBottom: 12 }} />
      {renderCounter ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {ids?.map((id, idx) => {
              return (
                <SingleArrayListItem
                  id={id}
                  key={idx}
                  item={itemType !== 'object' ? arr[idx] : 'objectje'}
                  idx={idx}
                  itemType={itemType}
                  deleteSpecificItem={deleteSpecificItem}
                  editSpecificItem={editSpecificItem}
                  arr={arr}
                />
              )
            })}
          </SortableContext>

          {createPortal(
            <DragOverlay>
              {draggingIndex >= 0 ? (
                <SingleArrayListItem
                  id={ids[draggingIndex]}
                  item={
                    itemType !== 'object'
                      ? arr[draggingIndex]
                      : arr[draggingIndex].toString()
                  }
                  idx={draggingIndex}
                  itemType={itemType}
                  deleteSpecificItem={deleteSpecificItem}
                  editSpecificItem={editSpecificItem}
                  arr={arr}
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      ) : null}

      <Button
        ghost
        icon={AddIcon}
        style={{ marginBottom: 8 }}
        onClick={addItemHandler}
      >
        Add{' '}
        {itemType === 'string'
          ? 'String'
          : itemType === 'int'
          ? 'Integer'
          : itemType === 'float'
          ? 'Float'
          : itemType === 'digest'
          ? 'Digest'
          : itemType === 'object'
          ? 'Object'
          : 'item'}
      </Button>
    </InputWrapper>
  )
}
