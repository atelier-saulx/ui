import React, { FC, useEffect, useRef, useState } from 'react'
import DOMPurify = require('dompurify')
import { Style, styled } from 'inlines'

type ListBlockProps = {
  data: any
  deleteBlock?: (v) => void
  idx?: number
  setFocus?: (v) => void
  style?: Style
  blocksLength?: number
  focus?: number
  updateBlock?: (v, r) => void
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
  focus,
  updateBlock,
}) => {
  // const blockData = data.data

  const listRef = useRef<HTMLParagraphElement>()

  const [blockData, setBlockData] = useState(undefined)

  useEffect(() => {
    setBlockData(data.data)
  }, [])

  // on new block puts focus in first caret place
  if (!blockData?.innerHTML && !blockData?.innerText && focus === idx) {
    setTimeout(() => {
      listRef.current.focus()
    }, 50)
  }

  // dont call updateBlocks from inside this component !

  return data.data.type === 'unordered' ? (
    <styled.ul
      id={data.id}
      ref={listRef}
      contentEditable
      suppressContentEditableWarning
      onInput={() => updateBlock(idx, listRef.current)}
      // onInput={() => {}}
      // onBlur={(e) => {
      //   // e.preventDefault()
      // }}
      onFocus={() => setFocus(idx)}
      style={{
        textAlign: blockData?.alignment,
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
      {blockData?.items?.map((item, id) => {
        let innerListHTML =
          DOMPurify.sanitize(item.innerHTML) ||
          DOMPurify.sanitize(item.innerText)
        return (
          <li
            key={id}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(innerListHTML),
            }}
          />
        )
      })}
    </styled.ul>
  ) : (
    <styled.ol
      id={data.id}
      ref={listRef}
      contentEditable
      suppressContentEditableWarning
      onInput={() => updateBlock(idx, listRef.current)}
      // onBlur={(e) => e.preventDefault()}
      onFocus={() => setFocus(idx)}
      style={{
        textAlign: blockData?.alignment,
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
      {blockData?.items?.map((item, id) => {
        let innerListHTML =
          DOMPurify.sanitize(item.innerHTML) ||
          DOMPurify.sanitize(item.innerText)
        return (
          <li
            key={id}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(innerListHTML),
            }}
          />
        )
      })}
    </styled.ol>
  )
}
