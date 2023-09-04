import React, { useEffect, useState } from 'react'
import { styled, Checkbox, color, IconDragDropHorizontal } from '../..'

export const HeaderOverlay = ({ headers, setFilteredHeaders, setHeaders }) => {
  // console.log('headers?? ', headers)

  const [dragStartItem, setDragStartItem] = useState<Number>()
  const [dropItem, setDropItem] = useState<Number>()
  const [draggedOverItem, setDraggedOverItem] = useState('')
  const [dragging, setDragging] = useState(false)
  const [half, setHalf] = useState('')

  const reOrderTheHeadersArr = (startItemIdx, newPlaceIdx) => {
    const theStartItem = headers[startItemIdx]

    // console.log('🐸', theStartItem)

    half === 'lowerhalf' ? newPlaceIdx + 1 : null
    // remove 1 item
    headers.splice(startItemIdx, 1)
    // console.log('oh god put it back! at -->', newPlaceIdx)
    // add back item
    headers.splice(newPlaceIdx, 0, theStartItem)

    setHeaders([...headers])
    setFilteredHeaders(headers.filter((item) => item.meta.visible))
    // console.log('And the ARR?? 👘 👒 🥼', headers)
  }

  // useEffect(() => {
  //   console.log('half ', half)
  // }, [half])

  return (
    <styled.div
      style={{
        backgroundColor: color('background', 'default', 'surface'),
        borderRadius: 8,
        border: `1px solid ${color('border', 'default', 'strong')}`,
        boxShadow:
          '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
        padding: 8,
        width: 216,
      }}
    >
      {headers.map((item, idx) =>
        item.key !== 'selected' ? (
          <styled.div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              opacity: dragStartItem === idx ? 0.4 : 1,
              padding: '8px 12px',
              boxSizing: 'border-box',
              backgroundColor: color('background', 'default', 'surface'),
              borderTop:
                draggedOverItem === item.key && half === 'upperhalf'
                  ? `3px solid ${color('action', 'primary', 'normal')}`
                  : '',
              borderBottom:
                draggedOverItem === item.key && half === 'lowerhalf'
                  ? `3px solid ${color('action', 'primary', 'normal')}`
                  : '',
            }}
            onDragStart={(e) => {
              console.log('start Item', item.key, idx)
              setDragStartItem(idx)
              setDragging(true)
            }}
            onDragOver={(e) => {
              e.nativeEvent.offsetY < 16
                ? setHalf('upperhalf')
                : setHalf('lowerhalf')

              e.stopPropagation()
              e.preventDefault()
              setDraggedOverItem(item.key)

              // console.log('drag over', item.key)
            }}
            onDrop={(e) => {
              setDropItem(idx)
              console.log('DRopped IN ', item.key, idx)
            }}
            onDragEnd={() => {
              setDragging(false)

              // console.log(' 🩸START ITEM -->', dragStartItem)
              // console.log(' 🐛drop item --> ', dropItem)
              //   console.log('🌡DRopped on -->', draggedOverItem)

              // now adjust the Array
              reOrderTheHeadersArr(dragStartItem, dropItem)

              // clear these again
              setDragStartItem(undefined)
              setDraggedOverItem('')
              setDropItem(undefined)
            }}
            draggable
          >
            <IconDragDropHorizontal style={{ marginRight: 10 }} />
            <Checkbox
              value={item.meta.visible}
              key={item.key}
              label={item.label}
              onChange={() => {
                item.meta.visible = !item.meta.visible
                // console.log(headers, '???')
                setFilteredHeaders(headers.filter((item) => item.meta.visible))
              }}
            />
          </styled.div>
        ) : null
      )}
    </styled.div>
  )
}
