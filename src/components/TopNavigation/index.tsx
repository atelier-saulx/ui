import React, { FC, ReactNode } from 'react'
import { color } from '../../varsUtilities'
import { styled, Style } from 'inlines'

export type TopNavigationProps = {
  sticky?: boolean
  children?: ReactNode | ReactNode[]
  style?: Style
}

export const TopNavigation: FC<TopNavigationProps> = ({
  style,
  children,
  sticky = false,
}) => {
  return (
    <styled.div
      style={{
        height: '40px',
        padding: '12px 24px',
        position: sticky ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color('background', 'default', 'strong'),
        borderBottom:
          '1px solid ' + color('inputBorder', 'neutralNormal', 'default'),
        ...style,
      }}
    >
      {children}
    </styled.div>
  )
}
