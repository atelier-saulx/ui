import React, { FC } from 'react'
import { MenuItemProps } from '../../types'
import { Text } from '../Text'
import { styled } from 'inlines'
import { color as genColor } from '../../../src'

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
      weight={active ? 'medium' : 'strong'}
      //   wrap
      style={{
        marginBottom: 8,
        ...style,
      }}
    >
      <styled.div
        onClick={(e) => onClick(e)}
        style={{
          padding: '4px 8px',
          margin: '-4px -4px -4px -2px',
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
                  backgroundColor: genColor('action', 'system', 'hover'),
                  //   color: `${color('text')} !important`,
                }
              : null,
          },
          '&:active': !active
            ? {
                backgroundColor: genColor('action', 'system', 'active'),
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
