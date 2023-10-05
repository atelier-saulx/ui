import React, { ReactNode } from 'react'
import {
  IconCheckLarge,
  IconCheckSmall,
  IconMinus,
  IconSmallClose,
} from '../../icons'
import { Style, styled } from 'inlines'
import { Text } from '../Text'
import { color } from '../../varsUtilities'
import { useControllableState } from '../../hooks/useControllableState'

export type BooleanPillProps = {
  value?: boolean
  defaultValue?: boolean
  disabled?: boolean
  props?: any
  label?: ReactNode
  placeholder?: ReactNode
  prefix?: string
  style?: Style
  onChange: (value: boolean) => void
  icon?: ReactNode
}

export function BooleanPill({
  value: valueProp,
  defaultValue,
  disabled,
  props,
  label = 'label',
  placeholder = 'placeholder',
  prefix = 'prefix',
  style,
  onChange = () => console.log(),
  icon,
}: BooleanPillProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onChange,
  })

  return (
    <styled.label
      onMouseDown={(e) => {
        e.stopPropagation()
      }}
      onChange={(e) => {
        if (disabled) return
        setValue(true)
      }}
      disabled={disabled}
      className="checkbox-group"
      style={{
        display: 'flex',
        boxSizing: 'border-box',
        maxHeight: 32,
        outline: 'none',
        cursor: 'pointer',
        minWidth: 130,
        maxWidth: '100%',
        padding: '4px 8px',
        fontSize: 14,
        lineHeight: '24px',
        border: value
          ? `1px solid ${color('inputBorder', 'neutralNormal')}`
          : 'none',
        background: value
          ? color('background', 'default', 'strong')
          : color('action', 'neutral', 'subtleNormal'),
        '&:hover': {
          background: value
            ? color('background', 'default', 'strong')
            : color('action', 'neutral', 'subtleHover'),
          border: value
            ? `1px solid ${color('inputBorder', 'neutralHover')}`
            : 'none',
        },
        '&:active': {
          background: value
            ? color('background', 'default', 'strong')
            : color('action', 'neutral', 'subtleActive'),
          border: value
            ? `1px solid ${color('inputBorder', 'neutralActive')}`
            : 'none',
        },
        borderRadius: 4,
        gap: 8,
        alignItems: 'center',
        ...style,
      }}
    >
      {value && <IconCheckLarge />}
      {icon}
      <styled.div style={{ display: 'flex', gap: 6 }}>
        <Text selectable="none" light>
          {prefix}:
        </Text>
        <Text selectable="none" style={{}}>
          {value ? label : placeholder}
        </Text>
      </styled.div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 4,
          opacity: disabled ? '40%' : '100%',
        }}
      >
        <styled.input
          readOnly
          type="checkbox"
          checked={value}
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
            '&::placeholder': {
              color: color('content', 'default', 'secondary'),
            },
            '&:focus': {
              outline: 'none',
            },
          }}
        />
      </div>
      {value && (
        <styled.div
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setValue(false)
          }}
          style={{
            marginLeft: 'auto',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: color('action', 'neutral', 'subtleHover'),
            },
            // [BpTablet]: {
            //   backgroundColor: 'transparent',
            // },
            '&:active': {
              backgroundColor: color('action', 'neutral', 'subtleActive'),
            },
          }}
        >
          <IconSmallClose />
        </styled.div>
      )}
    </styled.label>
  )
}
