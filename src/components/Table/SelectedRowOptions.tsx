import React from 'react'
import { styled, Text, color, Button, IconDelete } from '../..'

type SelectedRowOptionsProps = {
  clearAllRows: () => void
  selectedRowsLength: number
}

export const SelectedRowOptions = ({
  clearAllRows,
  selectedRowsLength,
}: SelectedRowOptionsProps) => {
  return (
    <styled.div
      style={{
        maxHeight: 64,
        backgroundColor: color('background', 'default', 'strong'),
        borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
        padding: '12px 16px',
      }}
    >
      <styled.div
        style={{
          border: `1px solid ${color('border', 'default', 'strong')}`,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          width: 'fit-content',
        }}
      >
        <Text weight="strong" color="brand">
          {selectedRowsLength + ' Selected'}
        </Text>
        <Button
          size="xsmall"
          ghost
          style={{ marginLeft: 18 }}
          onClick={() => {
            clearAllRows()
          }}
        >
          Clear Selection
        </Button>
        <Button
          size="xsmall"
          ghost
          color="alert"
          icon={<IconDelete />}
          style={{ marginLeft: 18 }}
        >
          Delete
        </Button>
      </styled.div>
    </styled.div>
  )
}
