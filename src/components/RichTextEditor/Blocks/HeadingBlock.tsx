import React, { FC, useRef } from 'react'

type HeadingBlockProps = {
  innerText?: string
  innerHTML?: string
  level?: number
  alignment?: 'left' | 'right' | 'center' | 'justify' | 'inherit'
  style?: string
}

export const HeadingBlock: FC<HeadingBlockProps> = ({
  innerText,
  innerHTML,
  level,
  alignment = 'inherit',
  style,
}) => {
  const titleTagRef = useRef()

  return (
    <h3
      style={{ textAlign: alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: innerHTML || innerText }}
    />
  )
}
