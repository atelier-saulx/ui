import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { color } from '~/utils'
import {
  Badge,
  DragDropIcon,
  Text,
  MoreIcon,
  DeleteIcon,
  EditIcon,
  useContextMenu,
  ContextItem,
} from '~'

const stopPropagation = (e) => e.stopPropagation()

export const SingleArrayListItem = ({
  itemType,
  deleteSpecificItem,
  editSpecificItem,
  idx,
  ...props
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id /* data: { index: props.index } */ })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const contextHandler = useContextMenu(
    ContextMenu,
    { editSpecificItem, deleteSpecificItem, idx },
    { placement: 'right' }
  )

  return (
    <div
      ref={setNodeRef}
      style={{
        border: `1px solid ${color('border')}`,
        borderRadius: 4,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 8,
        cursor: 'grab',
        ...style,
      }}
      {...attributes}
      {...listeners}
    >
      <DragDropIcon />
      <Badge style={{ marginLeft: 12, marginRight: 12 }}>
        {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
      </Badge>
      {/* <Text>{idx} - </Text> */}
      <Text weight={600}>{props.id}</Text>
      <MoreIcon
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        // open options on clik
        onPointerDown={stopPropagation}
        onClick={contextHandler}
      />
    </div>
  )
}

const ContextMenu = ({ editSpecificItem, deleteSpecificItem, idx }) => {
  return (
    <>
      <ContextItem onClick={() => editSpecificItem(idx)} icon={EditIcon}>
        Edit
      </ContextItem>
      <ContextItem onClick={() => deleteSpecificItem(idx)} icon={DeleteIcon}>
        Delete
      </ContextItem>
    </>
  )
}
