import React, { useState, useEffect, FC, ReactNode } from 'react'
import {
  IconClose,
  IconSmallArrowheadDown,
  IconSmallArrowheadDownSmall,
  IconSmallArrowheadTop,
  IconSmallArrowheadTopSmall,
} from '../../icons'
import { Badge, BadgeProps } from '../Badge'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'
import { useControllableState } from '../../hooks'

export type NumberInputOwnProps = {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  clearButton?: boolean
  icon?: ReactNode
  afterIcon?: ReactNode
  prefix?: BadgeProps
  suffix?: BadgeProps
  style?: Style
  onFocus?: () => void
  onBlur?: () => void
  disabled?: boolean
  placeholder?: ReactNode
  error?: boolean
  message?: ReactNode
  min?: number
  max?: number
  step?: number
}

export type NumberInputProps = NumberInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<'input'>, 'prefix'>

export const NumberInput: FC<NumberInputProps> = ({
  value: valueProp,
  defaultValue: defaultValueProp = '',
  onChange: onChangeProp,
  min,
  max,
  prefix,
  suffix,
  icon,
  afterIcon,
  style,
  clearButton,
  error,
  disabled,
  onFocus,
  onBlur,
  placeholder,
  step = 1,
  ...props
}) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })
  const [focused, setFocused] = useState(false)

  const handleIncre = (e) => {
    e.preventDefault()
    e.stopPropagation()
    //@ts-ignore its on purpose
    setValue(parseFloat(value + step))
  }
  const handleDecre = (e) => {
    e.preventDefault()
    e.stopPropagation()
    //@ts-ignore its on purpose
    setValue(parseFloat(value - step))
  }

  const handleBlur = () => {
    setFocused(false)
    if ((value as number) > max) {
      setValue(max)
    }
    if ((value as number) < min) {
      setValue(min)
    }
  }

  useEffect(() => {
    if (focused) return
    if ((value as number) > max) {
      setValue(max)
    }
    if ((value as number) < min) {
      setValue(min)
    }
  }, [value])

  return (
    <styled.div
      style={{
        position: 'relative',
        minHeight: 40,
        width: '100%',
        padding: '0 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontSize: '14px',
        lineHeight: '24px',
        boxSizing: 'border-box',
        color: color(
          'content',
          'default',
          value === null ? 'secondary' : 'primary'
        ),
        border: `1px solid ${color(
          'inputBorder',
          error ? 'alert' : 'neutralNormal',
          'default'
        )}`,
        '&:hover': {
          border: `1px solid ${color(
            'inputBorder',
            error ? 'alert' : 'neutralHover',
            'default'
          )}`,
        },
        '&:focus-within': {
          border: `1px solid ${color(
            'inputBorder',
            error ? 'alert' : 'active',
            'default'
          )}`,
          boxShadow: error
            ? `0 0 0 2px ${color('inputBorder', 'alert', 'default')}`
            : `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
        },
        '& > * + *': {
          marginLeft: '8px',
        },
        ...(disabled
          ? {
              opacity: '50%',
            }
          : {}),
        ...style,
      }}
    >
      {icon && <styled.div style={{ flexShrink: 0 }}>{icon}</styled.div>}
      {prefix && <Badge {...prefix} />}
      <styled.input
        value={value}
        onChange={(e) => {
          if (!Number.isNaN(parseFloat(e.target.value))) {
            setValue(parseFloat(e.target?.value))
          } else {
            setValue('')
          }
        }}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e.target.value)
        }}
        onBlur={(e) => {
          handleBlur()
          onBlur?.(e.target.value)
        }}
        min={min}
        max={max}
        style={{
          width: '100%',
          height: 38,
          appearance: 'none',
          background: 'transparent',
          fontSize: '14px',
          lineHeight: '24px',
          fontWeight: 400,
          border: 'none',
          padding: 0,
          color: color('content', 'default', 'primary'),
          '&::placeholder': {
            color: color('content', 'default', 'secondary'),
          },
          '&:focus': {
            outline: 'none',
          },
        }}
        placeholder={placeholder}
        type="number"
        {...props}
      />

      <styled.div
        style={{
          position: 'absolute',
          right: 4,
          top: 0,
          bottom: 0,
          padding: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <IconSmallArrowheadTop
          onClick={handleIncre}
          style={{
            padding: '8px 4px 0px',
            marginBottom: '-4px',
          }}
        />
        <IconSmallArrowheadDown
          onClick={handleDecre}
          style={{
            padding: '0px 4px 8px',
            paddingTop: -4,
            marginTop: '-4px',
          }}
        />
      </styled.div>
      {suffix && <Badge {...suffix} />}
      {(clearButton || afterIcon) && (
        <div
          style={{
            flexShrink: 0,
            position: 'absolute',
            right: 30,
          }}
        >
          {Math.abs(value as number) > 0 && clearButton ? (
            <IconClose
              onClick={() => {
                setValue('')
              }}
            />
          ) : (
            afterIcon
          )}
        </div>
      )}
    </styled.div>
  )
}
