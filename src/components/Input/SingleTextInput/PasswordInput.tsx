import React, { useState, useEffect } from 'react'
import {
  EyeIcon,
  EyeBlockedIcon,
  LockIcon,
  color,
  renderOrCreateElement,
  useFocus,
  useHover,
} from '~'
import { InputWrapper } from '../InputWrapper'
import { Single } from '../Single'
import { TextInputProps } from '../types'

export const PasswordInput = ({
  value,
  disabled,
  indent,
  style,
  label,
  type,
  space,
  description,
  descriptionBottom,
  pattern,
  error,
  ghost,
  onChange,
  autoFocus,
  bg,
  inputRef,
}: TextInputProps) => {
  const [passwordInputType, setPasswordInputType] = useState<
    'text' | 'password'
  >('password')

  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()
  const [errorMessage, setErrorMessage] = useState('')
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    //  check for when blurred
    if (!pattern) {
      const msg = error?.(value)
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [focused])

  useEffect(() => {
    if (pattern) {
      const v = value
      const reOk = v === '' || new RegExp(pattern).test(v)
      const msg = error ? error(value) : reOk ? '' : 'Does not match pattern'
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [value])
  const paddingLeft = ghost ? 0 : 36
  const paddingRight = ghost ? 0 : 36
  const fontSize = 14
  const fontWeight = 400
  const moreProps = {
    onChange,
    name,
    type,
    value,
    disabled,
    autoFocus,
    style: {
      outlineRadius: '8',
      outlineOffset: ghost ? null : focus ? -1 : -1,
      borderRadius: 8,
      boxShadow: ghost ? null : `0px 1px 4px ${color('background2')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      color: disabled ? color('text2:hover') : 'inherit',
      minHeight: ghost ? '' : 36,
      paddingLeft,
      border: ghost
        ? `0px solid transparent`
        : focused
        ? `1.5px solid ${color('accent')}`
        : `1px solid ${color('border')}`,
      paddingRight,
      width: '100%',
      fontSize,
      fontWeight,
      backgroundColor: bg
        ? color(hover && !disabled ? 'border' : 'border')
        : 'inherit',
    },
    inputRef,
    ...focusListeners,
    ...hoverListeners,
  }
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <InputWrapper
        indent={indent}
        style={{ position: 'relative', ...style }}
        label={label}
        description={description}
        space={space}
        descriptionBottom={descriptionBottom}
        errorMessage={errorMessage}
        disabled={disabled}
      >
        {renderOrCreateElement(<LockIcon />, {
          style: {
            position: 'absolute',
            left: indent ? 24 : 12,
            top:
              label && description
                ? '77.5%'
                : label || description
                ? '72.5%'
                : '50%',
            transform: 'translate3d(0,-60%,0)',
            pointerEvents: 'none',
          },
        })}
        <div
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            border: focused
              ? `2px solid rgba(44, 60, 234, 0.2)`
              : `2px solid transparent`,
            borderRadius: 10,
            position: 'relative',
          }}
        >
          <Single
            type={passwordInputType}
            // safari fix maybe it breaks smth
            style={{ position: 'relative', ...moreProps.style }}
            // @ts-ignore
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        {passwordInputType === 'text' && (
          <EyeIcon
            size={24}
            style={{
              position: 'absolute',
              top: '50%',
              right: 6,
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
              top: '50%',
              right: 6,
              cursor: 'pointer',
              backgroundColor: color('background'),
              border: `3px solid ${color('background')}`,
            }}
            onClick={() => setPasswordInputType('text')}
          />
        )}
      </InputWrapper>
    </div>
  )
}
