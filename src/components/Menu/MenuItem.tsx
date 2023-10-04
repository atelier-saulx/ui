import React, { FC, ReactNode } from 'react'
import { color as genColor } from '../../varsUtilities'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { ClickHandler } from '../../types'
import { BpTablet } from '../../utils/breakpoints'

type MenuItemProps = {
  active: boolean
  onClick: ClickHandler
  children: ReactNode | ReactNode[] | ((e) => void)
  shrink?: boolean
  style?: Style
}

export const MenuItem: FC<MenuItemProps> = ({
  active,
  onClick = (e) => {},
  children,
  shrink,
  style,
}) => {
  return (
    <styled.div
      onClick={(e) => onClick(e)}
      style={{
        cursor: 'pointer',
        padding: '8px 12px',
        marginBottom: '8px',
        boxSizing: 'content-box',
        transition: '0.5s width',
        width: !shrink ? 'calc(100% - 24px)' : '20px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        borderRadius: 8,
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
        selectable="none"
        color={active ? 'brand' : 'default'}
        weight={active ? 'strong' : 'medium'}
        //   wrap
        style={{
          gap: !shrink ? 10 : 0,
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
