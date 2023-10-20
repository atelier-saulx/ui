import React, { FC, CSSProperties, createElement } from 'react'
import { Style } from 'inlines'

type ParagaphBlockProps = {
  innerText?: string
  innerHTML?: string
  alignment?: 'left' | 'right' | 'center' | 'justify' | 'inherit'
  style?: Style
}

export const ParagraphBlock: FC<ParagaphBlockProps> = ({
  innerText,
  innerHTML,
  alignment = 'left',
  style,
}) => {
  const convertStringToHTML = (str) => {
    const parser = new DOMParser()
    const html = parser.parseFromString(str, 'text/html')

    return html.body
  }

  let x = convertStringToHTML(innerHTML)

  return (
    <p
      style={{ textAlign: alignment, ...style }}
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
      dangerouslySetInnerHTML={{ __html: innerHTML || innerText }}
    >
      {/* {innerText || ''} */}
    </p>
  )
}
