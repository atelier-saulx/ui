import React, { useEffect, useRef } from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { color } from '../../varsUtilities'

export const TableHeader = ({
  width,
  columnWidth,
  headerColumns,
  scrollLeft,
}) => {
  const tableHeaderRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (tableHeaderRef) {
      tableHeaderRef.current.scrollLeft = scrollLeft
    }
  }, [scrollLeft])

  return (
    <styled.div
      ref={tableHeaderRef}
      style={{
        borderTop: `1px solid ${color(
          'inputBorder',
          'neutralNormal',
          'default'
        )}`,
        borderBottom: `1px solid ${color(
          'inputBorder',
          'neutralNormal',
          'default'
        )}`,
        display: 'flex',
        width: width,
        overflowX: 'hidden',
        scrollBehaviour: 'smooth',
        // right scrollbar offset here
        paddingRight: 18,
      }}
    >
      {headerColumns.map((item, idx) => (
        <styled.div
          key={idx}
          style={{
            minWidth: columnWidth,
            height: 40,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text weight="medium" transform="capitalize">
            {item}
          </Text>
        </styled.div>
      ))}
    </styled.div>
  )
}
