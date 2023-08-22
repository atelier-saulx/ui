import React, { useEffect, useRef, useState } from 'react'
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
  value: string | null
  onChange?: (newValue: string) => void
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
  value: incomingValue = null,
  onChange,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string | null>(incomingValue)
  const [activeLabel, setActiveLabel] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

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
          minWidth: 320,
        }}
        onClick={() => {
          if (disabled) return

          setOpen(true)
        }}
      >
        <div>{value === null ? placeholder : activeLabel}</div>
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
                  setActiveLabel(option.label)
                  setOpen(false)
                  onChange?.(option.value)
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
            ))}
          </styled.div>
        </>
      )}
    </styled.div>
  )
}
