import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { styled } from 'inlines'
import { color } from '../../varsUtilities'
import { IconCheckLarge, IconChevronDownSmall } from '../..'

export type SelectInputOption = {
  label: string
  value: string
  beforeIcon?: React.ReactNode
  afterIcon?: React.ReactNode
}

export type SelectInputOwnProps = {
  options: SelectInputOption[]
  beforeIcon?: React.ReactNode
  disabled?: boolean
  placeholder?: string
}

export type SelectInputProps = SelectInputOwnProps

export function SelectInput({
  options,
  beforeIcon,
  disabled,
  placeholder,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string | null>(null)
  const [_activeLabel, _setActiveLabel] = useState<string | null>(null)
  const [_minWidth, _setMinWidth] = useState<number | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // in cases where the placeholder is longer than any of the labels
  // we have to calculate the minimum width of the input
  // so that it does not jump around once an item is selected
  useLayoutEffect(() => {
    if (value || !placeholder || !buttonRef.current) return

    _setMinWidth(buttonRef.current.clientWidth)
  }, [placeholder])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <styled.div
      style={{
        position: 'relative',
        height: 40,
        width: '100%',
        padding: '0 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: color('background', 'default', 'surface'),
        fontSize: '14px',
        lineHeight: '24px',
        border: `1px solid ${color('inputBorder', 'neutralNormal', 'default')}`,
        cursor: 'pointer',
        '&:hover': {
          border: `1px solid ${color(
            'inputBorder',
            'neutralHover',
            'default'
          )}`,
        },
        boxSizing: 'border-box',
        '&:focus-within': {
          border: `1px solid ${color('inputBorder', 'active', 'default')}`,
          boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
        },
        ...(disabled
          ? {
              opacity: '50%',
            }
          : {}),
      }}
    >
      {beforeIcon && <div style={{ flexShrink: 0 }}>{beforeIcon}</div>}
      <styled.button
        ref={buttonRef}
        style={{
          width: '100%',
          height: '100%',
          appearance: 'none',
          border: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          padding: 0,
          textAlign: 'left',
          color: color('content', 'default', 'primary'),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '&:focus': {
            outline: 'none',
          },
          minWidth: _minWidth,
        }}
        onClick={() => {
          if (disabled) return

          setOpen(true)
        }}
      >
        <div>{value === null ? placeholder : _activeLabel}</div>
        <div
          style={{
            flexShrink: 0,
            paddingLeft: 8,
          }}
        >
          <IconChevronDownSmall />
        </div>
      </styled.button>

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
            {options.map((option) => (
              <styled.div
                key={option.value}
                onClick={() => {
                  setValue(option.value)
                  _setActiveLabel(option.label)
                  setOpen(false)
                }}
                style={{
                  position: 'relative',
                  userSelect: 'none',
                  cursor: 'pointer',
                  height: 32,
                  background: color('background', 'default', 'surface'),
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  padding: '0 12px 0 42px',
                  borderRadius: 8,
                  '&:hover': {
                    background: color('action', 'system', 'hover'),
                  },
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
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <IconCheckLarge />
                  </div>
                )}
                {option.label}
              </styled.div>
            ))}
          </styled.div>
        </>
      )}
    </styled.div>
  )
}
