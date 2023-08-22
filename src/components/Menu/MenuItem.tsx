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
  console.log(value, active)
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
