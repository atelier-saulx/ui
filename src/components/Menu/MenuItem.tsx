import React, { FC, ReactNode } from 'react'
import { Text, styled, color as genColor, Style } from '../..'
import { ClickHandler } from '../../types'
import { BpTablet } from '../../utils/breakpoints'

type MenuItemProps = {
  active: boolean
  onClick: ClickHandler
  children: ReactNode | ReactNode[] | ((e) => void)
  style?: Style
}

export const MenuItem: FC<MenuItemProps> = ({
  active,
  onClick = (e) => {},
  children,
  style,
}) => {
  return (
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
        WebkitUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none',
        backgroundColor: active
          ? genColor('action', 'primary', 'subtleSelected')
          : null,
        '@media (hover: hover)': {
          '&:hover': !active
            ? {
                backgroundColor: genColor('action', 'system', 'subtleHover'),
                //   color: `${color('text')} !important`,
              }
            : null,
        },
        [BpTablet]: {
          '&:hover': {
            backgroundColor: active
              ? genColor('action', 'primary', 'subtleSelected')
              : 'transparent',
          },
        },
        '&:active': !active
          ? {
              backgroundColor: genColor('action', 'system', 'subtleActive'),
            }
          : null,
      }}
    >
      <Text
        color={active ? 'brand' : 'default'}
        weight={active ? 'strong' : 'medium'}
        //   wrap
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          ...style,
        }}
      >
        {/*@ts-ignore*/}
        {typeof children === 'function'
          ? children({
              active,
            })
          : children}
      </Text>
    </styled.div>
  )
}
