import React, { useState } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Row } from '../Styled'
import {
  IconFormatItalic,
  IconText,
  IconFormatBold,
  IconFormatAlignLeft,
  IconFormatAlignCenter,
  IconFormatAlignRight,
  IconFormatAlignJustify,
  IconLink,
  IconPlus,
  IconDelete,
  IconChevronTop,
  IconChevronDown,
} from '../../icons'
import { Dropdown } from '..'
import { Tooltip } from '..'
import { Input } from '..'

const makeTextBold = () => {
  let selection = window.getSelection().getRangeAt(0)
  let selectedText = selection.extractContents()
  let b = document.createElement('b')
  b.appendChild(selectedText)
  selection.insertNode(b)
}

const makeTextItalic = () => {
  let selection = window.getSelection().getRangeAt(0)
  let selectedText = selection.extractContents()
  let i = document.createElement('i')
  i.appendChild(selectedText)
  selection.insertNode(i)
}

const textAlign = (alignment: string) => {
  // TODO make sure parentnode is not a b or i
  console.log(window.getSelection())
  let parentEl = window.getSelection().focusNode.parentElement
  parentEl.style.textAlign = alignment
}

const makeLink = (link) => {
  // TODO async wait for input
  let selection = window.getSelection().getRangeAt(0)
  let selectedText = selection.extractContents()
  let a = document.createElement('a')
  a.appendChild(selectedText)
  a.href = link
  selection.insertNode(a)
}

const moveBlockUp = (focus, blocks, setBlocks, setFocus) => {
  if (focus !== 0) {
    let tempBlocks = [...blocks]
    let snurp = tempBlocks.splice(focus, 1)[0]
    tempBlocks.splice(focus - 1, 0, snurp)
    setBlocks([...tempBlocks])
    setFocus(focus - 1)
  }
}

const moveBlockDown = (focus, blocks, setBlocks, setFocus) => {
  if (focus !== blocks.length - 1) {
    let tempBlocks = [...blocks]
    let snurp = tempBlocks.splice(focus, 1)[0]
    tempBlocks.splice(focus + 1, 0, snurp)
    setBlocks([...tempBlocks])
    setFocus(focus + 1)
  }
}

const convertBlock = (idx: number, blocks, setBlocks, value?: string) => {
  blocks[idx].type = value
  if (
    value === 'h1' ||
    value === 'h2' ||
    value === 'h3' ||
    value === 'h4' ||
    value === 'h5' ||
    value === 'h6'
  ) {
    blocks[idx].type = 'heading'
    blocks[idx].data.level = value
  }
  setBlocks((blocks) => [...blocks])
}

export const Header = ({
  makeNewBlock,
  deleteBlock,
  focus,
  setFocus,
  blocks,
  setBlocks,
  updateBlock,
}) => {
  const [linkValue, setLinkValue] = useState('')

  return (
    <Row
      style={{
        justifyContent: 'space-between',
      }}
    >
      <Row
        style={{
          gap: 4,
          '& button': {
            width: '24px !important',
            height: '24px',
            borderRadius: '4px !important',
          },
          '& svg': {
            marginTop: '-2px',
            width: '14px',
            height: '14px',
          },
        }}
      >
        <Dropdown.Root>
          <Tooltip text="Add block">
            <Dropdown.Trigger>
              <Button size="small" icon={<IconPlus />} />
            </Dropdown.Trigger>
          </Tooltip>
          <Dropdown.Items>
            <Dropdown.Item onClick={() => makeNewBlock('heading', focus)}>
              Heading
            </Dropdown.Item>
            <Dropdown.Item onClick={() => makeNewBlock('paragraph', focus)}>
              Paragraph
            </Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Root>
        <Button
          onClick={() => {
            makeTextBold()
            updateBlock(focus)
          }}
          size="small"
          light
          color="neutral"
          icon={<IconFormatBold />}
        />
        <Button
          onClick={() => {
            makeTextItalic()
            updateBlock(focus)
          }}
          size="small"
          light
          color="neutral"
          icon={<IconFormatItalic />}
        />
        <Button
          onClick={() => {
            textAlign('left')
            updateBlock(focus)
          }}
          size="small"
          light
          color="neutral"
          icon={<IconFormatAlignLeft />}
        />
        <Button
          onClick={() => {
            textAlign('center')
            updateBlock(focus)
          }}
          size="small"
          light
          color="neutral"
          icon={<IconFormatAlignCenter />}
        />
        <Button
          onClick={() => {
            textAlign('right')
            updateBlock(focus)
          }}
          size="small"
          light
          color="neutral"
          icon={<IconFormatAlignRight />}
        />
        <Button
          onClick={() => {
            textAlign('justify')
            updateBlock(focus)
          }}
          size="small"
          light
          color="neutral"
          icon={<IconFormatAlignJustify />}
        />
        <Button
          onClick={() => {
            makeLink(linkValue)
            updateBlock(focus)
          }}
          size="small"
          light
          color="neutral"
          icon={<IconLink />}
        />
      </Row>
      {/* center buttons */}
      <Row
        style={{
          gap: 4,
          '& button': {
            width: '24px !important',
            height: '24px',
            borderRadius: '4px !important',
          },
          '& svg': {
            marginTop: '-2px',
            width: '14px',
            height: '14px',
          },
        }}
      >
        <Input
          type="select"
          style={{
            height: '26px',
            borderRadius: '4px',
            fontSize: '13px',
            padding: '0px 42px 6px 10px',
          }}
          // TODO: change on focus the value or placeholder
          placeholder={
            blocks[focus].type === 'paragraph'
              ? blocks[focus].type
              : blocks[focus].data.level
          }
          options={[
            { value: 'paragraph', label: 'Paragraph' },
            { value: 'h1', label: 'Heading: H1' },
            { value: 'h2', label: 'Heading: H2' },
            { value: 'h3', label: 'Heading: H3' },
            { value: 'h4', label: 'Heading: H4' },
            { value: 'h5', label: 'Heading: H5' },
            { value: 'h6', label: 'Heading: H6' },
          ]}
          onChange={(v) => convertBlock(focus, blocks, setBlocks, v)}
        />
        <Button
          onClick={() => moveBlockUp(focus, blocks, setBlocks, setFocus)}
          size="small"
          light
          color="neutral"
          icon={<IconChevronTop />}
        />
        <Button
          onClick={() => moveBlockDown(focus, blocks, setBlocks, setFocus)}
          size="small"
          light
          color="neutral"
          icon={<IconChevronDown />}
        />
      </Row>
      {/* right side */}
      <Row
        style={{
          gap: 4,
          '& button': {
            width: '24px !important',
            height: '24px',
            borderRadius: '4px !important',
          },
          '& svg': {
            marginTop: '-2px',
            width: '14px',
            height: '14px',
          },
        }}
      >
        <Button
          onClick={() => deleteBlock(focus)}
          size="small"
          light
          color="alert"
          style={{ marginLeft: 'auto' }}
          icon={<IconDelete />}
        />
      </Row>
    </Row>
  )
}
