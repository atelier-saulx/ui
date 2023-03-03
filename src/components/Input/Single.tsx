import React, { RefObject, CSSProperties, FC } from 'react'

type SingleProps = {
  type?: string
  inputRef?: RefObject<any>
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
  style?: CSSProperties
}

export const Single: FC<SingleProps> = ({
  type,
  inputRef,
  pattern,
  style,
  ...props
}) => {
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
