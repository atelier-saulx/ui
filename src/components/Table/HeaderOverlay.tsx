import React, { useState } from 'react'
import { styled, Checkbox, color, IconDragDropHorizontal } from '../..'

export const HeaderOverlay = ({ headers, setFilteredHeaders }) => {
  console.log('headers?? ', headers)

  const headersCopy = [...headers]

  const [dragStartItem, setDragStartItem] = useState('')
  const [dropItem, setDropItem] = useState('')
  const [draggedOverItem, setDraggedOverItem] = useState('')
  const [dragging, setDragging] = useState(false)

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
          <styled.div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              boxSizing: 'border-box',
              backgroundColor:
                draggedOverItem === item.key ? 'yellow' : 'white',
            }}
            onDragStart={(e) => {
              console.log('start Item', item.key, idx)
              setDragStartItem(item.key)
              setDragging(true)
            }}
            onDragOver={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setDraggedOverItem(item.key)
              console.log('drag over', item.key)
            }}
            onDrop={(e) => {
              setDropItem(item.key)
              console.log('DRopped IN ', item.key, idx)
            }}
            onDragEnd={() => {
              setDragging(false)
              console.log()
              console.log(' 🩸START ITEM -->', dragStartItem)
              console.log(' 🐛drop item --> ', dropItem)
              //   console.log('🌡DRopped on -->', draggedOverItem)

              // now adjust the Array

              // clear these again
              setDragStartItem('')
              setDraggedOverItem('')
              setDropItem('')
            }}
            draggable
          >
            <IconDragDropHorizontal />
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
          </styled.div>
        ) : null
      )}
    </styled.div>
  )
}
