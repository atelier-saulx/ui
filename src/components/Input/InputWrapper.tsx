import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { styled } from 'inlines'
import { color, Label, spaceToPx, Text, ErrorIcon } from '~'
import { Color, Space } from '~/types'

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
  color?: Color
  onClick?: () => void
  onBlur?: () => void
  label: any
  description: string
}

export const InputWrapper: FC<InputWrapperProps> = ({
  children,
  indent,
  errorMessage,
  space,
  descriptionBottom,
  style,
  label,
  description,
  disabled,
  color: colorProp = 'accent',
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
            ? color(colorProp)
            : color('border'),
          paddingLeft: indent ? 12 : null,
          marginBottom: spaceToPx(space),
          pointerEvents: disabled ? 'none' : null,
        }}
        {...props}
      >
        <Label
          label={label}
          description={description}
          style={{ marginBottom: 6, marginLeft: 4 }}
        />
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
