import React, { ReactNode, useEffect, useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Text } from '../Text'
import { styled, Style } from 'inlines'
import {
  IconCheckLarge,
  IconChevronDown,
  IconClose,
  IconEmojiSad,
} from '../../icons'
import { color } from '../../varsUtilities'
import { RemoveScroll } from 'react-remove-scroll'
import { scrollAreaStyle } from '../ScrollArea'
import { useControllableState } from '../../hooks/useControllableState'

export type SelectOption = { label?: ReactNode; value: string }

export type SelectInputProps = {
  value?: string
  defaultValue?: string
  onChange?: (value) => void
  options: SelectOption[]
  placeholder?: string
  clearbutton?: boolean
  size?: 'small' | 'normal'
  style?: Style
  searchable?: boolean
  hugContent?: boolean
}

const inputToString = (input: SelectOption | ''): string => {
  return typeof input === 'object'
    ? typeof input.label === 'string'
      ? input.label
      : input.value
    : ''
}

export function SelectInput({
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange: onChangeProp,
  clearbutton,
  options,
  placeholder,
  size = 'normal',
  style,
  searchable = false,
  hugContent = false,
}: SelectInputProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })
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
  const Component = searchable ? styled.input : styled.div
  const componentProps = searchable
    ? {
        value:
          size === 'small' && inputToString(inputValue).length >= 12
            ? inputToString(inputValue).split('').slice(0, 10).join('') + '...'
            : inputToString(inputValue),
        placeholder,
      }
    : {
        children: inputToString(inputValue)
          ? size === 'small' && inputToString(inputValue).length >= 12
            ? inputToString(inputValue).split('').slice(0, 10).join('') + '...'
            : inputToString(inputValue)
          : placeholder,
      }

  function handleSelectItem(index: number) {
    // && or || or just one of them idk TODO
    if (
      value === filteredOptions[index].value ||
      inputValue === filteredOptions[index]
    ) {
      setValue('')
      setInputValue('')
      setOpen(false)
      return
    }
    setValue(filteredOptions[index].value)
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
    if (searchable) {
      inputRef.current?.select()
    }
  }

  useEffect(() => {
    setInputValue(options.find((e) => e.value === value))
  }, [value])

  const [hug, setHug] = useState(inputRef.current?.offsetWidth)

  useEffect(() => {
    setHug(inputRef.current?.offsetWidth)
  }, [inputRef.current])

  return (
    <Popover.Root open={open}>
      <Popover.Anchor asChild>
        <div
          style={{
            position: 'relative',
            width: hugContent ? hug : size === 'small' ? '60%' : '100%',
          }}
        >
          <Component
            {...componentProps}
            tabIndex={0}
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
              padding:
                size === 'small' ? '6px 40px 6px 12px' : '8px 40px 8px 12px',
              fontSize: 14,
              lineHeight: '24px',
              background: 'transparent',
              fontFamily: 'Inter',
              height: 42,
              fontWeight: '500',
              color: searchable
                ? color('content', 'default', 'primary')
                : inputToString(inputValue)
                ? color('content', 'default', 'primary')
                : color('content', 'default', 'secondary'),
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
              whiteSpace: hugContent ? 'nowrap' : 'initial',
              overflow: hugContent ? 'hidden' : 'initial',
              textOverflow: hugContent ? 'ellipsis' : 'initial',
              ...style,
            }}
          />

          {inputValue && value && clearbutton && (
            <IconClose
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setInputValue(() => {
                  return options.find(() => '' === value)
                })
                setActiveIndex(0)
                setValue('')
              }}
              style={{ position: 'absolute', top: 10, right: 40 }}
            />
          )}
          <span
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              right: 12,
              top: 10,
            }}
          >
            <IconChevronDown color="default" />
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
                      marginTop: 2,
                      cursor: 'pointer',
                      //TODO is it this?
                      background:
                        index === activeIndex
                          ? color('action', 'system', 'hover')
                          : item.value === value
                          ? color('action', 'primary', 'subtleSelected')
                          : 'transparent',
                      //Or this
                      // background:
                      //   item.value === value
                      //     ? color('action', 'primary', 'subtleSelected')
                      //     : index === activeIndex
                      //     ? color('action', 'system', 'hover')
                      //     : 'transparent',
                      padding: '4px 12px 4px 42px',
                      borderRadius: 8,
                      position: 'relative',
                      scrollMargin: '8px 0',
                      color: color(
                        'content',
                        item.value === value ? 'brand' : 'default',
                        'primary'
                      ),
                      '&:active': {
                        background:
                          item.value === value
                            ? color('action', 'primary', 'subtleSelected')
                            : color('action', 'system', 'active'),
                      },
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
                        <IconCheckLarge color="inherit" />
                      </span>
                    )}
                    <Text size={14} weight="medium" color="inherit">
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
                    <IconEmojiSad color="default" />
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
