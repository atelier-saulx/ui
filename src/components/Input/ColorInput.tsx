import * as Popover from '@radix-ui/react-popover'
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  RefObject,
  CSSProperties,
} from 'react'
import { styled } from 'inlines'
import { color } from '../../varsUtilities'
import { usePropState } from '../../hooks'
import { rgbaToArr } from '../ColorPicker/utils'
import { ColorPicker } from '../ColorPicker'
import { transparent } from '../ColorPicker/bg'
import { useControllableState } from '../../hooks'

let tester
const valueToRgba = (value) => {
  if (value) {
    if (value.startsWith('rgba(')) {
      return value
    }
    if (!tester) {
      tester = document.createElement('div')
      document.documentElement.appendChild(tester)
    }
    tester.style.backgroundColor = value
    const { backgroundColor } = getComputedStyle(tester)
    const rgba = rgbaToArr(backgroundColor)
    return `rgba(${rgba.join(',')})`
  }
}

export type ColorInputProps = {
  value?: string
  defaultValue?: string
  onChange?: (target) => void
  placeholder?: string
  disabled?: boolean
  style?: CSSProperties
  error?: boolean
  autoFocus?: boolean
}

export const ColorInput = ({
  placeholder,
  defaultValue: defaultValueProp = valueToRgba(''),
  value: valueProp,
  disabled,
  style,
  error,
  autoFocus,
  onChange: onChangeProp = (e) => console.log(),
  ...props
}: ColorInputProps) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })

  const [inputVal, setInputVal] = useState(value)

  useEffect(() => {
    setInputVal(value)
  }, [value])

  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>
        <styled.div
          tabIndex={0}
          style={{
            display: 'flex',
            position: 'relative',
          }}
        >
          <styled.input
            autoFocus={autoFocus}
            {...props}
            type="text"
            value={inputVal || ''}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              width: '100%',
              padding: '0px 12px',
              paddingLeft: 36,
              borderRadius: 8,
              minHeight: 40,
              fontSize: '14px',
              lineHeight: '24px',
              boxSizing: 'border-box',
              color: color(
                'content',
                'default',
                value === valueProp ? 'secondary' : 'primary'
              ),
              cursor: disabled ? 'not-allowed' : null,
              backgroundColor: color('background', 'default'),
              border: `1px solid ${color('inputBorder', 'neutralNormal')}`,
              '&:hover': {
                border: `1px solid ${color('inputBorder', 'neutralHover')}`,
              },
              '&:focus': {
                border: `1px solid ${color('inputBorder', 'active')}`,
                boxShadow: error
                  ? `0 0 0 2px ${color('inputBorder', 'alert', 'default')}`
                  : `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
              },
              outline: 'none',
              ...style,
            }}
          />
          <div
            style={{
              cursor: 'pointer',
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              height: 20,
              width: 20,
              borderRadius: 4,
              marginRight: 8,
              marginLeft: -4,
              background: transparent,
              backgroundPosition: 'center center',
            }}
          />
          <button
            style={{
              cursor: 'pointer',
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              height: 20,
              width: 20,
              borderRadius: 4,
              marginRight: 8,
              marginLeft: -4,
              backgroundColor: value,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              border: `1px solid ${color('inputBorder', 'neutralNormal')}`,
              pointerEvents: disabled ? 'none' : null,
            }}
            onClick={() => setOpen(true)}
          />
        </styled.div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onInteractOutside={(e) => {
            setOpen(false)
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
          }}
          sideOffset={8}
        >
          <ColorPicker
            style={{ maxWidth: 'calc(100vw - 32px)' }}
            value={value}
            onChange={(v) => setValue(v)}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
