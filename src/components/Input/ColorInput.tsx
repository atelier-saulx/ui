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

type ColorInputProps = {
  inputRef?: RefObject<HTMLInputElement>
  value?: string
  placeholder?: string
  //   defaultValue?: string
  disabled?: boolean
  style?: CSSProperties
  onChange?: (target) => void
}

export const ColorInput = ({
  inputRef,
  // name,
  placeholder,
  //   defaultValue,
  value: valueProp,
  disabled,
  style,
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
          <input
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
              paddingLeft: 36,
              border: `1px solid ${color('border', 'default')}`,
              borderRadius: 4,
              minHeight: 36,
              cursor: disabled ? 'not-allowed' : null,
              backgroundColor: color('background', 'default'),
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
              border: `1px solid ${color('border', 'default')}`,
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
