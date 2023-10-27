import React, { useState, FC } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../../Button'
import { Row } from '../../Styled'
import { IconChevronTop, IconChevronDown } from '../../../icons'
import { Input } from '../..'
import { Tooltip } from '../..'

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
  if (
    value === 'h1' ||
    value === 'h2' ||
    value === 'h3' ||
    value === 'h4' ||
    value === 'h5' ||
    value === 'h6'
  ) {
    console.log('convert this')
    blocks[idx].type = 'heading'
    blocks[idx].data.level = value
  } else if (value === 'ordered' || value === 'unordered') {
    blocks[idx].data.type = value
  } else {
    blocks[idx].type = value
  }
  setBlocks((blocks) => [...blocks])
}

type CenterButtonGroupProps = {
  focus?: number
  setFocus?: (v) => void
  blocks?: any
  setBlocks?: () => void
  updateBlock?: (n) => void
}

export const CenterButtonGroup: FC<CenterButtonGroupProps> = ({
  focus,
  setFocus,
  blocks,
  setBlocks,
  updateBlock,
}) => {
  const paragraphHeadingOptions = [
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'h1', label: 'Heading: H1' },
    { value: 'h2', label: 'Heading: H2' },
    { value: 'h3', label: 'Heading: H3' },
    { value: 'h4', label: 'Heading: H4' },
    { value: 'h5', label: 'Heading: H5' },
    { value: 'h6', label: 'Heading: H6' },
  ]

  const listOptions = [
    { value: 'unordered', label: 'Unordered List' },
    { value: 'ordered', label: 'Ordered List' },
  ]

  return (
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
        value={
          blocks[focus]?.type === 'paragraph'
            ? blocks[focus]?.type
            : blocks[focus]?.data.level
            ? blocks[focus]?.data.level
            : blocks[focus]?.type === 'list'
            ? blocks[focus]?.data.type
            : ''
        }
        options={
          blocks[focus]?.type === 'paragraph' || blocks[focus]?.data?.level
            ? paragraphHeadingOptions
            : blocks[focus]?.type === 'list'
            ? listOptions
            : []
        }
        onChange={(v) => {
          convertBlock(focus, blocks, setBlocks, v)
          updateBlock(focus)
        }}
      />
      <Tooltip text="Move Block Up">
        <Button
          onClick={() => {
            moveBlockUp(focus, blocks, setBlocks, setFocus)
            updateBlock(focus)
          }}
          size="small"
          color="system"
          icon={<IconChevronTop />}
        />
      </Tooltip>
      <Tooltip text="Move Block Down">
        <Button
          onClick={() => {
            moveBlockDown(focus, blocks, setBlocks, setFocus)
            updateBlock(focus)
          }}
          size="small"
          color="system"
          icon={<IconChevronDown />}
        />
      </Tooltip>
    </Row>
  )
}
