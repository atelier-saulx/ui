// import React, { useEffect, useRef, useState } from 'react'
// import { useColorPicker } from '~/hooks/useColorPicker'
// import { color } from '~/utils'
// import { InputWrapper } from './InputWrapper'
// import { ColorInputProps } from './types'

// export const ColorInput = ({
//   inputRef,
//   placeholder,
//   defaultValue,
//   value = defaultValue,
//   disabled,
//   style,
//   onChange,
//   indent,
//   label,
//   description,
//   space,
//   descriptionBottom,
//   ...props
// }: ColorInputProps) => {
//   const [errorMessage] = useState('')
//   const { value: colorState, rgba, onClick, setValue } = useColorPicker(value)
//   const rgbaRef = useRef(rgba)
//   useEffect(() => {
//     if (rgba !== value) {
//       if (rgbaRef.current !== rgba) {
//         rgbaRef.current = rgba
//         onChange({ target: { value: rgba } })
//       }
//     }
//   }, [rgba])

//   return (
//     <InputWrapper
//       indent={indent}
//       style={{ position: 'relative' }}
//       label={label}
//       description={description}
//       space={space}
//       descriptionBottom={descriptionBottom}
//       errorMessage={errorMessage}
//       disabled={disabled}
//     >
//       <div
//         style={{
//           display: 'flex',
//           position: 'relative',
//         }}
//       >
//         {/* @ts-ignore */}
//         <input
//           {...props}
//           type="text"
//           ref={inputRef}
//           value={colorState}
//           onChange={(e) => setValue(e.target.value)}
//           placeholder={placeholder}
//           disabled={disabled}
//           style={{
//             ...style,
//             paddingLeft: 36,
//             border: `1px solid ${color('border')}`,
//             borderRadius: 4,
//             minHeight: 36,
//             cursor: disabled ? 'not-allowed' : null,
//             backgroundColor: color('background'),
//           }}
//         />
//         <button
//           style={{
//             cursor: 'pointer',
//             position: 'absolute',
//             left: 12,
//             top: '50%',
//             transform: 'translate3d(0,-50%,0)',
//             backgroundColor: rgba,
//             height: 20,
//             width: 20,
//             borderRadius: 4,
//             marginRight: 8,
//             marginLeft: -4,
//             border: `1px solid ${color('border')}`,
//             pointerEvents: disabled ? 'none' : null,
//           }}
//           onClick={onClick}
//         />
//       </div>
//     </InputWrapper>
//   )
// }
