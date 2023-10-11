import React, { ReactNode } from 'react'
import { IconCheckSmall, IconMinus } from '../../icons'
import { Style, styled } from 'inlines'
import { Text } from '../Text'
import { color } from '../../varsUtilities'
import { useControllableState } from '../../hooks/useControllableState'
import { BpTablet } from 'src/utils'

export type CheckboxInputProps = {
  title?: ReactNode
  description?: string
  value?: boolean
  defaultValue?: boolean
  onChange?: (newValue: boolean) => void
  disabled?: boolean
  intermediate?: boolean
  style?: Style
}

export function CheckboxInput({
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange: onChangeProp,
  disabled,
  title,
  style,
  description,
  intermediate,
}: CheckboxInputProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })

  return (
    <styled.label
      className="checkbox-group"
      style={{
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        '&:focus': {
          outline: 'none',
        },
        '&:focus-within': {
          // outline: 'none',
          // border: `1px solid ${color('inputBorder', 'active', 'default')}`,
          // boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
        },
        ...style,
      }}
    >
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
          type="checkbox"
          checked={value}
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
          onChange={(e) => {
            if (disabled || intermediate) return
            setValue(e.target.checked)
          }}
          disabled={disabled}
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
        <styled.div
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            boxSizing: 'border-box',
            background: intermediate
              ? color('action', 'primary', 'normal')
              : value
              ? color('action', 'primary', 'normal')
              : 'transparent',
            border:
              intermediate || value
                ? 'transparent'
                : `1px solid ${color(
                    'inputBorder',
                    'neutralNormal',
                    'default'
                  )}`,
            color: color('content', 'inverted', 'primary'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '.checkbox-group:hover &': {
              borderColor: `${color(
                'inputBorder',
                'neutralHover',
                'default'
              )} !important`,
              background: `${
                intermediate
                  ? color('action', 'primary', 'hover')
                  : value
                  ? color('action', 'primary', 'hover')
                  : 'transparent'
              } !important`,
            },

            [BpTablet]: {
              '&:hover': {
                background: intermediate
                  ? color('action', 'primary', 'normal')
                  : value
                  ? color('action', 'primary', 'normal')
                  : 'transparent',
              },
            },
            '.checkbox-group:focus-within &': {
              boxShadow: `0 0 0 1px ${color(
                'background',
                'default'
              )},0 0 0 3px ${color('border', 'brand')}`,
            },
          }}
        >
          {intermediate ? (
            <IconMinus color="inherit" />
          ) : value ? (
            <IconCheckSmall color="inherit" />
          ) : null}
        </styled.div>
      </div>
      <div style={{ marginLeft: 12 }}>
        <Text selectable="none">{title}</Text>
        <Text selectable="none" light>
          {description}
        </Text>
      </div>
    </styled.label>
  )
}
