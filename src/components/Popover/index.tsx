import React, { FC, ReactNode } from 'react'
import { styled, Style, color as genColor } from '~'
import { usePopover } from '../../hooks/usePopover'

type PopoverProps = {
  children?: ReactNode | ReactNode[]
}

export const Popover: FC<PopoverProps> = ({ children }) => {
  //TODO not standalobne dropdown

  const popoverTest = usePopover(
    <styled.div>asdfasdfasdf</styled.div>,
    'bottom',
    { textTransform: 'uppercase' }
  )

  return (
    <styled.div {...popoverTest} style={{ backgroundColor: 'yellow' }}>
      flap
    </styled.div>
  )
}
