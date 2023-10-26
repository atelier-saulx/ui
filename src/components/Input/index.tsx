import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
  ReactNode,
  RefObject,
  ReactEventHandler,
  KeyboardEvent,
} from 'react'
import {
  usePropState,
  useFocus,
  useHover,
  color,
  Style,
  Icon,
  DateWidget,
} from '~'
import { ColorInput } from './ColorInput'
import { JsonInput } from './JsonInput'
import { InputWrapper } from './InputWrapper'
import { DigestInput } from './DigestInput'
import { MarkdownInput } from './MarkdownInput'
import { PasswordInput } from './PasswordInput'
import { Single } from './Single'
import { Multi } from './Multi'
import { MaybeSuggest } from './MaybeSuggest'
import { UrlInput } from './UrlInput'

const PLACEHOLDERS: Record<InputType, string> = {
  text: 'Text',
  password: 'Password',
  email: 'Email',
  phone: 'Phone',
  search: 'Search...',
  markdown: 'Markdown',
  number: 'Number',
  date: 'Date',
  json: 'JSON',
  multiline: 'Multiline text',
  digest: 'Digest',
  url: 'Url',
  color: 'Color',
}

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'phone'
  | 'search'
  | 'color'
  | 'markdown'
  | 'number'
  | 'date'
  | 'json'
  | 'multiline'
  | 'digest'
  | 'url'

type OnChange<T extends InputType> = (
  value: T extends 'number' ? number : string
) => void

export const Input = <T extends InputType>({
  autoFocus,
  bg,
  pattern,
  defaultValue,
  description,
  descriptionBottom,
  disabled,
  error,
  forceSuggestion,
  ghost,
  icon,
  iconRight,
  indent,
  inputRef,
  label,
  large,
  maxChars,
  name,
  noInterrupt,
  onChange: onChangeProp,
  placeholder = '',
  style,
  suggest,
  transform,
  type,
  time,
  value: valueProp,
  ...otherProps
}: {
  type: T // <--- this is it
  onChange?: OnChange<T>
  style?: Style
  label?: ReactNode
  pattern?: string
  description?: string
  descriptionBottom?: string
  value?: string | number
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
  indent?: boolean
  defaultValue?: string | number
  placeholder?: ReactNode
  maxChars?: number
  bg?: boolean
  ghost?: boolean
  autoFocus?: boolean
  name?: string
  min?: number
  max?: number
  inputRef?: RefObject<HTMLDivElement>
  large?: boolean
  disabled?: boolean
  suggest?: (str: string) => string // show suggestion => Enter to complete
  error?: (str: string, patternMatches?: boolean) => string // show error
  transform?: (str: string) => string // transform string
  forceSuggestion?: boolean // apply suggestion on blur
  noInterrupt?: boolean // dont use external state while focused
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
  onBlur?: ReactEventHandler
  time?: boolean
}) => {
  const [focused, setFocused] = useState(false)
  const [value = '', setValue] = usePropState(valueProp, noInterrupt && focused)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover, active } = useHover()
  const [errorMessage, setErrorMessage] = useState('')

  if (maxChars === -1) {
    maxChars = null
  }

  useEffect(() => {
    if (maxChars && value.length > maxChars) {
      setValue(value.slice(0, maxChars))
    }
  }, [value])

  const onChange = useCallback(
    (e: { target: { value: string } }) => {
      const newValue = transform ? transform(e.target.value) : e.target.value
      if (type === 'number') {
        setValue(+e.target.value)
        // @ts-ignore
        onChangeProp?.(+newValue)
      } else {
        setValue(newValue)
        // @ts-ignore
        onChangeProp?.(newValue)
      }
    },
    [onChangeProp]
  )

  const paddingLeft = ghost && icon ? 36 : ghost ? 0 : icon ? 36 : 12
  const paddingRight = ghost ? 0 : iconRight ? 36 : 12
  const fontSize = 14
  const fontWeight = 400
  const props = {
    name,
    type,
    value,
    pattern,
    defaultValue,
    placeholder,
    disabled,
    onChange,
    error,
    autoFocus,
    style: {
      outlineRadius: '8',
      outlineOffset: ghost ? null : focused ? -1 : -1,
      borderRadius: 8,
      boxShadow: ghost ? null : `0px 1px 4px ${color('background2')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      color: disabled ? color('text2:hover') : 'inherit',
      minHeight: ghost ? '' : large ? 48 : 36,
      paddingLeft,
      border:
        bg || ghost
          ? `0px solid transparent`
          : focused
          ? `1.5px solid ${color('accent')}`
          : `1px solid ${color('border')}`,
      paddingRight,
      width: '100%',
      fontSize,
      fontWeight,
      backgroundColor: bg
        ? color(focused && !disabled ? 'border' : 'background2')
        : 'inherit',
    },
    inputRef,
    ...focusListeners,
    ...hoverListeners,
    ...otherProps,
  }

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

  if (!props.placeholder) {
    props.placeholder = PLACEHOLDERS[type]
  }

  return (
    <InputWrapper
      style={style}
      indent={indent}
      label={label}
      description={description}
      descriptionBottom={descriptionBottom}
      errorMessage={errorMessage}
      disabled={disabled}
      value={value}
      setValue={setValue}
      onChange={(e) => {
        onChangeProp?.(e.target.value)
      }}
      maxChars={maxChars}
    >
      {type === 'color' ? (
        <ColorInput
          onChange={(e) => {
            onChangeProp?.(e.target.value)
          }}
          disabled={disabled}
          value={value}
        />
      ) : type === 'json' ? (
        <JsonInput {...props} setErrorMessage={setErrorMessage} />
      ) : type === 'markdown' ? (
        <MarkdownInput {...props} />
      ) : type === 'multiline' ? (
        <Multi {...props} />
      ) : type === 'digest' ? (
        <DigestInput {...props} disabled={!!valueProp} />
      ) : type === 'password' ? (
        <PasswordInput {...props} large={large} disabled={!!valueProp} setErrorMessage={setErrorMessage}/>
      ) : type === 'date' ? (
        <DateWidget onChange={() => onChange} value={value} time={time} />
      ) : type === 'url' ? (
        <UrlInput
          onChange={(e) => onChangeProp?.(e.target.value)}
          {...props}
          style={props.style}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          setErrorMessage={setErrorMessage}
          focused={focused}
        />
      ) : (
        <MaybeSuggest
          focused={focused}
          forceSuggestion={forceSuggestion}
          suggest={suggest}
          value={value}
          paddingLeft={paddingLeft + 1}
          paddingRight={paddingRight}
          fontSize={fontSize}
          fontWeight={fontWeight}
          onChange={onChange}
        >
          <Single
            {...props}
            onKeyDown={(e) => {
              // now you can remove the zero in input fields
              if (e.key === 'Backspace' && value.toString().length === 1) {
                setValue('')
                onChange({ target: { value: '' } })
              }
              // for some reason pressing . in number input changed the value to one
              if (e.key === '.' && type === 'number') {
                e.preventDefault()
              }
              props.onKeyDown?.(e)
            }}
            style={props.style}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            icon={icon}
            iconRight={iconRight}
            setErrorMessage={setErrorMessage}
          />
        </MaybeSuggest>
      )}
    </InputWrapper>
  )
}
