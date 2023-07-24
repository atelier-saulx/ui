import React from 'react'
import { RightSidebar } from '../../../components/RightSidebar'
import { Button, Text, AddIcon, Separator, useContextMenu } from '~'
import { SelectFieldTypeModal } from '../SelectFieldTypeModal'

export const SchemaRight = ({ type, path }) => {
  const openSelectField = useContextMenu(
    SelectFieldTypeModal,
    {
      type,
      path,
    },
    { width: 924, placement: 'right' }
  )

  return (
    <RightSidebar style={{ minWidth: 210 }}>
      <Text style={{ marginBottom: 16 }} size={18} weight={700}>
        Fields
      </Text>
      <Separator />
      <Button
        textAlign="center"
        icon={AddIcon}
        style={{ width: '100%', marginBottom: 24 }}
        onClick={openSelectField}
      >
        Add Field
      </Button>
      <Text style={{ marginBottom: 12 }} size={14} weight={600}>
        Documentation
      </Text>
      <Text size={12} color="text2" wrap>
        Read more about schema types in our guide to schema editing.
      </Text>
    </RightSidebar>
  )
}
