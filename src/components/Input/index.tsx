import React from 'react'
import { styled } from 'inlines'
import { color, border } from '../../varsUtilities'

const expectNever = (value: never): never => {
  throw new TypeError('Unexpected value: ' + value)
}

type InputProps = ({ type: 'text' } & TextInputProps) | { type: 'other' }

export function Input({ type, ...props }: InputProps) {
  switch (type) {
    case 'text':
      return <TextInput {...props} />
    case 'other':
      return <div>other</div>
    default:
      expectNever(type)
  }
}

type TextInputOwnProps = {
  prefix?: string
  suffix?: string
}

type TextInputProps = TextInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<'input'>, 'style'>

function TextInput({ prefix, suffix, ...props }: TextInputProps) {
  return (
    <styled.div
      style={{
        padding: '8px 12px',
        borderRadius: 8,
        display: 'flex',
        backgroundColor: 'white',
        fontSize: '14px',
        lineHeight: '24px',
        border: border(1, 'default', 'strong'),
        '&:hover': {
          // TODO correct hover color
          //   border: `1px solid ${color('border', 'default', 'hover')}`,
        },
        '&:focus-within': {
          border: border(1, 'brand', 'strong'),
          boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
        },
      }}
    >
      {prefix && (
        <styled.div
          style={{
            marginRight: 8,
            backgroundColor: color('background', 'neutral', 'soft'),
            color: color('content', 'default', 'primary'),
            padding: '0 8px',
            borderRadius: 24,
          }}
        >
          {prefix}
        </styled.div>
      )}
      <styled.input
        style={{
          width: '100%',
          appearance: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          color: color('content', 'default', 'primary'),
          '&::placeholder': {
            color: color('content', 'default', 'secondary'),
          },
        }}
        {...props}
      />
      {suffix && (
        <styled.div
          style={{
            marginLeft: 8,
            backgroundColor: color('background', 'neutral', 'soft'),
            color: color('content', 'default', 'primary'),
            padding: '0 8px',
            borderRadius: 24,
          }}
        >
          {suffix}
        </styled.div>
      )}
    </styled.div>
  )
}
