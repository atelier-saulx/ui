import React, { FC, useCallback, useEffect, useState } from 'react'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { IconAlertFill } from '../..'
import { Text } from '../Text'

type InputProps = {
  //  description?: string
  disabled?: boolean
  onChange?: (value: any) => void
  errorMessage?: string // show error
  //  label?: string
  pattern?: string
  placeholder?: string
  style?: Style
  type: 'text' | 'number' | 'date' | 'json' | 'multiline' | 'markdown'
  value?: any
}

// TODO the right colors system for borders
const StyledInput = styled('input', {
  border: `1px solid ${genColor('border', 'default', 'strong')}`,
  borderRadius: '8px',
  color: genColor('content', 'default', 'primary'),
  fontSize: '14px',
  lineHeight: '24px',
  padding: '8px 12px',
  width: '100%',
})

export const Input: FC<InputProps> = ({
  disabled,
  onChange,
  errorMessage,
  pattern,
  placeholder,
  style,
  type,
  value,
}) => {
  const [errorMsg, setErrorMsg] = useState('')

  //   const onChange = useCallback(
  //     (e: { target: { value } }) => {
  //       e.target.value
  //     },
  //     [onChangeProp]
  //   )

  useEffect(() => {
    if (pattern) {
      const v = value
      const reOk = v === '' || new RegExp(pattern).test(v)
      const msg =
        reOk && errorMessage ? errorMessage : reOk ? 'does not match' : ''
      // ? onError(value, reOk)
      // : reOk
      // ? ''
      // : 'Does not match pattern'
      if (msg && value.toString().length > 0) {
        setErrorMsg(msg)
      } else {
        setErrorMsg('')
      }
    }
  }, [value])

  return (
    <styled.div
      style={{
        cursor: disabled ? 'not-allowed' : 'text',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
    >
      {type === 'text' ? (
        <StyledInput
          onChange={onChange}
          placeholder={placeholder}
          type="text"
          value={value}
          style={{
            border: `1px solid ${genColor(
              'border',
              errorMsg ? 'negative' : 'default',
              'strong'
            )}`,
            '&:hover': {
              border: `1px solid ${genColor(
                'border',
                errorMsg ? 'negative' : 'default',
                'strong'
              )}`,
            },
            '&:focus': {
              border: `1px solid ${genColor(
                'border',
                errorMsg ? 'negative' : 'brand',
                'strong'
              )}`,
              boxShadow: '0px 0px 0px 2px rgba(87, 63, 207, 0.20)',
            },
            '&:focus-visible': {
              border: `1px solid ${genColor(
                'border',
                errorMsg ? 'negative' : 'brand',
                'strong'
              )}`,
              boxShadow: '0px 0px 0px 2px rgba(87, 63, 207, 0.20)',
              outline: 'none',
            },
          }}
        />
      ) : (
        <div>flupo</div>
      )}

      {errorMsg && (
        <styled.div
          style={{ alignItems: 'center', display: 'flex', marginTop: 8 }}
        >
          <IconAlertFill color="negative" />
          <Text size={14} style={{ marginLeft: '8px' }} color="negative">
            {errorMsg}
          </Text>
        </styled.div>
      )}
    </styled.div>
  )
}
