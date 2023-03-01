import React, { FC, CSSProperties, RefObject } from 'react'
import { TextInputProps } from './types'
import { SharedInput } from './Shared'
import { PasswordInput } from './SingleTextInput/PasswordInput'
import { InputWrapper } from './InputWrapper'

type SingleProps = {
  type?: string
  inputRef?: RefObject<any>
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
  style?: CSSProperties
}

const Single: FC<SingleProps> = ({
  type,
  inputRef,
  pattern,
  style,
  ...props
}) => {
  // if (type === 'color') {
  //   return <ColorInput inputRef={inputRef} {...props} />
  // }
  return (
    <input
      {...props}
      type={type}
      ref={inputRef}
      pattern={pattern}
      style={{
        width: '100%',
        userSelect: 'text',
        MozUserSelect: 'text',
        WebkitUserSelect: 'text',
        ...style,
      }}
    />
  )
}

export const TextInput: FC<TextInputProps> = (props) => {
  const style = props.style || {}
  if (props.type === 'password') {
    return (
      <SharedInput style={style}>
        <PasswordInput {...props} />
      </SharedInput>
    )
  } else
    return (
      <SharedInput style={style}>
        <InputWrapper>
          {props.icon}
          <Single
            type="text"
            {...props}
            // safari fix maybe it breaks smth
            onKeyDown={(e) => {
              // now you can remove the zero in input fields
              if (e.key === 'Backspace' && value === 0) {
                // setValue('')
              }
              // for some reason pressing . in number input
              // changed the value to one
              if (e.key === '.' && type === 'number') {
                e.preventDefault()
              }
              props.onKeyDown?.(e)
            }}
            style={props.style}
            // @ts-ignore
            // onFocus={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
          />
        </InputWrapper>
      </SharedInput>
    )

  return (
    <>
      <SharedInput style={style}>BLABLABLA</SharedInput>
    </>
  )
  // if (inputRef) throw new Error('UI: Cannot use inputRef on Multiline Input')
  // const [inputFocus, setInputFocus] = useState(false)

  // return (
  //   <div
  //     onFocus={() => setInputFocus(true)}
  //     onBlur={() => setInputFocus(false)}
  //     style={{
  //       border: inputFocus
  //         ? `2px solid rgba(44, 60, 234, 0.2)`
  //         : `2px solid transparent`,
  //       borderRadius: 10,
  //     }}
  //   >
  //     <textarea
  //       style={{
  //         ...style,
  //         display: 'block',
  //         resize: 'none',
  //         paddingTop: 8,
  //         minHeight: 84,
  //         paddingLeft: 12,
  //         // outline: inputFocus
  //         //   ? `3px solid rgba(44, 60, 234, 0.2)`
  //         //   : `3px solid transparent`,
  //         border: inputFocus
  //           ? `1.5px solid ${color('accent')}`
  //           : `1px solid ${color('border')}`,
  //       }}
  //       ref={resize}
  //       onInput={({ target }) => resize(target)}
  //       {...props}
  //     />
  //   </div>
}
