import React, { useEffect, ReactNode, useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Text } from '../Text'
import { styled, Style } from 'inlines'
import { IconCheckLarge, IconChevronDown, IconEmojiSad } from '../../icons'
import { color } from '../../varsUtilities'
import { RemoveScroll } from 'react-remove-scroll'
import { useControllableState } from '../../hooks'
import { scrollAreaStyle } from '../ScrollArea'
import { Tag } from '../Tag'

export type MultiSelectOption = { label?: ReactNode; value: string }

export type MultiSelectProps = {
  value: string[]
  options: MultiSelectOption[]
  placeholder?: string
  style?: Style
  onChange: (value) => void
  onOpen: () => void
  hugContent?: boolean
  defaultValue: string[]
  searchable?: boolean
}

export function MultiSelect({
  value: valueProp = [],
  defaultValue: defaultValueProp,
  options,
  placeholder,
  style,
  onChange: onChangeProp,
  onOpen = () => {
    return undefined
  },
  hugContent,
  searchable = true,
}: // props,
MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const textRef = useRef<HTMLInputElement | null>(null)

  const [open, setOpen] = useState(false)
  const [hug, setHug] = useState(inputRef.current?.offsetWidth)
  const [searchInput, setSearchInput] = useState('')

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })

  const [inputValue, setInputValue] = useState<Array<MultiSelectOption>>(() => {
    return options.filter((option) => value.includes(option.value))
  })

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const filteredOptions =
    searchable && searchInput !== ''
      ? options
          .filter(
            (item) =>
              !inputValue.map((thing) => thing.value).includes(item.value)
          )
          .filter((item) => {
            return item.label
              .toString()
              .toLocaleLowerCase()
              .includes(searchInput.toLocaleLowerCase())
          })
      : options.filter(
          (item) => !inputValue.map((thing) => thing.value).includes(item.value)
        )

  function handleSelectItem(index: number) {
    setValue([...value, filteredOptions[index].value])
    setInputValue([...inputValue, filteredOptions[index]])
    setActiveIndex(null)
    setSearchInput('')
  }

  function handleClose() {
    // setInputValue(options.filter((option) => value.includes(option.value)))
    setOpen(false)
    setActiveIndex(null)
  }

  function handleOpen() {
    if (searchable) {
      textRef.current.focus()
    }
    setOpen(true)
    onOpen()
  }

  useEffect(() => {
    setHug(inputRef.current?.offsetWidth)
  }, [inputRef.current])

  return (
    <Popover.Root open={open}>
      <Popover.Anchor asChild>
        <div
          style={{
            position: 'relative',
            maxWidth: hugContent ? hug : '100%',
          }}
        >
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
              // e.preventDefault()
              // e.stopPropagation()
              // setInputValue([...inputValue, e.target.value])
              // setActiveIndex(null)
            }}
            onKeyDown={(e) => {
              if (open && e.key === 'ArrowDown') {
                e.preventDefault()
                const newIndex =
                  activeIndex === null
                    ? 0
                    : Math.min(activeIndex + 1, options.length - 1)
                setActiveIndex(newIndex)
              }

              if (open && e.key === 'ArrowUp') {
                e.preventDefault()
                const newIndex =
                  activeIndex === null ? 0 : Math.max(0, activeIndex - 1)
                setActiveIndex(newIndex)
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
              // if (e.key === 'Backspace') {
              //   e.preventDefault()
              //   if (
              //     searchInput === '' &&
              //     value instanceof Array &&
              //     inputValue instanceof Array
              //   ) {
              //     setValue(value.pop())
              //     setInputValue(inputValue.pop())
              //     console.log(
              //       typeof value,
              //       value,
              //       typeof inputValue,
              //       inputValue
              //     )
              //   }
              // }
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
              fontFamily: 'Inter',
              minHeight: 42,
              fontWeight: '500',
              color:
                inputValue.length > 0
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
          >
            <styled.div
              onClick={() => {
                handleOpen()
              }}
              style={{
                // border: '1px solid red',
                marginTop: '8px 40px 8px 12px',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 8,
              }}
            >
              {inputValue.map((v) => (
                <Tag
                  style={{ display: 'inline-flex', flexGrow: 0 }}
                  key={v.value}
                  onClose={() => {
                    setValue(value.filter((value) => value !== v.value))
                    setInputValue(inputValue.filter((value) => value !== v))
                  }}
                >
                  {v.label}
                </Tag>
              ))}
              {searchable ? (
                <input
                  style={{
                    lineHeight: '24px',
                    background: 'transparent',
                    padding: 0,
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'Inter',
                    fontSize: 14,
                  }}
                  value={searchInput}
                  placeholder={placeholder}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                    setActiveIndex(0)
                  }}
                  ref={textRef}
                />
              ) : (
                <Text selectable="none" light>
                  {placeholder}
                </Text>
              )}
            </styled.div>
          </styled.div>

          <span
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
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
                minWidth: 'var(--radix-popover-trigger-width)',
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
              {filteredOptions.length ? (
                filteredOptions.map((item, index) => (
                  <styled.div
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
                    {value.includes(item.value) && (
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
