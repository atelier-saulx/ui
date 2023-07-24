import React, { useRef, FC } from 'react'
import { createPortal } from 'react-dom'
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Draggable } from './Draggable'
import { Field } from './Field'
import { useSchema } from '~/apps/_Schema/hooks/useSchema'
import { useContextState } from '~/hooks/ContextState'
import { TypeSchema } from '../types'
import { useFieldsEvents } from './useFieldsEvents'

export const Fields: FC<{
  includeSystemFields: boolean
  onChange: (v: any) => void
}> = ({ includeSystemFields, onChange }) => {
  const [type] = useContextState('type', '')
  const [db] = useContextState('db', 'default')
  const { schema } = useSchema(db)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const overIdRef = useRef()

  if (!type) {
    return null
  }

  const typeDef: TypeSchema =
    type === 'root'
      ? schema.rootType
      : schema.types[type] || { meta: {}, fields: {} }

  const {
    onDragStart,
    toggleExpand,
    onDragEnd,
    filtered,
    draggingField,
    properties,
    collapsed,
    objects,
  } = useFieldsEvents(includeSystemFields, overIdRef, typeDef, onChange)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={filtered} strategy={verticalListSortingStrategy}>
        {filtered.map((field) => {
          return (
            <Draggable
              key={field}
              id={field}
              properties={properties}
              objects={objects}
              overIdRef={overIdRef}
            >
              <Field
                type={type}
                field={field}
                fields={typeDef.fields}
                isDragging={field === draggingField}
                toggleExpand={toggleExpand}
                collapsed={collapsed.has(field)}
              />
            </Draggable>
          )
        })}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {draggingField ? (
            <Field
              isDragging
              type={type}
              field={draggingField}
              fields={typeDef.fields}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
