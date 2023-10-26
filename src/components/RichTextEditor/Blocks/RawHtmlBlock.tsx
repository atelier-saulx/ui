import React from 'react'
import { Code } from '../../Code'

// html block for htlm view !
export const RawHtmlBlock = (data) => {
  console.log('Raw Science bithc', data)

  let str, style

  let level = data.data.data.level
  let innerHTHML = data.data.data.innerHTML
  let alignment = data.data.data.alignment

  let space = data.data.data.space
  let spaceFormat = data.data.data.spaceFormat

  if (data.data.type === 'heading') {
    if (alignment) {
      style = ` style="text-align:${alignment}"`
    }

    str = `<${level}${style}>${innerHTHML}</${level}>`
  }

  if (data.data.type === 'paragraph') {
    if (alignment) {
      style = ` style="text-align:${alignment}"`
    }

    str = `<p${style}>${innerHTHML}</p>`
  }

  if (data.data.type === 'list') {
  }

  if (data.data.type === 'space') {
    str = `<div class="spacing" style="height:${space}${spaceFormat}" />`
  }

  return (
    <Code
      style={{ border: '1px solid #f6f6f6', padding: '0px 6px' }}
      value={str}
      language="html"
    />
  )
}
