import { useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Badge } from '../Badge/index.js'

type TextAreaInputProps = {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  error?: boolean
  maxLength?: number
  rows?: 'adaptive' | number
  disabled?: boolean
}

function TextAreaInput({
  value,
  onChange,
  rows = 'adaptive',
  error,
  maxLength,
  placeholder,
  disabled,
}: TextAreaInputProps) {
  const [focus, setFocus] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)
  const length = typeof value !== 'string' ? 0 : value.length

  return (
    <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
      <textarea
        ref={ref}
        value={value ?? ''}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        style={{
          resize: 'none',
          color: length === 0 ? colors.neutral60 : colors.neutral100,
          borderRadius: radius[8],
          padding: '6px 8px',
          outline: 'none',
          width: '100%',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 'normal',
          ...(rows === 'adaptive' && {
            fieldSizing: 'content',
            minHeight: 68,
            maxHeight: 256,
          }),
          background: 'transparent',
          border: `1px solid ${colors.neutral20Adjusted}`,
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
        rows={rows === 'adaptive' ? undefined : rows}
      />
      {focus && maxLength && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: -4,
            transform: 'translateY(100%)',
            display: 'flex',
          }}
        >
          <Badge
            color={error ? 'red-fill' : 'neutral-fill'}
          >{`${length}/${maxLength}`}</Badge>
        </div>
      )}
    </div>
  )
}

export type { TextAreaInputProps }
export { TextAreaInput }
