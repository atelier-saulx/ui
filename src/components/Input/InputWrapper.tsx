import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { styled } from 'inlines'
import { color, spaceToPx, Text, ErrorIcon } from '~'
import { Space } from '~/types'

type InputWrapperProps = {
  children: ReactNode
  errorMessage?: string
  focus?: boolean
  indent?: boolean
  space?: Space
  descriptionBottom?: string
  style?: CSSProperties
  disabled?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const InputWrapper: FC<InputWrapperProps> = ({
  children,
  indent,
  errorMessage,
  space,
  descriptionBottom,
  style,
  disabled,
  ...props
}) => {
  const [focus, setFocus] = useState(false)

  return (
    <div
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => {
        setFocus(false)
      }}
      style={{ cursor: disabled ? 'not-allowed' : null, ...style }}
    >
      <styled.div
        style={{
          borderLeft: indent ? `2px solid ${color('border')}` : null,
          borderColor: errorMessage
            ? color('red')
            : focus
            ? color('accent')
            : color('border'),
          paddingLeft: indent ? 12 : null,
          marginBottom: spaceToPx(space),
          pointerEvents: disabled ? 'none' : null,
        }}
        {...props}
      >
        {children}
        {descriptionBottom && (
          <Text color="text2" italic weight={400} style={{ marginTop: 6 }}>
            {descriptionBottom}
          </Text>
        )}
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              marginTop: 6,
            }}
          >
            <ErrorIcon color="red" size={16} />
            <Text color="red">{errorMessage}</Text>
          </div>
        )}
      </styled.div>
    </div>
  )
}
