// TODO yves en youri fix this
import React, {
  FC,
  FunctionComponent,
  CSSProperties,
  RefObject,
  useState,
  useEffect,
  KeyboardEvent,
  ReactNode,
  ReactEventHandler,
  useCallback,
} from 'react'
import { Text, Button, ChevronDownIcon, ChevronUpIcon } from '~'
import { Label } from '../Label'
import { color, renderOrCreateElement } from '~/utils'
import { usePropState, useFocus, useHover } from '~/hooks'
import { Space, Icon } from '~/types'
import { ColorInput } from './ColorInput'
import { styled, Style } from 'inlines'
import { JsonInput } from './JsonInput'
import { InputWrapper } from './InputWrapper'
import { DigestInput } from './DigestInput'
import { MarkdownInput } from './MarkdownInput'
import { PasswordInput } from './PasswordInput'

const resize = (target) => {
  if (target) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 8 + 'px'
  }
}

const Multi = ({ style, inputRef, ...props }) => {
  if (inputRef) throw new Error('UI: Cannot use inputRef on Multiline Input')
  const [inputFocus, setInputFocus] = useState(false)

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
          // outline: inputFocus
          //   ? `3px solid rgba(44, 60, 234, 0.2)`
          //   : `3px solid transparent`,
          border: inputFocus
            ? `1.5px solid ${color('accent')}`
            : `1px solid ${color('border')}`,
        }}
        ref={resize}
        onInput={({ target }) => resize(target)}
        {...props}
      />
    </div>
  )
}

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
  if (type === 'color') {
    return <ColorInput inputRef={inputRef} {...props} />
  }
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

// type InputProps<T extends InputType = InputType> =

const MaybeSuggest = (props) =>
  props.suggest ? <Suggestor {...props} /> : props.children

const Suggestor = ({
  suggest,
  value,
  children,
  paddingLeft,
  paddingRight,
  fontSize,
  fontWeight,
  onChange,
  forceSuggestion,
  focused,
}) => {
  const suggestion = suggest(value)
  const showSuggestion = focused && value && suggestion && suggestion !== value

  return (
    <div
      style={{
        position: 'relative',
      }}
      onKeyDown={
        showSuggestion
          ? (e) => {
              if (e.key === 'Enter') {
                onChange({ target: { value: suggestion } })
              }
            }
          : null
      }
      onBlur={() => {
        if (forceSuggestion) {
          onChange({ target: { value: suggestion } })
        }
      }}
    >
      {showSuggestion ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: paddingLeft,
            right: paddingRight,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            opacity: 0.4,
            pointerEvents: 'none',
            fontSize,
            fontWeight,
          }}
        >
          {suggestion}
        </div>
      ) : null}
      {children}
    </div>
  )
}

type InputType =
  | 'password'
  | 'email'
  | 'phone'
  | 'color'
  | 'markdown'
  | 'number'
  | 'date'
  | 'json'
  | 'file' // for the files limitiation

type AllInputProps = {
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
  label?: ReactNode
  description?: string
  descriptionBottom?: string
  indent?: boolean
  placeholder?: string
  ghost?: boolean
  autoFocus?: boolean
  style?: Style
  pattern?: string
  disabled?: boolean
  inputRef?: RefObject<HTMLDivElement>
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent) => void
  onFucus?: (e: FocusEvent) => void
  /** 
    Do not use external state while focused
    */
  noInterrupt?: boolean
  space?: Space
}

type TextInput = AllInputProps & {
  type: 'text' | 'email' | 'password' | 'phone'
  defaultValue?: string
  value?: string
  onChange: (value: string) => void
  maxChars?: number
  multiline?: false
  error?: (str: string, patternMatches?: boolean) => string // show error
}

type MultiLineTextInput = AllInputProps & {
  defaultValue?: string
  value?: string
  onChange: (value: string) => void
  maxChars?: number
  error?: (str: string) => string // show error //   const x:MultiLineTextInput = { t}
} & (
    | {
        type: 'text'
        multiline: true
      }
    | {
        type: 'markdown' | 'json'
        multiline?: true
      }
  )

type DigestInput = AllInputProps & {}

export type InputProps = TextInput | MultiLineTextInput

export const isMultiLineTextInput = (
  props: InputProps
): props is MultiLineTextInput => {
  return (
    props.type === 'markdown' ||
    props.type === 'json' ||
    props.multiline === true
  )
}

export const Input: FC<InputProps> = (props) => {
  if (isMultiLineTextInput(props)) {
    console.log(props)
  }
  // const { v } = props
  // console.log(defaultValue, value, onChange)
  const {
    icon,
    iconRight,
    label,
    description,
    descriptionBottom,
    indent,
    placeholder,
    ghost,
    autoFocus,
    style,
    pattern,
    disabled,
    inputRef,
    onKeyDown,
    onKeyPress,
    onBlur,
    onFucus,
    noInterrupt,
    space,
  } = props
  return null

  // const [focused, setFocused] = useState(false)
  // const [value = '', setValue] = usePropState(valueProp, noInterrupt && focused)
  // const { listeners: focusListeners, focus } = useFocus()
  // const { listeners: hoverListeners, hover } = useHover()
  // // TODO Why is there always a color value!?
  // const [colorValue, setColorValue] = useState('rgba(255,255,255,1)')
  // const [errorMessage, setErrorMessage] = useState('')
  // const [clearValue, setClearValue] = useState(false)
  // const [showJSONClearButton, setShowJSONClearButton] = useState(false)
  // if (maxChars === -1) {
  //   maxChars = null
  // }
  // useEffect(() => {
  //   if (maxChars && value.length > maxChars) {
  //     setValue(value.slice(0, maxChars))
  //   }
  // }, [value])

  // const onChange = useCallback(
  //   (e: { target: { value: string } }) => {
  //     const newValue = transform ? transform(e.target.value) : e.target.value
  //     if (type === 'number') {
  //       setValue(+e.target.value)
  //       // @ts-ignore
  //       onChangeProp?.(+newValue)
  //     } else {
  //       setValue(newValue)
  //       // @ts-ignore
  //       onChangeProp?.(newValue)
  //     }
  //   },
  //   [onChangeProp]
  // )

  // const paddingLeft = ghost && icon ? 36 : ghost ? 0 : icon ? 36 : 12
  // const paddingRight = ghost ? 0 : iconRight ? 36 : 12
  // const fontSize = 14
  // const fontWeight = 400
  // const props = {
  //   // consoleFunc,
  //   name,
  //   type,
  //   value,
  //   defaultValue,
  //   placeholder,
  //   disabled,
  //   onChange,
  //   autoFocus,
  //   style: {
  //     outlineRadius: '8',
  //     outlineOffset: ghost ? null : focus ? -1 : -1,
  //     borderRadius: 8,
  //     boxShadow: ghost ? null : `0px 1px 4px ${color('background2')}`,
  //     cursor: disabled ? 'not-allowed' : 'text',
  //     color: disabled ? color('text2:hover') : 'inherit',
  //     minHeight: ghost ? '' : large ? 48 : 36,
  //     paddingLeft,
  //     border: ghost
  //       ? `0px solid transparent`
  //       : focused
  //       ? `1.5px solid ${color('accent')}`
  //       : `1px solid ${color('border')}`,
  //     paddingRight,
  //     width: '100%',
  //     fontSize,
  //     fontWeight,
  //     backgroundColor: bg
  //       ? color(hover && !disabled ? 'border' : 'border')
  //       : 'inherit',
  //   },
  //   inputRef,
  //   ...focusListeners,
  //   ...hoverListeners,
  //   ...otherProps,
  // }

  // useEffect(() => {
  //   //  check for when blurred
  //   if (!pattern) {
  //     const msg = error?.(value)
  //     if (msg) {
  //       setErrorMessage(msg)
  //     } else {
  //       setErrorMessage('')
  //     }
  //   }
  // }, [focused])

  // useEffect(() => {
  //   if (pattern) {
  //     const v = typeof value === 'number' ? String(value) : value
  //     const reOk = v === '' || new RegExp(pattern).test(v)
  //     const msg = error
  //       ? error(value, reOk)
  //       : reOk
  //       ? ''
  //       : 'Does not match pattern'
  //     if (msg) {
  //       setErrorMessage(msg)
  //     } else {
  //       setErrorMessage('')
  //     }
  //   }
  // }, [value])

  // return (
  //   <InputWrapper
  //     style={style}
  //     indent={indent}
  //     space={space}
  //     descriptionBottom={descriptionBottom}
  //     errorMessage={errorMessage}
  //     disabled={disabled}
  //   >
  //     <div
  //       style={{
  //         width: '100%',
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: 'flex',
  //           justifyContent: 'space-between',
  //         }}
  //       >
  //         <Label
  //           label={label}
  //           description={description}
  //           style={{ marginBottom: 6, marginLeft: 4 }}
  //         />
  //         {value !== '' && indent && !jsonInput && (
  //           <Button
  //             ghost
  //             onClick={() => {
  //               // @ts-ignore
  //               onChangeProp?.('')
  //               setValue('')
  //             }}
  //             disabled={disabled}
  //             style={{
  //               height: 'fit-content',
  //               marginTop: description ? 0 : -6,
  //             }}
  //           >
  //             Clear
  //           </Button>
  //         )}
  //         {/* JSON Input CLEAR BUTTON */}
  //         {indent && jsonInput && showJSONClearButton && (
  //           <Button
  //             ghost
  //             onClick={() => {
  //               setShowJSONClearButton(false)
  //               setValue('')
  //               // @ts-ignore
  //               onChangeProp?.('')
  //               setClearValue(true)
  //               setErrorMessage('')
  //             }}
  //             style={{ height: 'fit-content' }}
  //             disabled={disabled}
  //           >
  //             Clear
  //           </Button>
  //         )}
  //       </div>
  //       <div
  //         style={{
  //           position: 'relative',
  //           color: color('text'),
  //           border: ghost
  //             ? `2px solid transparent`
  //             : focused
  //             ? `2px solid rgba(44, 60, 234, 0.2)`
  //             : `2px solid transparent`,
  //           borderRadius: 10,
  //         }}
  //       >
  //         {!jsonInput && !markdownInput && !multiline
  //           ? renderOrCreateElement(icon, {
  //               style: {
  //                 position: 'absolute',
  //                 left: 12,
  //                 top: '50%',
  //                 transform: 'translate3d(0,-50%,0)',
  //                 pointerEvents: 'none',
  //               },
  //             })
  //           : null}

  //         {colorInput ? (
  //           <ColorInput
  //             onChange={(e) => {
  //               setColorValue(e.target.value)
  //             }}
  //             disabled={disabled}
  //             value={colorValue}
  //             style={{ width: '100%' }}
  //           />
  //         ) : jsonInput || type === 'json' ? (
  //           <JsonInput
  //             {...props}
  //             setErrorMessage={setErrorMessage}
  //             value={value}
  //             onChange={onChange}
  //             setShowJSONClearButton={setShowJSONClearButton}
  //             setClearValue={setClearValue}
  //             clearValue={clearValue}
  //             disabled={disabled}
  //           />
  //         ) : markdownInput ? (
  //           <MarkdownInput
  //             {...props}
  //             value={value}
  //             onChange={onChange}
  //             disabled={disabled}
  //           />
  //         ) : multiline ? (
  //           <Multi {...props} />
  //         ) : digest ? (
  //           <DigestInput
  //             {...props}
  //             disabled={!!valueProp}
  //             onChange={onChange}
  //             value={value}
  //           />
  //         ) : passwordInput ? (
  //           <PasswordInput
  //             {...props}
  //             icon={icon}
  //             large={large}
  //             disabled={!!valueProp}
  //             onChange={onChange}
  //             value={value}
  //           />
  //         ) : (
  //           <MaybeSuggest
  //             focused={focused}
  //             forceSuggestion={forceSuggestion}
  //             suggest={suggest}
  //             value={value}
  //             paddingLeft={paddingLeft}
  //             paddingRight={paddingRight}
  //             fontSize={fontSize}
  //             fontWeight={fontWeight}
  //             onChange={onChange}
  //           >
  //             <Single
  //               type="text"
  //               {...props}
  //               // safari fix maybe it breaks smth
  //               onKeyDown={(e) => {
  //                 // now you can remove the zero in input fields
  //                 if (e.key === 'Backspace' && value === 0) {
  //                   setValue('')
  //                 }
  //                 // for some reason pressing . in number input
  //                 // changed the value to one
  //                 if (e.key === '.' && type === 'number') {
  //                   e.preventDefault()
  //                 }
  //                 props.onKeyDown?.(e)
  //               }}
  //               style={props.style}
  //               // @ts-ignore
  //               onFocus={() => setFocused(true)}
  //               onBlur={() => setFocused(false)}
  //             />
  //           </MaybeSuggest>
  //         )}
  //         {type === 'number' && !disabled && (
  //           <div
  //             style={{
  //               position: 'absolute',
  //               right: 8,
  //               top: '50%',
  //               transform: 'translate3d(0,-50%,0)',
  //               display: 'flex',
  //               flexDirection: 'column',
  //               width: 15,
  //               height: 20,
  //             }}
  //           >
  //             <styled.div
  //               style={{
  //                 border: `1px solid ${color('border')}`,
  //                 borderTopLeftRadius: 5,
  //                 borderTopRightRadius: 5,
  //                 display: 'flex',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 height: 10,
  //                 '@media (hover: hover)': {
  //                   '&:hover': {
  //                     backgroundColor: color('border'),
  //                   },
  //                 },
  //               }}
  //               onClick={() => {
  //                 onChange({ target: { value: String(+value + 1) } })
  //               }}
  //             >
  //               <ChevronUpIcon size={9} strokeWidth={2.5} />
  //             </styled.div>
  //             <styled.div
  //               style={{
  //                 border: `1px solid ${color('border')}`,
  //                 borderBottomLeftRadius: 5,
  //                 borderBottomRightRadius: 5,
  //                 display: 'flex',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 height: 10,
  //                 '@media (hover: hover)': {
  //                   '&:hover': {
  //                     backgroundColor: color('border'),
  //                   },
  //                 },
  //               }}
  //               onClick={() => {
  //                 onChange({ target: { value: String(+value - 1) } })
  //               }}
  //             >
  //               <ChevronDownIcon size={9} strokeWidth={2.5} />
  //             </styled.div>
  //           </div>
  //         )}
  //         {!jsonInput && !markdownInput && !multiline
  //           ? renderOrCreateElement(iconRight, {
  //               style: {
  //                 position: 'absolute',
  //                 right: 12,
  //                 top: '50%',
  //                 transform: 'translate3d(0,-50%,0)',
  //                 pointerEvents: 'none',
  //               },
  //             })
  //           : null}
  //       </div>

  //       {maxChars && (
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'space-between',
  //             marginBottom: 4,
  //             marginTop: 8,
  //           }}
  //         >
  //           <Text color="text2" weight={400}>
  //             {value.length} characters
  //           </Text>
  //           <Text color="text2" weight={400}>
  //             Max {maxChars} characters
  //           </Text>
  //         </div>
  //       )}
  //     </div>
  //   </InputWrapper>
  // )
}
