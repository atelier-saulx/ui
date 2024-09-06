import { useEffect, useRef, useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'
import { IconButton } from '../IconButton/index.js'

type NumberInputProps = {
  value?: number
  onChange: (value: number) => void
  disabled?: boolean
  placeholder?: string
  prefix?: string
  leadIcon?: IconProps['variant']
  error?: boolean
  suffix?: string
}

function NumberInput({
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  leadIcon,
  suffix,
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(
    typeof value === 'number' ? value.toString() : '',
  )
  const [focus, setFocus] = useState(false)
  const empty = internalValue.length === 0
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof value === 'undefined') {
      setInternalValue('')
      return
    }

    setInternalValue(value.toString())
  }, [value])

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        height: 36,
        gap: 4,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 8px',
        borderRadius: radius[8],
        border: `1px solid ${colors.neutral20Adjusted}`,
        color: colors.neutral60,
        outline: 'none',
        ...(focus &&
          !disabled && {
            background: colors.neutralInverted100,
            border: `1px solid ${colors.neutral100}`,
            outline: `4px solid ${colors.neutral20}`,
          }),
        ...(error && {
          border: `1px solid ${colors.red80}`,
          ...(focus &&
            !disabled && {
              background: colors.neutralInverted100,
              border: `1px solid ${colors.red100}`,
              outline: `4px solid ${colors.red60}`,
            }),
        }),
        ...(disabled && {
          color: colors.neutral20,
          background: colors.neutral5,
          border: `1px solid transparent`,
        }),
      }}
    >
      {leadIcon && (
        <span
          style={{
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon variant={leadIcon} />
        </span>
      )}
      {prefix && (
        <span style={{ marginRight: -4, pointerEvents: 'none' }}>
          <Text color="inherit">{prefix}</Text>
        </span>
      )}
      <input
        ref={ref}
        value={internalValue}
        disabled={disabled}
        placeholder={placeholder}
        type="text"
        inputMode="numeric"
        style={{
          width: '100%',
          height: '100%',
          color: empty ? colors.neutral60 : colors.neutral100,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 'normal',
          background: 'transparent',
          outline: 'none',
          border: 'none',
          padding: 0,
          ...(disabled && {
            cursor: 'not-allowed',
          }),
        }}
        onChange={(e) => {
          let raw = e.target.value

          if (raw === '') {
            onChange(undefined)
            setInternalValue('')
            return
          }

          if (raw === '-') {
            setInternalValue('-')
            return
          }

          if (raw.startsWith('-')) {
            raw = '-' + raw.split('-').join('')
          } else {
            raw = raw.split('-').join('')
          }

          const parsed = Number.parseInt(raw)
          if (Number.isNaN(parsed)) {
            return
          }

          setInternalValue(parsed.toString())
          onChange(parsed)
        }}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
      />
      {suffix && (
        <span style={{ marginLeft: -4, pointerEvents: 'none' }}>
          <Text color="inherit">{suffix}</Text>
        </span>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          size="tiny"
          icon="tiny-chevron-up"
          onClick={() => {
            onChange(typeof value === 'undefined' ? 1 : value + 1)
          }}
        />
        <IconButton
          size="tiny"
          icon="tiny-chevron-down"
          onClick={() => {
            onChange(typeof value === 'undefined' ? -1 : value - 1)
          }}
        />
      </div>
    </div>
  )
}

export type { NumberInputProps }
export { NumberInput }
