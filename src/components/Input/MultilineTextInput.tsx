import React, {
  useState,
  FC,
  useEffect,
  // ChangeEvent,
  useCallback,
} from 'react'
import { MultiLineTextInputProps } from './types'
import { InputWrapper } from './InputWrapper'
import { usePropState, Button } from '~'
import { color } from '~/utils'
import { JsonInput } from './MultiLineInput/JsonInput'
import { MarkdownInput } from './MultiLineInput/MarkdownInput'

const resize = (target) => {
  if (target) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 8 + 'px'
  }
}
export const MultiLineTextInput: FC<MultiLineTextInputProps> = (props) => {
  const {
    onChange: onChangeProp,
    type,
    pattern,
    style,
    indent,
    label,
    description,
    space,
    descriptionBottom,
    disabled,
    inputRef,
  } = props

  // const { listeners: focusListeners, focus } = useFocus()
  // const { listeners: hoverListeners, hover } = useHover()
  const [showJSONClearButton, setShowJSONClearButton] = useState(false)
  const [clearValue, setClearValue] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [focused] = useState(false)
  const [value = '', setValue] = usePropState(
    props.value,
    props.noInterrupt && focused
  )
  const onChange = useCallback(
    (e: { target: { value: string } }) => {
      const newValue = props.transform
        ? props.transform(e.target.value)
        : e.target.value
      setValue(newValue)
      // @ts-ignore
      onChangeProp?.(newValue)
    },
    [onChangeProp]
  )
  if (inputRef) throw new Error('UI: Cannot use inputRef on Multiline Input')
  const [inputFocus, setInputFocus] = useState(false)

  useEffect(() => {
    //  check for when blurred
    if (!props.pattern) {
      const msg = props.error?.(value)
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [focused])

  useEffect(() => {
    if (pattern) {
      const v = typeof value === 'number' ? String(value) : value
      const reOk = v === '' || new RegExp(pattern).test(v)
      const msg = props.error
        ? props.error(value)
        : reOk
        ? ''
        : 'Does not match pattern'
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [value])
  if (type === 'json') {
    return (
      <InputWrapper
        style={{ position: 'relative', ...style }}
        indent={indent}
        label={label}
        description={description}
        space={space}
        descriptionBottom={descriptionBottom}
        errorMessage={errorMessage}
        disabled={disabled}
      >
        {indent && showJSONClearButton && (
          <Button
            ghost
            onClick={() => {
              setShowJSONClearButton(false)
              setValue('')
              // @ts-ignore
              onChangeProp?.('')
              setClearValue(true)
              setErrorMessage('')
            }}
            style={{
              height: 'fit-content',
              position: 'absolute',
              top: 0,
              right: 0,
              marginLeft: 'auto',
            }}
            disabled={disabled}
          >
            Clear
          </Button>
        )}
        <JsonInput
          {...props}
          setErrorMessage={setErrorMessage}
          value={value}
          onChange={onChange}
          setShowJSONClearButton={setShowJSONClearButton}
          setClearValue={setClearValue}
          clearValue={clearValue}
          disabled={disabled}
        />
      </InputWrapper>
    )
  } else if (type === 'markdown') {
    return (
      <MarkdownInput
        {...props}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    )
  } else {
    return (
      <div
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        style={{
          border: inputFocus
            ? `2px solid rgba(44, 60, 234, 0.2)`
            : `2px solid transparent`,
          borderRadius: 10,
        }}
      >
        <textarea
          style={{
            ...style,
            display: 'block',
            resize: 'none',
            paddingTop: 8,
            minHeight: 84,
            paddingLeft: 12,
            border: inputFocus
              ? `1.5px solid ${color('accent')}`
              : `1px solid ${color('border')}`,
          }}
          ref={resize}
          onInput={({ target }) => resize(target)}
          // {...props}
        />
      </div>
    )
  }
}
