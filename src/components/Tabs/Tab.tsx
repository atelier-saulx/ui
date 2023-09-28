import React, { ReactNode } from 'react'
import { styled, Style } from 'inlines'

type TabProps = {
  // leave the label prop here!
  label?: string | ReactNode
  children?: ReactNode | ReactNode[]
  style?: Style
  //  icon?: ReactNode
}

export const Tab = ({ children, style }: TabProps) => {
  return <styled.div style={{ flexGrow: 1, ...style }}>{children}</styled.div>
}
