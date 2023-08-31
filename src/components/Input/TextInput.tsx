import React, {
  useState,
  useRef,
  useImperativeHandle,
  useCallback,
} from 'react'
import { Style, styled, color, Badge, IconClose, usePropState } from '../..'

//@ts-ignore
import { BadgeProps } from '../types'

export type TextInputOwnProps = {
  prefix?: BadgeProps
  suffix?: BadgeProps
  icon?: React.ReactNode
  afterIcon?: React.ReactNode
  style?: Style
  clearButton?: boolean
  onChange?: OnChange
}

type OnChange = (value: number | string) => void
// TODO controlled vs uncontrrolled?

export type TextInputProps = TextInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<'input'>, 'prefix'>

export function TextInput({
  prefix,
  suffix,
  icon,
  afterIcon,
  style,
  clearButton,
  onChange: onChangeProp,
  ...props
}: TextInputProps) {
  const [isEmpty, setIsEmpty] = useState(!(props.value || props.defaultValue))
  const [value, setValue] = usePropState(
    (props.value || props.defaultValue) ?? ''
  )

  const onChange = useCallback(
    (e: { target: { value: string } }) => {
      const newVal = e.target.value
      setValue(newVal)
      onChangeProp?.(newVal)
    },
    [onChangeProp]
  )

  return (
    <styled.div
      style={{
        height: 40,
        width: '100%',
        padding: '0 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontSize: '14px',
        lineHeight: '24px',
        boxSizing: 'border-box',
        color: color('content', 'default', isEmpty ? 'secondary' : 'primary'),
        border: `1px solid ${color('inputBorder', 'neutralNormal', 'default')}`,
        '&:hover': {
          border: `1px solid ${color(
            'inputBorder',
            'neutralHover',
            'default'
          )}`,
        },
        '&:focus-within': {
          border: `1px solid ${color('inputBorder', 'active', 'default')}`,
          boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
        },
        '& > * + *': {
          // px instead of raw number bc of https://github.com/atelier-saulx/inlines/issues/1
          marginLeft: '8px',
        },
        ...(props.disabled
          ? {
              opacity: '50%',
            }
          : {}),
        ...style,
      }}
    >
      {icon && <styled.div style={{ flexShrink: 0 }}>{icon}</styled.div>}
      {prefix && <Badge {...prefix}>{prefix}</Badge>}
      <styled.input
        value={value}
        onChange={(e) => {
          // setIsEmpty(e.target.value === '')
          setValue(e.target.value)
          onChangeProp?.(e)
        }}
        style={{
          width: '100%',
          appearance: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
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
        {...props}
      />
      {suffix && <Badge {...suffix}>{suffix}</Badge>}
      {clearButton ? (
        <IconClose
          onClick={() => {
            setValue('')
          }}
        />
      ) : (
        afterIcon && <div style={{ flexShrink: 0 }}>{afterIcon}</div>
      )}
    </styled.div>
  )
}
