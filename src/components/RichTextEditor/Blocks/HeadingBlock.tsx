import React, { FC } from 'react'
import DOMPurify = require('dompurify')

type HeadingBlockProps = {
  innerText?: string
  innerHTML?: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  alignment?: 'left' | 'right' | 'center' | 'justify' | 'inherit'
  style?: string
  id?: string
  onMouseOver?: () => void
}

export const HeadingBlock: FC<HeadingBlockProps> = ({
  innerText,
  innerHTML,
  level,
  alignment = 'inherit',
  style,
  id,
  onMouseOver,
}) => {
  return level === 'h1' ? (
    <h1
      style={{ textAlign: alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : level === 'h2' ? (
    <h2
      style={{ textAlign: alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : level === 'h3' ? (
    <h3
      style={{ textAlign: alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : level === 'h4' ? (
    <h4
      style={{ textAlign: alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : level === 'h5' ? (
    <h5
      style={{ textAlign: alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
    />
  ) : level === 'h6' ? (
    <h6
      style={{ textAlign: alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : (
    <h1
      style={{ textAlign: alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
      onMouseOver={onMouseOver}
    />
  )
}
