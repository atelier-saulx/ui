import React, { FC, ReactNode } from 'react'
import { Text, styled, color as genColor, Style } from '../..'

type MenuItemProps = {
  active: boolean
  onClick: () => void | ((e) => void)
  children: ReactNode | ReactNode[] | ((e) => void)
  style: Style
}

export const MenuItem: FC<MenuItemProps> = ({
  active,
  onClick = (e) => {},
  children,
  style,
}) => {
  return (
    <Text
      color={active ? 'brand' : 'default'}
      weight={!active ? 'medium' : 'strong'}
      //   wrap
      style={{
        ...style,
      }}
    >
      <styled.div
        onClick={(e) => onClick(e)}
        style={{
          padding: '8px 12px',
          margin: '-4px -4px 4px -2px',
          marginBottom: '8px',
          boxSizing: 'content-box',
          width: '200px',
          height: '24px',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          WebkitUserSelect: 'none',
          MsUserSelect: 'none',
          userSelect: 'none',
          backgroundColor: active
            ? genColor('action', 'primary', 'subtleSelected')
            : null,
          '@media (hover: hover)': {
            '&:hover': !active
              ? {
                  backgroundColor: genColor('action', 'neutral', 'subtleHover'),
                  //   color: `${color('text')} !important`,
                }
              : null,
          },
          '&:active': !active
            ? {
                backgroundColor: genColor('action', 'neutral', 'subtleActive'),
              }
            : null,
        }}
      >
        {typeof children === 'function'
          ? children({
              active,
            })
          : children}
      </styled.div>
    </Text>
  )
}
