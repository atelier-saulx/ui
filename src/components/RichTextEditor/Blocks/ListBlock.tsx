import React, { FC, useRef } from 'react'
import DOMPurify = require('dompurify')
import { Style, styled } from 'inlines'

type ListBlockProps = {
  data: any
  deleteBlock?: (v) => void
  idx?: number
  makeNewBlock?: (v, idx) => void
  setFocus?: (v) => void
  style?: Style
  updateBlock?: (v) => void
  blocksLength?: number
}

const listKeyHandler = (
  e,
  setFocus,
  idx,
  deleteBlock,
  blocksLength,
  listRef
) => {
  // console.log(e.key)
  if (e.key === 'Backspace') {
    // let selection = window.getSelection()
    // // @ts-ignore
    // let anchorNodeLength = selection.anchorNode.length
    // let focusOffset = selection.anchorOffset
    // if (!anchorNodeLength && focusOffset === 0) {
    //   deleteBlock(idx)
    //   setFocus(idx - 1)
    //   // todo caret at end
    //   setTimeout(() => {
    //     // put carret at end of new block
    //     document.execCommand('selectAll', false, null)
    //     document.getSelection().collapseToEnd()
    //   }, 10)
    // }
  }
  if (e.key === 'ArrowUp') {
    let selection = window.getSelection()
    console.log(selection)

    if (selection.anchorOffset === 0) {
      setFocus(idx > 0 ? idx - 1 : 0)

      setTimeout(() => {
        // put carret at end of new block
        document.execCommand('selectAll', false, null)
        document.getSelection().collapseToEnd()
      }, 10)
    }
  }
  if (e.key === 'ArrowDown') {
    let selection = window.getSelection()
    console.log(selection.anchorNode.parentElement.innerHTML)
    console.log(listRef.current.lastChild.innerHTML)
    //   // @ts-ignore
    let anchorNodeLength = selection.anchorNode.length
    let focusOffset = selection.anchorOffset
    console.log(selection)
    if (
      // anchorNodeLength === focusOffset &&
      selection.anchorNode.parentElement.innerHTML ===
      listRef.current.lastChild.innerHTML
    ) {
      // e.preventDefault()
      console.log('nani??🦝', idx, blocksLength)
      setFocus(idx < blocksLength - 1 ? idx + 1 : blocksLength - 1)
    }
  }
}

export const ListBlock: FC<ListBlockProps> = ({
  data,
  deleteBlock,
  idx,
  makeNewBlock,
  setFocus,
  style,
  updateBlock,
  blocksLength,
}) => {
  const blockData = data.data

  const listRef = useRef()

  return (
    <styled.ul
      ref={listRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setFocus(idx)}
      style={{
        textAlign: blockData.alignment,
        ...style,
      }}
      onKeyDown={(e) => {
        listKeyHandler(e, setFocus, idx, deleteBlock, blocksLength, listRef)
        updateBlock(idx)
      }}
    >
      {blockData?.items?.map((item, id) => (
        <li
          key={id}
          onInput={() => updateBlock(idx)}
          dangerouslySetInnerHTML={{
            __html:
              DOMPurify.sanitize(item.innerHTML) ||
              DOMPurify.sanitize(item.innerText),
            // DOMPurify.sanitize(item),
          }}
        />
      ))}
    </styled.ul>
  )
}
