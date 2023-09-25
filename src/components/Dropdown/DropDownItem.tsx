import React, { useState, ChangeEvent, FC, ReactNode, useEffect } from 'react'
import {
  Text,
  styled,
  Style,
  renderOrCreateElement,
  color as genColor,
  IconChevronRightSmall,
  useOverlay,
  Dropdown,
  Input,
} from '~'
import { BpTablet } from '../../utils/breakpoints'
import { ClickHandler } from '~/types'

export type DropDownItemProps = {
  caption?: string
  data?: DropDownItemProps[]
  icon?: ReactNode
  id?: string
  label: string
  type?: 'default' | 'checkbox' | 'radio' | 'action' | 'error'
  value?: string | number | boolean
  // if value must onchange
  onChange?: Function
}

export const DropDownItem: FC<DropDownItemProps> = ({
  caption,
  data,
  icon,
  id,
  label,
  type = 'default',
  value,
  onChange,
}) => {
  // if is range
  // how to get this to update properly
  const openNewDropDown = useOverlay(
    Dropdown,
    { data },
    { width: '100%', position: 'right', offset: { x: -20, y: 0 } },
    undefined,
    undefined,
    { style: { scrollbarGutter: 'auto', border: 'none', boxShadow: 'none' } }
  )

  return (
    <styled.div
      style={{
        position: 'relative',
        borderRadius: 8,
        cursor: 'pointer',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: genColor('action', 'system', 'hover'),
        },
        [BpTablet]: {
          '&:hover': {
            backgroundColor: genColor('action', 'system', 'normal'),
          },
          '&:active': {
            backgroundColor: genColor('action', 'system', 'active'),
          },
        },
      }}
      onClick={data ? openNewDropDown : null}
    >
      {type === 'default' ? (
        <>
          {icon && renderOrCreateElement(icon)}
          <Text weight="medium" style={{ marginLeft: icon ? 10 : 0 }}>
            {label}
          </Text>
        </>
      ) : type === 'checkbox' ? (
        <Input
          type="checkbox"
          title={label}
          value={value as boolean}
          onChange={() => {
            // TODO
            onChange()
          }}
        />
      ) : (
        //   : type === 'radio' ? (
        //     <RadioButtons data={[{ label: label, value: value  }]} />
        //   )
        ''
      )}

      {(data || caption) && (
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          <Text size={12} light>
            {caption}
          </Text>
          {data && <IconChevronRightSmall style={{ marginLeft: 10 }} />}
        </styled.div>
      )}
    </styled.div>
  )
}
