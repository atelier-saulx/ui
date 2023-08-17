import React, { FC, useCallback } from 'react'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../varsUtilities'

type InputProps = {
  //  description?: string
  disabled?: boolean
  onChange?: (value: any) => void
  //  label?: string
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
  '&:hover': {
    border: `1px solid ${genColor('border', 'default', 'strong')}`,
  },
  '&:focus': {
    border: `1px solid ${genColor('border', 'brand', 'strong')}`,
    boxShadow: '0px 0px 0px 2px rgba(87, 63, 207, 0.20)',
  },
  '&:focus-visible': {
    border: `1px solid ${genColor('border', 'brand', 'strong')}`,
    boxShadow: '0px 0px 0px 2px rgba(87, 63, 207, 0.20)',
    outline: 'none',
  },
})

export const Input: FC<InputProps> = ({
  disabled,
  onChange: onChangeProp,
  placeholder,
  style,
  type,
  value,
}) => {
  const onChange = useCallback(
    (e: { target: { value } }) => {
      e.target.value
    },
    [onChangeProp]
  )

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
          onChange={(e) => onChangeProp?.(e.target.value)}
          placeholder={placeholder}
          type="text"
          value={value}
        />
      ) : (
        <div>flupo</div>
      )}
    </styled.div>
  )
}
