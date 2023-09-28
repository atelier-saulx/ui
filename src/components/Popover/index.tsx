import React, { FC, ReactNode } from 'react'
import { styled, Style } from 'inlines'
import { usePopover } from '../../hooks/usePopover'

export type PopoverProps = {
  children?: ReactNode | ReactNode[]
  position:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left'
    | 'left'
    | 'right'
  style?: Style
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
