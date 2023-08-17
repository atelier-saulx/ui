import React, { FC, ReactNode } from 'react'
import { Style, styled } from 'inlines'
import { color } from '../../varsUtilities'

type DropDownProps = {
  style?: Style
  children?: ReactNode
}

export const Dropdown: FC<DropDownProps> = ({ style, children }) => {
  return (
    <styled.div
      style={{
        backgroundColor: color('background', 'default', 'surface'),
        border: `1px solid ${color('border', 'default', 'strong')}`,
        borderRadius: 8,
        boxShadow:
          '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
        minHeight: 120,
        maxWidth: 258,
        ...style,
      }}
    >
      {children}
    </styled.div>
  )
}
