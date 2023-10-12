import React, { FC, ReactNode } from 'react'
import { color as genColor } from '../../varsUtilities'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { BpTablet } from '../../utils/breakpoints'

type MenuItemProps = {
  active: boolean
  onChange?: (e) => void
  onClick?: () => void
  shrink?: boolean
  style?: Style
  value?: string
  icon?: ReactNode
  label?: ReactNode
}

export const MenuItem: FC<MenuItemProps> = ({
  active,
  onClick,
  onChange,
  shrink,
  style,
  value,
  icon,
  label,
}) => {
  return (
    <>
      <styled.div
        onClick={(e) => {
          if (onChange) {
            // console.log('clikie 🍔', value)
            onChange(value)
            onClick()
          }
        }}
        style={{
          cursor: 'pointer',
          position: 'relative',
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
          {icon ? (
            <styled.div style={{ marginLeft: 0 }}>{icon}</styled.div>
          ) : null}
          {!icon && shrink && typeof label === 'string' ? (
            <>{label.split('').splice(0, 2)}</>
          ) : null}

          {!shrink && label}
        </Text>
      </styled.div>
    </>
  )
}
