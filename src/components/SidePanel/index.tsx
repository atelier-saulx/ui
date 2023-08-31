import React, { FC } from 'react'
import { Button, styled } from '../../'
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
    'right',
    { textTransform: 'uppercase' },
    'Title asdasdasd',
    { onClick: () => console.log('ligma'), label: 'asdasd' }
  )
  //@ts-ignore
  return <Button onClick={open}>Open SidePanel</Button>
}
