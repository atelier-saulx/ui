import React, { CSSProperties, useEffect } from 'react'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, AddIcon, usePropState } from '~'
import { useDialog } from '~/components/Dialog'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
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
  space?: Space
  onChange?(items: string[] | number[]): void
}

export const ArrayList = ({
  description,
  indent,
  disabled,
  onChange,
  space,
  ...props
}: ArrayListProps) => {
  const { prompt } = useDialog()

  // @ts-ignore
  const [arr, setArr] = usePropState(props?.value)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    onChange(arr)
  }, [arr])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setArr((arr) => {
        const oldIndex = arr.indexOf(active.id)
        const newIndex = arr.indexOf(over.id)
        // @ts-ignore
        onChange(arrayMove(arr, oldIndex, newIndex))
        return arrayMove(arr, oldIndex, newIndex)
      })
    }
  }
  // @ts-ignore
  const itemType = props?.schema?.items.type

  const addItemHandler = async () => {
    const ok = await prompt(
      `Add new ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} `
    )

    // als er nog geen array is
    if (ok && typeof ok !== 'boolean') {
      if (itemType === 'string') {
        onChange([ok])
      }
      if (itemType === 'int') {
        onChange([parseInt(ok)])
      }
      if (itemType === 'float') {
        onChange([parseFloat(ok)])
      }
    }

    // als er wel al een begin-array is
    if (ok && typeof ok !== 'boolean') {
      if (itemType === 'string') {
        onChange([...arr, ok])
      }
      if (itemType === 'int') {
        onChange([...arr, parseInt(ok)])
      }
      if (itemType === 'float') {
        onChange([...arr, parseFloat(ok)])
      }
    }
  }

  const deleteSpecificItem = async (idx) => {
    setArr((arr) => arr.filter((item, index) => index !== idx))
  }

  // Wat als het een integer is
  const editSpecificItem = async (idx) => {
    const editText = await prompt(`Edit ${arr[idx]} `)
    const resolved = Promise.resolve(editText)

    resolved.then((value) => {
      // do something with the value based on the type
      if (itemType === 'string') {
        if (value !== false) {
          setArr((arr) =>
            arr.map((item) => {
              if (item === arr[idx]) {
                return value
              }
              return item
            })
          )
        }
      }

      if (itemType === 'int') {
        // @ts-ignore
        if (value !== false && !isNaN(parseInt(value))) {
          setArr((arr) =>
            arr.map((item) => {
              if (item === arr[idx]) {
                // @ts-ignore
                return parseInt(value)
              }
              return item
            })
          )
        }
      }

      if (itemType === 'float') {
        // @ts-ignore
        if (value !== false && !isNaN(parseFloat(value))) {
          setArr((arr) =>
            arr.map((item) => {
              if (item === arr[idx]) {
                // @ts-ignore
                return parseFloat(value)
              }
              return item
            })
          )
        }
      }
    })
  }

  return (
    <InputWrapper
      indent={indent}
      space={space}
      disabled={disabled}
      descriptionBottom={description}
    >
      {/** @ts-ignore  **/}
      <Label label={props?.label} space={12} />

      {arr && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={arr} strategy={verticalListSortingStrategy}>
            {arr?.map((id, idx) => (
              <SingleArrayListItem
                key={idx}
                id={id}
                idx={idx}
                itemType={itemType}
                deleteSpecificItem={deleteSpecificItem}
                editSpecificItem={editSpecificItem}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      <Button ghost icon={AddIcon} space={8} onClick={addItemHandler}>
        Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
      </Button>
    </InputWrapper>
  )
}
