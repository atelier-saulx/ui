import React, { ReactNode, useEffect, useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Text } from '../Text'
import { styled, Style } from 'inlines'
import { IconCheckLarge, IconChevronDown, IconEmojiSad } from '../../icons'
import { color } from '../../varsUtilities'
import { RemoveScroll } from 'react-remove-scroll'
import { scrollAreaStyle } from '../ScrollArea'

export type SelectOption = { label?: ReactNode; value: string }

export type SelectInputProps = {
  value: string
  onChange: (value) => void
  options: SelectOption[]
  placeholder?: string
  style?: Style
}

const inputToString = (input: SelectOption | ''): string => {
  return typeof input === 'object'
    ? typeof input.label === 'string'
      ? input.label
      : input.value
    : ''
}

export function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  style,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState<SelectOption | ''>('')
  const [inputValueChanged, setInputValueChanged] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const filteredOptions =
    inputValueChanged && inputValue
      ? options.filter((e) => {
          const f: string = typeof e.label === 'string' ? e.label : e.value
          return f
            .toLocaleLowerCase()
            .includes(inputToString(inputValue).toLocaleLowerCase())
        })
      : options

  function handleSelectItem(index: number) {
    onChange(filteredOptions[index].value)
    setInputValue(filteredOptions[index])
    setInputValueChanged(false)
    setOpen(false)
    setActiveIndex(null)
  }

  function handleClose() {
    setInputValueChanged(false)
    setInputValue(options.find((e) => e.value === value))
    setOpen(false)
    setActiveIndex(null)
  }

  function handleOpen() {
    setOpen(true)
    inputRef.current?.select()
  }

  useEffect(() => {
    setInputValue(options.find((e) => e.value === value))
  }, [value])

  return (
    <Popover.Root open={open}>
      <Popover.Anchor asChild>
        <div style={{ position: 'relative', width: '100%' }}>
          <styled.input
            value={inputToString(inputValue)}
            ref={inputRef}
            onClick={() => {
              handleOpen()
            }}
            onFocus={() => {
              handleOpen()
            }}
            onChange={(e) => {
              setInputValue({ value: e.target.value })
              setInputValueChanged(true)
              setActiveIndex(null)
            }}
            onKeyDown={(e) => {
              if (open && e.key === 'ArrowDown') {
                e.preventDefault()
                const newIndex =
                  activeIndex === null
                    ? 0
                    : Math.min(activeIndex + 1, filteredOptions.length - 1)
                setActiveIndex(newIndex)
                document
                  .querySelector(`#combobox-item-${newIndex}`)
                  .scrollIntoView({ block: 'nearest' })
              }

              if (open && e.key === 'ArrowUp') {
                e.preventDefault()
                const newIndex =
                  activeIndex === null ? 0 : Math.max(0, activeIndex - 1)
                setActiveIndex(newIndex)
                document
                  .querySelector(`#combobox-item-${newIndex}`)
                  .scrollIntoView({ block: 'nearest' })
              }

              if (e.key === 'Enter') {
                e.preventDefault()

                if (open) {
                  if (activeIndex !== null) {
                    handleSelectItem(activeIndex)
                  }
                } else {
                  handleOpen()
                }
              }
            }}
            placeholder={placeholder}
            style={{
              boxSizing: 'border-box',
              outline: 'none',
              width: '100%',
              padding: '8px 40px 8px 12px',
              fontSize: 14,
              lineHeight: '24px',
              background: 'transparent',
              fontFamily: 'Inter-Medium',
              color: color('content', 'default', 'primary'),
              borderRadius: 8,
              '&::placeholder': {
                color: color('content', 'default', 'secondary'),
              },
              ...(open
                ? {
                    border: `1px solid ${color(
                      'inputBorder',
                      'active',
                      'default'
                    )}`,
                    boxShadow: `0 0 0 2px ${color(
                      'border',
                      'brand',
                      'subtle'
                    )}`,
                  }
                : {
                    border: `1px solid ${color(
                      'inputBorder',
                      'neutralNormal',
                      'default'
                    )}`,
                    '&:hover': {
                      border: `1px solid ${color(
                        'inputBorder',
                        'neutralHover',
                        'default'
                      )}`,
                    },
                  }),
              ...style,
            }}
          />
          <span
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              right: 12,
              top: 10,
            }}
          >
            <IconChevronDown />
          </span>
        </div>
      </Popover.Anchor>
      <Popover.Portal>
        <RemoveScroll allowPinchZoom>
          <Popover.Content
            onInteractOutside={(e) => {
              if (e.target === inputRef?.current) {
                e.preventDefault()
              } else {
                handleClose()
              }
            }}
            onOpenAutoFocus={(e) => {
              e.preventDefault()
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault()
            }}
            sideOffset={8}
            asChild
          >
            <styled.div
              style={{
                boxSizing: 'border-box',
                overflowY: 'auto',
                maxHeight:
                  'min(300px, calc(var(--radix-popover-content-available-height) - 16px))',
                width: 'var(--radix-popover-trigger-width)',
                border: `1px solid ${color('border', 'default', 'strong')}`,
                borderRadius: 8,
                padding: 8,
                background: color('standalone', 'modal', 'default'),
                boxShadow:
                  '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
                ...scrollAreaStyle,
              }}
            >
              {filteredOptions.length ? (
                filteredOptions.map((item, index) => (
                  <styled.div
                    id={`combobox-item-${index}`}
                    style={{
                      cursor: 'pointer',
                      background:
                        index === activeIndex
                          ? color('action', 'system', 'hover')
                          : 'transparent',
                      padding: '4px 12px 4px 42px',
                      borderRadius: 8,
                      position: 'relative',
                      scrollMargin: '8px 0',
                    }}
                    onClick={() => {
                      handleSelectItem(index)
                    }}
                    onPointerMove={() => {
                      setActiveIndex(index)
                    }}
                    key={item.value}
                  >
                    {item.value === value && (
                      <span style={{ position: 'absolute', left: 12, top: 6 }}>
                        <IconCheckLarge />
                      </span>
                    )}
                    <Text color="default" size={14} weight="medium">
                      {item.label ?? item.value}
                    </Text>
                  </styled.div>
                ))
              ) : (
                <div
                  style={{
                    position: 'relative',
                    background: 'transparent',
                    padding: '4px 12px 4px 42px',
                  }}
                >
                  <span style={{ position: 'absolute', left: 12, top: 6 }}>
                    <IconEmojiSad />
                  </span>

                  <Text color="default" size={14} weight="medium">
                    No item found
                  </Text>
                </div>
              )}
            </styled.div>
          </Popover.Content>
        </RemoveScroll>
      </Popover.Portal>
    </Popover.Root>
  )
}
