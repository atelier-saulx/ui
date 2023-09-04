import React, { useEffect, useRef, useState } from 'react'
import {
  IconCheckLarge,
  IconChevronDownSmall,
  IconEmojiSad,
  color,
  styled,
} from '../..'

export type SelectInputOption = {
  label: string
  value: string
  beforeIcon?: React.ReactNode
  afterIcon?: React.ReactNode
}

export type SelectInputProps = {
  options: SelectInputOption[]
  value: string
  onChange: (newValue: string) => void
  beforeIcon?: React.ReactNode
  disabled?: boolean
  placeholder?: string
}

export function SelectInput({
  options,
  beforeIcon,
  disabled,
  placeholder,
  value,
  onChange,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [filter, setFilter] = useState<null | string>(null)

  function handleChange(newValue: string) {
    setOpen(false)
    setFilter(null)
    onChange(newValue)
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return

      if (e.key === 'ArrowUp' && focus > 0) {
        e.preventDefault()
        setFocus(focus - 1)
      }
      if (e.key === 'ArrowDown' && focus < options.length - 1) {
        e.preventDefault()
        setFocus(focus + 1)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
      if (e.key === 'Enter') {
        e.preventDefault()

        handleChange(options[focus].value)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, focus])

  const filteredOptions = options.filter((e) =>
    filter
      ? e.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      : true
  )

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
        <styled.input
          ref={inputRef}
          style={{
            padding: 0,
            appearance: 'none',
            height: '100%',
            width: '100%',
            border: 'none',
            '&:focus': {
              outline: 'none',
            },
            minHeight: 24,
            lineHeight: '24px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
          value={
            filter === null
              ? value === ''
                ? ''
                : options.find((e) => e.value === value)!.label
              : filter
          }
          onChange={(e) => {
            setOpen(true)
            setFilter(e.target.value)
          }}
          onFocus={() => {
            setOpen(true)
            inputRef.current?.select()
          }}
          placeholder={placeholder}
        />
        <div
          style={{
            flexShrink: 0,
            paddingLeft: 8,
            marginLeft: 'auto',
          }}
        >
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
              setOpen(false)
            }}
          />
          <styled.div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 48,
              background: color('background', 'default', 'surface'),
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
                    handleChange(option.value)
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
