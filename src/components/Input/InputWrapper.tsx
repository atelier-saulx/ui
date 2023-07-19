import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import {
  color,
  Text,
  ErrorIcon,
  styled,
  Color,
  Label,
  Button,
  useHover,
} from '~'

type InputWrapperProps = {
  children: ReactNode
  errorMessage?: string
  focus?: boolean
  indent?: boolean
  label?: ReactNode
  description?: string
  descriptionBottom?: string
  style?: CSSProperties
  disabled?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  color?: Color
  onClick?: () => void
  onBlur?: () => void
  value?: any
  setValue?: (e) => void
  maxChars?: number
  onChange?: (e) => void
  hideClearButton?: boolean
}

export const InputWrapper: FC<InputWrapperProps> = ({
  children,
  indent,
  errorMessage,
  label,
  description,
  descriptionBottom,
  style,
  disabled,
  color: colorProp = 'accent',
  value,
  setValue,
  onChange: onChangeProp,
  maxChars,
  hideClearButton,
  ...props
}) => {
  const [focus, setFocus] = useState(false)

  return (
    <styled.div
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
          pointerEvents: disabled ? 'none' : null,
          ...style,
        }}
        {...props}
      >
        <styled.div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Label
            label={label}
            description={description}
            style={{ marginBottom: 6, marginLeft: 4 }}
          />
          {indent && !hideClearButton && (
            <Button
              ghost
              onClick={() => {
                onChangeProp?.('')
                setValue('')
              }}
              disabled={disabled}
              style={{
                opacity: focus && value !== '' ? 1 : 0,
                transition: 'opacity 0.2s',
                height: 'fit-content',
                marginTop: description ? 0 : -6,
                marginBottom: description ? 0 : 6,
              }}
              color="accent"
            >
              Clear
            </Button>
          )}
        </styled.div>

        {children}

        {maxChars && (
          <styled.div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 4,
              marginTop: 8,
            }}
          >
            <Text color="text2" weight={400}>
              {value.length} characters
            </Text>
            <Text color="text2" weight={400}>
              Max {maxChars} characters
            </Text>
          </styled.div>
        )}

        {descriptionBottom && (
          <Text color="text2" italic weight={400} style={{ marginTop: 6 }}>
            {descriptionBottom}
          </Text>
        )}
        {errorMessage && (
          <styled.div
            style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              marginTop: 6,
            }}
          >
            <ErrorIcon color="red" size={16} />
            <Text color="red">{errorMessage}</Text>
          </styled.div>
        )}
      </styled.div>
    </styled.div>
  )
}
