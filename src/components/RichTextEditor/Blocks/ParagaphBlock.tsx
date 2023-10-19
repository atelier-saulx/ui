import React, { createElement } from 'react'

export const ParagraphBlock = () => {
  return (
    <p
      className="rte-paragraph"
      style={{ textAlign: 'left' }}
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
    >
      xxx
    </p>
  )
}
