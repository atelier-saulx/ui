import React, { FC } from 'react'
import { Text, styled, color as genColor } from '../..'
import { MenuItemProps } from '../../types'

export const MenuItem: FC<MenuItemProps> = ({
  active,
  icon,
  label,
  onClick = () => {},
  value,
  children,
  style,
}) => {
  return (
    <Text
      color={active ? 'brand' : 'default'}
      weight={!active ? 'medium' : 'strong'}
      //   wrap
      style={{
        marginBottom: 8,
        ...style,
      }}
    >
      <styled.div
        onClick={(e) => onClick(e)}
        style={{
          padding: '8px 12px',
          margin: '-4px -4px 4px -2px',
          boxSizing: 'content-box',
          width: '200px',
          height: '24px',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: active
            ? genColor('action', 'primary', 'subtleSelected')
            : null,
          '@media (hover: hover)': {
            '&:hover': !active
              ? {
                  backgroundColor: genColor('action', 'primary', 'subtleHover'),
                  //   color: `${color('text')} !important`,
                }
              : null,
          },
          '&:active': !active
            ? {
                backgroundColor: genColor('action', 'primary', 'subtleActive'),
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
