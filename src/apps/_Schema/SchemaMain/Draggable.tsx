import React, { CSSProperties, FC, ReactNode, useRef } from 'react'
import { color } from '~'
import { useSortable } from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'
import { getDepth, getObjectId } from './utils'

export const Draggable: FC<{
  id: string
  properties: object
  objects: object
  overIdRef: any
  children?: ReactNode
}> = ({ id, children, properties, objects, overIdRef }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    index,
    activeIndex,
    overIndex,
    items,
  } = useSortable({ id })

  overIdRef.current =
    activeIndex > overIndex ? items[overIndex - 1] : items[overIndex]

  const draggingOverObjectId =
    isDragging && getObjectId(overIdRef.current, properties, objects)

  const indexRef = useRef<number>()
  const jumpedRef = useRef<boolean>()
  const style: CSSProperties = {
    height: 50,
    overflow: isDragging ? 'hidden' : null,
    transform: CSS.Transform.toString(transform),
    transition: transition,
    marginBottom: 12,
    marginLeft: draggingOverObjectId
      ? getDepth(
          draggingOverObjectId.split('.'),
          draggingOverObjectId === id ? 0 : 1
        ) * 24
      : 0,
  }

  if (jumpedRef.current) {
    style.transform = null
    jumpedRef.current = null
  }

  jumpedRef.current =
    indexRef.current - index > 1 || index - indexRef.current > 1

  indexRef.current = index

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isDragging ? (
        <div
          style={{
            marginTop: 24,
            height: 2,
            backgroundColor: color('accent'),
          }}
        />
      ) : (
        children
      )}
    </div>
  )
}
