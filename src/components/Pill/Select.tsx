import React, { ReactNode, useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Text } from '../Text'
import { styled, Style } from 'inlines'
import {
  IconCheckLarge,
  IconChevronDown,
  IconEmojiSad,
  IconSmallClose,
} from '../../icons'
import { color } from '../../varsUtilities'
import { RemoveScroll } from 'react-remove-scroll'

import { scrollAreaStyle } from '../ScrollArea'
import { BpTablet } from '../../utils'

export type PillOption = { label?: ReactNode; value: string }

export type SelectPillProps = {
  value: string
  options: PillOption[]
  placeholder?: string
  prefix?: string
  style?: Style
  onChange: (value) => void
  icon?: ReactNode
}

const inputToString = (input: PillOption | void): string => {
  return typeof input === 'object'
    ? typeof input.label === 'string'
      ? input.label
      : input.value
    : ''
}

export function SelectPill({
  value,
  options,
  placeholder,
  prefix = 'Prefix',
  style,
  onChange,
  icon,
}: // props,
SelectPillProps) {
  const [open, setOpen] = useState(false)

  const [inputValue, setInputValue] = useState<PillOption | void>(() => {
    return options.find((e) => {
      e.value === value
    })
  })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function handleSelectItem(index: number) {
    onChange(options[index].value)
    setInputValue(options[index])
    setOpen(false)
    setActiveIndex(null)
  }

  function handleClose() {
    setInputValue(options.find((e) => e.value === value))
    setOpen(false)
    setActiveIndex(null)
  }

  function handleOpen() {
    setOpen(true)
  }

  return (
    <Popover.Root open={open}>
      <Popover.Anchor asChild>
        <styled.div
          tabIndex={0}
          onClick={() => {
            handleOpen()
          }}
          onFocus={(e) => {
            //TODO wont open for some reason?
            handleOpen()
          }}
          value={inputToString(inputValue)}
          ref={inputRef}
          onChange={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setInputValue({ value: e.target.value })
            setActiveIndex(null)
          }}
          onKeyDown={(e) => {
            if (open && e.key === 'ArrowDown') {
              e.preventDefault()
              const newIndex =
                activeIndex === null
                  ? 0
                  : Math.min(activeIndex + 1, options.length - 1)
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
          style={{
            display: 'flex',
            boxSizing: 'border-box',
            outline: 'none',
            cursor: 'pointer',
            minWidth: 130,
            maxWidth: '100%',
            padding: '4px 8px',
            fontSize: 14,
            lineHeight: '24px',
            border: inputValue
              ? `1px solid ${color('inputBorder', 'neutralNormal')}`
              : 'none',
            background: inputValue
              ? color('background', 'default', 'strong')
              : color('action', 'neutral', 'subtleNormal'),
            '&:hover': {
              background: inputValue
                ? color('background', 'default', 'strong')
                : color('action', 'neutral', 'subtleHover'),
              border: inputValue
                ? `1px solid ${color('inputBorder', 'neutralHover')}`
                : 'none',
            },
            '&:active': {
              background: inputValue
                ? color('background', 'default', 'strong')
                : color('action', 'neutral', 'subtleActive'),
              border: inputValue
                ? `1px solid ${color('inputBorder', 'neutralActive')}`
                : 'none',
            },
            borderRadius: 4,
            gap: 8,
            alignItems: 'center',
            ...style,
            '&:focus': {
              backgroundColor: 'red',
            },
          }}
        >
          {icon}
          <styled.div style={{ display: 'flex', gap: 6 }}>
            <Text selectable="none" light>
              {prefix}:
            </Text>
            <Text selectable="none" style={{ marginLeft: 6 }}>
              {inputValue ? inputToString(inputValue) : placeholder}
            </Text>
          </styled.div>
          {inputValue ? (
            <styled.div
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setInputValue(() => {
                  return options.find(() => '' === value)
                })
                setActiveIndex(0)
                onChange(0)
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
          ) : (
            <IconChevronDown style={{ marginLeft: 'auto' }} />
          )}
        </styled.div>
      </Popover.Anchor>
      <Popover.Portal>
        <RemoveScroll allowPinchZoom>
          <Popover.Content
            onInteractOutside={(e) => {
              handleClose()
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
                // width: 'var(--radix-popover-trigger-width)',
                border: `1px solid ${color('border', 'default', 'strong')}`,
                borderRadius: 8,
                padding: 8,
                background: color('standalone', 'modal', 'default'),
                boxShadow:
                  '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
                ...scrollAreaStyle,
              }}
            >
              {options.length ? (
                options.map((item, index) => (
                  <styled.div
                    id={`combobox-item-${index}`}
                    style={{
                      cursor: 'pointer',
                      background:
                        index === activeIndex
                          ? color('action', 'system', 'hover')
                          : 'transparent',
                      [BpTablet]: {
                        background: 'transparent',
                      },
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
                        <IconCheckLarge color="default" />
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
