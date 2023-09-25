import React, { useEffect, useRef, useState } from 'react'
import {
  IconCheckLarge,
  IconChevronDownSmall,
  IconEmojiSad,
  IconSmallClose,
  color,
  Style,
  styled,
  Tag,
  Button,
  color as genColor,
  IconClose,
  BpTablet,
} from '~'

export type SelectInputOption = {
  label?: string
  value: string | number
  beforeIcon?: React.ReactNode
  afterIcon?: React.ReactNode
}

export type SelectInputProps = {
  preventCloseOnSelect?: boolean
  options: (SelectInputOption | number | string)[]
  beforeIcon?: React.ReactNode
  style?: Style
  disabled?: boolean
  placeholder?: string
} & (
  | {
      multiple?: false
      value?: string | number
      onChange: (newValue: string | number) => void
    }
  | {
      multiple: true
      value?: (number | string)[]
      onChange: (newValues: (number | string)[]) => void
    }
)

export function SelectInput({
  options,
  beforeIcon,
  disabled,
  placeholder,
  value = [],
  preventCloseOnSelect,
  onChange,
  style,
  multiple,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [filter, setFilter] = useState<null | string>(null)

  // @ts-ignore TS too stupid
  const parsed: {
    label: string
    value: string | number
    beforeIcon?: React.ReactNode
    afterIcon?: React.ReactNode
  }[] = options.map((l) => {
    let option: SelectInputOption
    if (typeof l !== 'object') {
      option = {
        value: l,
        label: typeof l === 'number' ? String(l) : l,
      }
    } else {
      option = l
    }
    // @ts-ignore TS too stupid
    return option.label === undefined
      ? {
          // @ts-ignore TS too stupid
          ...option,
          label:
            typeof option.value === 'number'
              ? String(option.value)
              : option.value,
        }
      : option
  })

  const filteredOptions = parsed
    .filter((e) =>
      filter
        ? e.label?.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        : true
    )
    // @ts-ignore TS to stupid (multiple is optional)
    .filter((e) => (multiple ? value.includes(e.value) === false : true))

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return

      if (e.key === 'ArrowUp' && focus > 0) {
        e.preventDefault()
        setFocus(focus - 1)
      }
      if (e.key === 'ArrowDown' && focus < filteredOptions.length - 1) {
        e.preventDefault()
        setFocus(focus + 1)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        setOpen(false)
        setFilter(null)
        setFocus(0)
        multiple
          ? // @ts-ignore TS to stupid (multiple is optional)
            onChange([...value, filteredOptions[focus].value])
          : // @ts-ignore
            onChange(filteredOptions[focus]?.value)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, focus, filteredOptions])

  const parsedValue = multiple
    ? filter || ''
    : filter === null
    ? value === ''
      ? ''
      : parsed.find((e) => e.value === value)?.label
    : filter
  console.log(value)
  return (
    <styled.div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontSize: '14px',
        lineHeight: '24px',
        cursor: 'pointer',
        boxSizing: 'border-box',
        maxWidth: 320,
        ...(open
          ? {
              border: `1px solid ${color('inputBorder', 'active', 'default')}`,
              boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
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
        ...(disabled
          ? {
              opacity: '50%',
            }
          : {}),
        ...style,
      }}
    >
      <styled.div
        style={{
          width: '100%',
          minHeight: 38,
          appearance: 'none',
          border: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          padding: '0 12px',
          textAlign: 'left',
          color: color('content', 'default', 'primary'),
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          minWidth: 200,
        }}
        onClick={() => {
          if (disabled) return

          setOpen(true)
          setFocus(0)
          inputRef.current?.select()
        }}
      >
        {beforeIcon && (
          <div
            style={{
              flexShrink: 0,
              paddingRight: 8,
            }}
          >
            {beforeIcon}
          </div>
        )}
        <div
          style={
            multiple
              ? {
                  // flex: '1 1 0%',
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  padding: '7px 0',
                }
              : {}
          }
        >
          {multiple &&
            value instanceof Array &&
            value.map((v, i) => (
              <Tag
                key={i}
                onClose={() => {
                  onChange(value.filter((e) => e !== v))
                }}
              >
                {parsed.find((e) => e.value === v)?.label}
              </Tag>
            ))}

          <styled.input
            disabled={disabled}
            ref={inputRef}
            style={{
              height: 24,
              padding: 0,
              appearance: 'none',
              border: 'none',
              '&:focus': {
                outline: 'none',
              },
              lineHeight: '24px',
              fontSize: '14px',
              cursor: 'pointer',
              background: 'transparent',
              color: 'inherit',
            }}
            value={typeof parsedValue === 'object' ? value : parsedValue}
            onChange={(e) => {
              setOpen(true)
              setFocus(0)
              setFilter(e.target.value)
            }}
            onFocus={() => {
              setOpen(true)
              inputRef.current?.select()
            }}
            placeholder={placeholder}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexShrink: 0,
            paddingLeft: 8,
            flexDirection: 'row',
            marginLeft: 'auto',
          }}
        >
          {!multiple && value !== '' && (
            <styled.div
              onClick={(e) => {
                if (disabled) return
                e.stopPropagation()
                e.preventDefault()
                // @ts-ignore
                onChange('')
              }}
              style={{
                borderRadius: '4px',
                flexShrink: 0,
                marginLeft: 'auto',
                '&:hover': {
                  backgroundColor: genColor('action', 'system', 'hover'),
                },
                [BpTablet]: {
                  '&:hover': null,
                },
                '&:active': {
                  backgroundColor: genColor('action', 'system', 'active'),
                },
              }}
            >
              <IconClose />
            </styled.div>
          )}
          <IconChevronDownSmall />
        </div>
      </styled.div>

      {open && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onClick={() => {
              if (!preventCloseOnSelect) {
                setOpen(false)
              }
            }}
          />
          <styled.div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              background: color('background', 'default', 'surface'),
              transform: 'translateY(calc(100% + 8px))',
              border: `1px solid ${color(
                'inputBorder',
                'neutralNormal',
                'default'
              )}`,
              borderRadius: 8,
              padding: 8,
              '& > * + *': {
                marginTop: '2px',
              },
              zIndex: 50,
            }}
          >
            {filteredOptions.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  height: 32,
                  padding: '0 12px',
                }}
              >
                <IconEmojiSad />
                <span style={{ marginLeft: 10 }}>No item found</span>
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <styled.div
                  idx={index}
                  key={option.value}
                  onMouseEnter={() => {
                    setFocus(index)
                  }}
                  onClick={() => {
                    if (!preventCloseOnSelect) {
                      setOpen(false)
                    }
                    setFilter(null)
                    setFocus(0)
                    multiple
                      ? // @ts-ignore
                        onChange([...value, option.value])
                      : // @ts-ignore
                        onChange(option.value)
                  }}
                  style={{
                    position: 'relative',
                    userSelect: 'none',
                    cursor: 'pointer',
                    height: 32,
                    background:
                      index === focus
                        ? color('action', 'system', 'hover')
                        : color('background', 'default', 'surface'),
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    padding: '0 12px 0 42px',
                    borderRadius: 8,
                    '&:active': {
                      background: color('action', 'system', 'active'),
                    },
                  }}
                >
                  {value === option.value && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 12,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconCheckLarge />
                    </div>
                  )}
                  {option.label}
                </styled.div>
              ))
            )}
          </styled.div>
        </>
      )}
    </styled.div>
  )
}
