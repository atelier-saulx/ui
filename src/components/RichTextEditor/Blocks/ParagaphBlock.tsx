import React, {
  FC,
  CSSProperties,
  createElement,
  useRef,
  useEffect,
} from 'react'
import { Style } from 'inlines'
import DOMPurify = require('dompurify')

type ParagaphBlockProps = {
  innerText?: string
  innerHTML?: string
  alignment?: 'left' | 'right' | 'center' | 'justify' | 'inherit'
  style?: string
}

export const ParagraphBlock: FC<ParagaphBlockProps> = ({
  innerText,
  innerHTML,
  alignment = 'inherit',
  style,
}) => {
  // TODO: sanitze?
  // TODO: fix style -> maybe set style throug js to this p tag.

  console.log('style --> ', style)

  const pRef = useRef<HTMLParagraphElement>()

  console.log(pRef)

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
      autoFocus
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          //   const p = createElement('ParagraphBlock', { parent: parent })
          //   console.log(parent)
          console.log('MAKE NEW BLOCK')
        }
      }}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
      }}
    />
  )
}
