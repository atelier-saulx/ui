import React, { FC, useState, useEffect, useCallback } from 'react'
import { TextInputProps } from './types'
import { PasswordInput } from './SingleTextInput/PasswordInput'
import { InputWrapper } from './InputWrapper'
import { usePropState, useFocus, useHover } from '~/hooks'
import { color, renderOrCreateElement } from '~/utils'
import { MaybeSuggest } from './MaybeSuggest'
import { Single } from './Single'
import { DigestInput } from './SingleTextInput/DigestInput'

export const TextInput: FC<TextInputProps> = (props) => {
  const {
    type,
    pattern,
    style,
    indent,
    label,
    description,
    space,
    descriptionBottom,
    disabled,
    icon,
    error,
    ghost,
    defaultValue,
    placeholder,
    onChange: onChangeProp,
    autoFocus,
    inputRef,
    iconRight,
    bg,
  } = props

  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()
  const [errorMessage, setErrorMessage] = useState('')
  const [focused, setFocused] = useState(false)
  const [value = '', setValue] = usePropState(
    props.value,
    props.noInterrupt && focused
  )

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
      const reOk = v === '' || new RegExp(props.pattern).test(v)
      const msg = error ? error(value) : reOk ? '' : 'Does not match pattern'
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [value])
  const onChange = useCallback(
    (e: { target: { value: string } }) => {
      const newValue = props.transform
        ? props.transform(e.target.value)
        : e.target.value
      setValue(newValue)
      onChangeProp?.(newValue)
    },
    [onChangeProp]
  )
  const paddingLeft = ghost && icon ? 36 : ghost ? 0 : icon ? 36 : 12
  const paddingRight = ghost ? 0 : iconRight ? 36 : 12
  const fontSize = 14
  const fontWeight = 400
  const moreProps = {
    onChange,
    name,
    type,
    value,
    defaultValue,
    placeholder,
    disabled,
    autoFocus,
    style: {
      outlineRadius: '8',
      outlineOffset: ghost ? null : focus ? -1 : -1,
      borderRadius: 8,
      boxShadow: ghost ? null : `0px 1px 4px ${color('background2')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      color: disabled ? color('text2:hover') : 'inherit',
      minHeight: ghost ? 36 : 36,
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
  if (type === 'digest') {
    return (
      <InputWrapper
        style={{ position: 'relative' }}
        indent={indent}
        label={label}
        description={description}
        space={space}
        descriptionBottom={descriptionBottom}
        errorMessage={errorMessage}
        disabled={disabled}
      >
        <DigestInput {...props} />
      </InputWrapper>
    )
  } else if (type === 'password') {
    return (
      <InputWrapper
        style={{ position: 'relative' }}
        indent={indent}
        label={label}
        description={description}
        space={space}
        descriptionBottom={descriptionBottom}
        errorMessage={errorMessage}
        disabled={disabled}
      >
        <PasswordInput {...props} />
      </InputWrapper>
    )
  } else if (type === 'text' || type === 'email' || type === 'phone') {
    return (
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
        {renderOrCreateElement(props.icon, {
          style: {
            position: 'absolute',
            left: indent ? 24 : 12,
            top:
              label && description
                ? '77.5%'
                : label || description
                ? '72.5%'
                : '50%',
            transform: 'translate3d(0,-50%,0)',
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
          <MaybeSuggest
            focused={focused}
            forceSuggestion={props.forceSuggestion}
            suggest={props.suggest}
            value={value}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            fontSize={fontSize}
            fontWeight={fontWeight}
            onChange={onChange}
          >
            <Single
              type={type}
              {...moreProps}
              // safari fix maybe it breaks smth
              onKeyDown={(e) => {
                // now you can remove the zero in input fields
                if (e.key === 'Backspace' && value === 0) {
                  setValue('')
                }
                // for some reason pressing . in number input
                // changed the value to one
                // @ts-ignore
                if (e.key === '.' && props.type === 'number') {
                  e.preventDefault()
                }
                props.onKeyDown?.(e)
              }}
              style={{ position: 'relative', ...moreProps.style }}
              // @ts-ignore
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </MaybeSuggest>
        </div>
      </InputWrapper>
    )
  } else return null
}
