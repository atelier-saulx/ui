import React, { useEffect, useState } from 'react'
import { Code } from '../../Code'
import { color } from '../../../varsUtilities'

// html block for htlm view !
export const RawHtmlBlock = ({
  data,
  blocks,
  updateHtmlBlock,
  setFocus,
  focus,
  idx,
  deleteBlock,
  style,
}) => {
  const [htmlString, setHtmlString] = useState('')

  let str
  let blockStyle = ''

  let level = data.data.level
  let innerHTML = data.data.innerHTML || data.data.innerText
  let alignment = data.data.alignment
  let listType = data.data.type
  let space = data.data.space
  let spaceFormat = data.data.spaceFormat
  let cssStyle = data.data.style

  if (data.type === 'heading') {
    if (alignment) {
      blockStyle = ` style="text-align:${alignment}"`
    }
    if (cssStyle) {
      blockStyle = ` style="${cssStyle}"`
    }

    str = `<${level}${blockStyle}>${innerHTML}</${level}>`
  }

  if (data.type === 'paragraph') {
    if (alignment) {
      blockStyle = ` style="text-align:${alignment}"`
    }
    if (cssStyle) {
      blockStyle = ` style="${cssStyle}"`
    }

    str = `<p${blockStyle}>${innerHTML}</p>`
  }

  if (data.type === 'list') {
    let listItems = data.data.items
      .map((item) => `\t<li>${item.innerHTML || item.innerText}</li>\n`)
      .join(' ')

    if (alignment) {
      blockStyle = ` style="text-align:${alignment}"`
    }
    if (cssStyle) {
      blockStyle = ` style="${cssStyle}"`
    }

    str = `<${
      listType === 'unordered' ? 'ul' : 'ol'
    }${blockStyle}>\n${listItems}</${listType === 'unordered' ? 'ul' : 'ol'}>`
  }

  if (data.type === 'space') {
    str = `<div class="spacing" style="height:${space}${spaceFormat}" />`
  }

  if (data.type === 'html') {
    str = innerHTML
  }

  useEffect(() => {
    setHtmlString(str)
  }, [])

  // now the view updates on moving blocks around
  useEffect(() => {
    setHtmlString(str)
  }, [blocks])

  return (
    <div
      onFocus={() => {
        setFocus(idx)
      }}
      id={data.id}
      className="raw"
    >
      <Code
        style={{
          borderBottom: '1px dashed #bfbfbf52',
          padding: '0px 6px',
          ...style,
        }}
        // @ts-ignore
        onBlur={() => updateHtmlBlock()}
        value={htmlString}
        onChange={(v) => {
          setHtmlString(v)
        }}
        language="html"
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            if (e.target.selectionStart === e.target.value.length) {
              setFocus(idx < blocks.length - 1 ? idx + 1 : blocks.length - 1)

              setTimeout(() => {
                // put carret at end of new block
                document.execCommand('selectAll', false, null)
                document.getSelection().collapseToStart()
              }, 10)
            }
          }
          if (e.key === 'ArrowUp') {
            if (e.target.selectionStart === 0) {
              setFocus(idx > 0 ? idx - 1 : 0)

              setTimeout(() => {
                // put carret at end of new block
                document.execCommand('selectAll', false, null)
                document.getSelection().collapseToEnd()
              }, 10)
            }
          }
          if (e.key === 'Backspace') {
            // @ts-ignore

            if (e.target.selectionStart === 0 && e.target.value.length === 0) {
              deleteBlock(idx)
              setFocus(idx === 0 ? 0 : idx - 1)
              // todo caret at end
              setTimeout(() => {
                // put carret at end of new block
                document.execCommand('selectAll', false, null)
                document.getSelection().collapseToEnd()
              }, 10)
            }
          }
        }}
      />
    </div>
  )
}
