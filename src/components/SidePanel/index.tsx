import React, { FC } from 'react'
import { styled } from '../../'
import { useSidePanel } from '../../hooks/useSidePanel'

export const SidePanel = () => {
  const { open } = useSidePanel(
    <styled.div
      onClick={() => {
        console.log('asdasd')
      }}
    >
      asdfasdf
    </styled.div>,
    'left',
    { textTransform: 'uppercase' },
    'Title asdasdasd',
    { onClick: () => console.log('ligma'), label: 'asdasd' }
  )

  return (
    <styled.div onClick={open} style={{ backgroundColor: 'yellow' }}>
      flap flip
    </styled.div>
  )
}
