import React from 'react'
import {
  color,
  Text,
  Badge,
  MoreIcon,
  DeleteIcon,
  EditIcon,
  useContextMenu,
  ContextItem,
} from '~'
import { styled } from 'inlines'

const StyledSetListItem = styled('div', {
  border: `1px solid ${color('border')}`,
  borderRadius: 4,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 16,
  paddingRight: 16,
  marginBottom: 8,
})

export const SingleSetListItem = ({
  item,
  id,
  itemType,
  deleteSpecificItem,
  editSpecificItem,
  arr = [],
}) => {
  const contextHandler = useContextMenu(
    ContextMenu,
    { editSpecificItem, deleteSpecificItem, item, id, arr },
    { placement: 'right' }
  )

  return (
    <StyledSetListItem>
      <Badge>{itemType}</Badge>
      <Text style={{ marginLeft: '12px' }}>{item}</Text>
      <MoreIcon
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        // open options on clik
        //  onPointerDown={stopPropagation}
        onClick={contextHandler}
      />
    </StyledSetListItem>
  )
}

const ContextMenu = ({
  editSpecificItem,
  deleteSpecificItem,
  item,
  id,
  arr,
}) => {
  return (
    <>
      <ContextItem
        onClick={() => editSpecificItem(item, id, arr)}
        icon={EditIcon}
      >
        Edit
      </ContextItem>
      <ContextItem
        onClick={() => deleteSpecificItem(item, id, arr)}
        icon={DeleteIcon}
      >
        Delete
      </ContextItem>
    </>
  )
}
