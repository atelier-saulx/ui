import React, { FC, ReactNode, useState } from 'react'
import { color as genColor } from '../../varsUtilities'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { Button } from '../Button'
import { ClickHandler } from '../../types'
import { BpTablet } from '../../utils/breakpoints'
import { IconChevronDown, IconChevronTop } from 'src/icons'

type MenuItemProps = {
  active: boolean
  onClick: ClickHandler
  onChange?: (e) => void
  // children: ReactNode | ReactNode[] | ((e) => void)
  shrink?: boolean
  style?: Style
  data?: any
}

export const MenuItem: FC<MenuItemProps> = ({
  active,
  onClick = (e) => {},
  // children,
  onChange,
  shrink,
  style,
  data,
}) => {
  const [showNested, setShowNested] = useState(false)

  let nested = []
  // check if item has an object with label and value inside it
  for (const [key] of Object.entries(data)) {
    if (key !== 'value' && key !== 'label' && key !== 'icon') {
      // console.log('🫔', key)
      // console.log('🥩', data[key])
      nested.push(data[key])
    }
  }

  return (
    <>
      <styled.div
        onClick={(e) => {
          if (onChange) {
            // console.log('clikie 🍔', data.value)
            onChange(data.value)
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
          {/* @ts-ignore
        {typeof children === 'function'
          ? children({
              active,
            })
          : children}
    */}

          {data.icon ? (
            <styled.div style={{ marginLeft: 0 }}>{data.icon}</styled.div>
          ) : null}
          {!data.icon && shrink && typeof data.label === 'string' ? (
            <>{data.label.split('').splice(0, 2)}</>
          ) : null}

          {!shrink && data.label}
          {!shrink && nested.length > 0 && (
            <Button
              size="xsmall"
              icon={showNested ? <IconChevronDown /> : <IconChevronTop />}
              style={{ position: 'absolute', right: '12px' }}
              onClick={() => setShowNested(!showNested)}
            ></Button>
          )}
        </Text>
      </styled.div>
      {showNested &&
        nested.map((item, idx) => (
          <MenuItem
            key={idx}
            data={item}
            onChange={onChange}
            onClick={(e: any) => {
              if (onClick) {
                onClick(e)
              }
            }}
            //   active={isActive ? isActive(item.value) : active === item.value}
            // active={item.value}
            active={active === item.value}
          />
        ))}
    </>
  )
}
