import React, { FC, ReactNode } from 'react'
import { styled, Style } from 'inlines'

type SharedInputProps = {
  style: Style
  children?: ReactNode
}

export const SharedInput: FC<SharedInputProps> = ({ style, children }) => {
  return (
    <styled.div
      style={
        {
          // border: '1px solid blue',
          // ...style,
        }
      }
    >
      {children}
    </styled.div>
  )
}
