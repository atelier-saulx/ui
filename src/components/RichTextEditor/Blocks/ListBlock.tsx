import React, { FC, useRef } from 'react'
import DOMPurify = require('dompurify')
import { Style, styled } from 'inlines'

type ListBlockProps = {
  data: any
  deleteBlock?: (v) => void
  idx?: number
  setFocus?: (v) => void
  style?: Style
  blocksLength?: number
}

const listKeyHandler = (
  e,
  setFocus,
  idx,
  deleteBlock,
  blocksLength,
  listRef,
  blockData
) => {
  // console.log(e.key)
  if (e.key === 'Backspace') {
    let selection = window.getSelection()
    // @ts-ignore
    let anchorNodeLength = selection.anchorNode.length
    let focusOffset = selection.anchorOffset
    if (
      !anchorNodeLength &&
      focusOffset === 0 &&
      blockData.items.length === 1
    ) {
      deleteBlock(idx)
      setFocus(idx - 1)
      setTimeout(() => {
        // put carret at end of new block
        document.execCommand('selectAll', false, null)
        document.getSelection().collapseToEnd()
      }, 10)
    }
  }
  if (e.key === 'ArrowUp') {
    let selection = window.getSelection()
    if (selection.anchorOffset === 0) {
      setFocus(idx > 0 ? idx - 1 : 0)
      setTimeout(() => {
        document.execCommand('selectAll', false, null)
        document.getSelection().collapseToEnd()
      }, 10)
    }
  }
  if (e.key === 'ArrowDown') {
    let selection = window.getSelection()
    console.log(selection.anchorNode.parentElement.innerHTML)
    console.log(listRef.current.lastChild.innerHTML)
    // @ts-ignore
    let anchorNodeLength = selection.anchorNode.length
    let focusOffset = selection.anchorOffset
    console.log(selection)
    if (
      anchorNodeLength === focusOffset &&
      selection.anchorNode.parentElement.innerHTML ===
        listRef.current.lastChild.innerHTML
    ) {
      setFocus(idx < blocksLength - 1 ? idx + 1 : blocksLength - 1)
      setTimeout(() => {
        // put carret at end of new block
        document.execCommand('selectAll', false, null)
        document.getSelection().collapseToStart()
      }, 10)
    }
  }
}

export const ListBlock: FC<ListBlockProps> = ({
  data,
  deleteBlock,
  idx,
  setFocus,
  style,
  blocksLength,
}) => {
  const blockData = data.data

  const listRef = useRef()

  // dont call updateBlocks from inside this component !

  console.log(data, 'from list??')

  return blockData.type === 'unordered' ? (
    <styled.ul
      ref={listRef}
      contentEditable
      suppressContentEditableWarning
      onInput={() => {}}
      onBlur={(e) => e.preventDefault()}
      onFocus={() => setFocus(idx)}
      style={{
        textAlign: blockData.alignment,
        ...style,
      }}
      onKeyDown={(e) => {
        listKeyHandler(
          e,
          setFocus,
          idx,
          deleteBlock,
          blocksLength,
          listRef,
          blockData
        )
      }}
    >
      {blockData?.items?.map((item, id) => (
        <li
          key={id}
          dangerouslySetInnerHTML={{
            __html:
              DOMPurify.sanitize(item.innerHTML) ||
              DOMPurify.sanitize(item.innerText),
          }}
        />
      ))}
    </styled.ul>
  ) : (
    <styled.ol
      ref={listRef}
      contentEditable
      suppressContentEditableWarning
      onInput={() => {}}
      onBlur={(e) => e.preventDefault()}
      onFocus={() => setFocus(idx)}
      style={{
        textAlign: blockData.alignment,
        ...style,
      }}
      onKeyDown={(e) => {
        listKeyHandler(
          e,
          setFocus,
          idx,
          deleteBlock,
          blocksLength,
          listRef,
          blockData
        )
      }}
    >
      {blockData?.items?.map((item, id) => (
        <li
          key={id}
          dangerouslySetInnerHTML={{
            __html:
              DOMPurify.sanitize(item.innerHTML) ||
              DOMPurify.sanitize(item.innerText),
          }}
        />
      ))}
    </styled.ol>
  )
}
