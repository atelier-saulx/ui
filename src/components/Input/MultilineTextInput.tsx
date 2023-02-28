import React, { useState, FC } from 'react'
import { MultiLineTextInputProps } from './types'
import { SharedInput } from './Shared'

export const MultiLineTextInput: FC<MultiLineTextInputProps> = (props) => {
  return <>{/* <SharedInput /> */}</>
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
