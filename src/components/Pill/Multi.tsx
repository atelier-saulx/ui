import React, { Fragment, ReactNode, useRef, useState } from 'react'
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
import { BpMedium, BpTablet } from 'src/utils'

export type PillOption = { label?: ReactNode; value: string }

export type MultiPillProps = {
  value: string[]
  options: PillOption[]
  placeholder?: string
  prefix?: string
  style?: Style
  onChange: (value) => void
  icon?: ReactNode
}

export function MultiPill({
  value,
  options,
  placeholder,
  prefix = 'Prefix',
  style,
  onChange,
  icon,
}: // props,
MultiPillProps) {
  const [open, setOpen] = useState(false)

  const [inputValue, setInputValue] = useState<Array<PillOption>>(() => {
    return options.filter((option) => value.includes(option.value))
  })
  const valueCheck = inputValue.length !== 0 ?? false

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function handleSelectItem(index: number) {
    if (inputValue.includes(options[index])) {
      onChange(value.filter((v) => v !== options[index].value))
      setInputValue(inputValue.filter((v) => v !== options[index]))
      return
    }
    onChange([...value, options[index].value])
    setInputValue([...inputValue, options[index]])
    // setOpen(false)
    setActiveIndex(null)
  }

  function handleClose() {
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
          onFocus={() => {
            handleOpen()
          }}
          value={inputValue}
          ref={inputRef}
          onChange={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setInputValue([...inputValue, e.target.value])
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
            border: valueCheck
              ? `1px solid ${color('inputBorder', 'neutralNormal')}`
              : 'none',
            background: valueCheck
              ? color('background', 'default', 'strong')
              : color('action', 'neutral', 'subtleNormal'),
            '&:hover': {
              background: valueCheck
                ? color('background', 'default', 'strong')
                : color('action', 'neutral', 'subtleHover'),
              border: valueCheck
                ? `1px solid ${color('inputBorder', 'neutralHover')}`
                : 'none',
            },
            '&:active': {
              background: valueCheck
                ? color('background', 'default', 'strong')
                : color('action', 'neutral', 'subtleActive'),
              border: valueCheck
                ? `1px solid ${color('inputBorder', 'neutralActive')}`
                : 'none',
            },
            borderRadius: 4,
            gap: 8,
            alignItems: 'center',
            ...style,
          }}
        >
          {icon}
          <styled.div style={{ display: 'flex', gap: 6 }}>
            <Text selectable="none" light>
              {prefix}:
            </Text>
            <Text selectable="none" style={{ marginLeft: 6 }}>
              {valueCheck
                ? inputValue.length === 1
                  ? inputValue[0].label
                  : inputValue.map((v) => (
                      <Fragment key={v.label + '12'}>{v.label}, </Fragment>
                    ))
                : placeholder}
            </Text>
          </styled.div>
          {valueCheck ? (
            <styled.div
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setActiveIndex(0)
                setInputValue([])
                onChange([])
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
                [BpTablet]: {
                  '&:hover': null,
                },

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
                    {value.includes(item.value) && (
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
