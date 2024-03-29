import React, { useState } from 'react'
import { EyeIcon, EyeBlockedIcon, color, styled, Style } from '~'
import { Single } from './Single'

type PasswordInputProps = {
  value?: string
  onChange?: (target) => void
  disabled?: boolean
  large?: boolean
  style: Style
}

export const PasswordInput = ({
  value,
  onChange,
  disabled,
  large,
  ...props
}: PasswordInputProps) => {
  const [passwordInputType, setPasswordInputType] = useState<
    'text' | 'password'
  >('password')

  const style = { ...props.style, paddingLeft: 30 }

  return (
    <styled.div
      style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : '',
      }}
    >
      <Single
        type={passwordInputType}
        // value={value}
        // @ts-ignore
        style={{
          paddingLeft: 42,
          minHeight: large ? 48 : 36,
          ...style,
        }}
        onChange={(e) => {
          onChange({ target: { value: e } })
        }}
      />

      {passwordInputType === 'text' && (
        <EyeIcon
          size={24}
          style={{
            position: 'absolute',
            left: 6,
            cursor: 'pointer',
            border: `3px solid ${color('background')}`,
            backgroundColor: color('background'),
          }}
          onClick={() => setPasswordInputType('password')}
        />
      )}
      {passwordInputType === 'password' && (
        <EyeBlockedIcon
          size={24}
          style={{
            position: 'absolute',
            left: 6,
            cursor: 'pointer',
            backgroundColor: color('background'),
            border: `3px solid ${color('background')}`,
          }}
          onClick={() => setPasswordInputType('text')}
        />
      )}
    </styled.div>
  )
}
