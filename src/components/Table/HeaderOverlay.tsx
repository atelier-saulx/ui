import React from 'react'
import { styled, Checkbox, color } from '../..'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const HeaderOverlay = ({ headers, setFilteredHeaders }) => {
  console.log('headers?? ', headers)

  const headersCopy = [...headers]

  return (
    <styled.div
      style={{
        backgroundColor: color('background', 'default', 'surface'),
        borderRadius: 8,
        border: `1px solid ${color('border', 'default', 'strong')}`,
        boxShadow:
          '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
        padding: 8,
        minWidth: 216,
      }}
    >
      {headersCopy.map((item, idx) =>
        item.key !== 'selected' ? (
          <>
            <Checkbox
              value={item.meta.visible}
              key={item.key}
              label={item.label}
              onClick={() => {
                item.meta.visible = !item.meta.visible

                console.log(headersCopy, '???')
                setFilteredHeaders(
                  headersCopy.filter((item) => item.meta.visible)
                )
              }}
            />
          </>
        ) : null
      )}
    </styled.div>
  )
}
