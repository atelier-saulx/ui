import React, { useState, useRef } from 'react'
import {
  styled,
  Checkbox,
  color,
  IconDragDropHorizontal,
  useHover,
} from '../..'

export const HeaderOverlay = ({ headers, setFilteredHeaders }) => {
  console.log('headers?? ', headers)

  const headersCopy = [...headers]

  const [dragStartItem, setDragStartItem] = useState('')
  const [draggedOverItem, setDraggedOverItem] = useState('')
  const [dragging, setDragging] = useState(false)

  const { listener, hover } = useHover()

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
      onDragLeave={(e) => {
        e.preventDefault()
        setDraggedOverItem('')
        console.log('Elvis left the building 🫄🏻')
      }}
      onMouseOver={() => console.log('🐭')}
      {...listener}
    >
      <div style={{ border: '1px solid red' }}>
        {dragging ? 'DRAGGING' : 'NOT'}
        {hover ? 'HOvering' : 'not '}
        {/* {'start item --> ' + dragStartItem} */}
      </div>
      {headersCopy.map((item, idx) =>
        item.key !== 'selected' ? (
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              boxSizing: 'border-box',
              backgroundColor:
                draggedOverItem === item.key ? 'yellow' : 'white',
            }}
            onDragStart={(e) => {
              //  console.log('start dragging', item.key)
              setDragStartItem(item.key)
              setDragging(true)
            }}
            onDragOver={(e) => {
              setDraggedOverItem(item.key)
              console.log('drag over', item.key)
            }}
            onDragEnd={(e) => {
              setDragging(false)
              console.log(e)
              console.log(' 🩸START ITEM -->', dragStartItem)
              console.log('🌡DRopped on -->', draggedOverItem)
            }}
            onDragExit={() => {
              console.log('BREXIT ☎️')
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
