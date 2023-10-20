import React, { FC, useRef, useEffect } from 'react'
import DOMPurify = require('dompurify')
import { Text } from '../../Text'

type ParagaphBlockProps = {
  innerText?: string
  innerHTML?: string
  alignment?: 'left' | 'right' | 'center' | 'justify' | 'inherit'
  style?: string
  id?: string
  onMouseOver?: () => void
  onChange?: (v) => void
}

export const ParagraphBlock: FC<ParagaphBlockProps> = ({
  innerText,
  innerHTML,
  alignment = 'inherit',
  style,
  id,
  onMouseOver,
  onChange,
}) => {
  // TODO: sanitze?
  // TODO: fix style -> maybe set style throug js to this p tag.

  const pRef = useRef<HTMLParagraphElement>()

  useEffect(() => {
    if (pRef.current && style) {
      pRef.current.style.cssText = style
    }
  }, [pRef.current])

  return (
    <p
      style={{ textAlign: alignment }}
      ref={pRef}
      contentEditable
      suppressContentEditableWarning
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          console.log('MAKE NEW BLOCK')
        }
      }}
      onChange={onChange}
      onMouseOver={onMouseOver}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
    />
  )
}
