import { useEffect, useRef, useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'
import { IconButton } from '../IconButton/index.js'

type NumberInputProps = {
  value: number | null
  onChange: (value: number) => void
  disabled?: boolean
  placeholder?: string
  label?: string
  prefix?: string
  leadIcon?: IconProps['variant']
  description?: string
  error?: string
  suffix?: string
}

function NumberInput({
  value,
  onChange,
  placeholder,
  label,
  description,
  error,
  disabled,
  prefix,
  leadIcon,
  suffix,
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(
    value === null ? '' : value.toString(),
  )
  const [focus, setFocus] = useState(false)
  const empty = internalValue.length === 0
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value === null) {
      setInternalValue('')
      return
    }

    setInternalValue(value.toString())
  }, [value])

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
      }}
    >
      {label && (
        <Text variant="subtext-regular" color="neutral60">
          {label}
        </Text>
      )}
      <div
        style={{
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
            fontFamily: 'inherit',
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
              onChange(null)
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
            variant="tiny-chevron-up"
            onClick={() => {
              onChange(value === null ? 1 : value + 1)
            }}
          />
          <IconButton
            size="tiny"
            variant="tiny-chevron-down"
            onClick={() => {
              onChange(value === null ? -1 : value - 1)
            }}
          />
        </div>
      </div>
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: colors.red100,
          }}
        >
          <Icon variant="error-filled" />
          <Text color="inherit" variant="display-medium">
            {error}
          </Text>
        </div>
      )}
      {description && (
        <Text variant="display-regular" color="neutral60">
          {description}
        </Text>
      )}
    </div>
  )
}

export type { NumberInputProps }
export { NumberInput }
