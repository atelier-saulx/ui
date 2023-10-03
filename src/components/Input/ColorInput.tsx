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
  inputRef?: RefObject<HTMLInputElement>
  value?: string
  placeholder?: string
  disabled?: boolean
  style?: CSSProperties
  onChange?: (target) => void
  error?: boolean
}

export const ColorInput = ({
  inputRef,
  placeholder,
  value: valueProp,
  disabled,
  style,
  error,
  onChange = (e) => console.log(e),
  ...props
}: ColorInputProps) => {
  const [value, setValue] = usePropState(valueProp, true)
  const [rgba, setRgba] = usePropState(() => valueToRgba(valueProp), true)
  const [open, setOpen] = useState(false)
  const rgbaRef = useRef(rgba)

  useEffect(() => {
    if (rgba !== value) {
      if (rgbaRef.current !== rgba) {
        rgbaRef.current = rgba
        onChange({ target: { value: rgba } })
      }
    }
  }, [rgba])

  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>
        <styled.div
          style={{
            display: 'flex',
            position: 'relative',
          }}
        >
          <styled.input
            {...props}
            type="text"
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setRgba(() => valueToRgba(e.target.value))
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
          <button
            style={{
              cursor: 'pointer',
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              backgroundColor: rgba,
              height: 20,
              width: 20,
              borderRadius: 4,
              marginRight: 8,
              marginLeft: -4,
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
            value={rgba}
            onChange={useCallback(
              (value) => {
                setValue(value)
                setRgba(value)
                onChange?.(value)
              },
              [onChange]
            )}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
