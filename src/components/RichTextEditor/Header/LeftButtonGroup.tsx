import React, { useState, FC } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../../Button'
import { color } from '../../../varsUtilities'
import { Row } from '../../Styled'
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
  IconListBullet,
  IconHeading,
  IconUnfoldMore,
} from '../../../icons'
import { Dropdown } from '../..'
import { Tooltip } from '../..'
import { Input } from '../../Input'
import { Modal } from '../..'

const checkForParent = (selection, alignment) => {
  // some recursion so i can text align the blocks, even from node within node etc
  if (
    selection.localName === 'p' ||
    selection.localName === 'h1' ||
    selection.localName === 'h2' ||
    selection.localName === 'h3' ||
    selection.localName === 'h4' ||
    selection.localName === 'h5' ||
    selection.localName === 'h6' ||
    selection.localName === 'div' ||
    selection.localName === 'ul' ||
    selection.localName === 'ol'
  ) {
    console.log('YES', selection)
    selection.style.textAlign = alignment
    return selection
  } else {
    console.log('🙁')
    checkForParent(selection.parentElement, alignment)
  }
}

const makeTextDefault = () => {
  let selection = window.getSelection().getRangeAt(0)
  console.log(selection)

  if (
    //TODO or color, span color
    selection.commonAncestorContainer.parentElement.localName === 'b' ||
    selection.commonAncestorContainer.parentElement.localName === 'i' ||
    selection.commonAncestorContainer.parentElement.localName === 'a'
  ) {
    let justText = selection.commonAncestorContainer.parentElement.outerText
    selection.commonAncestorContainer.parentElement.outerHTML = justText
  }
}

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

const textAlign = (alignment: string, blocks: any, focus: number) => {
  checkForParent(window.getSelection().anchorNode.parentElement, alignment)
  blocks[focus].data.alignment = alignment
}

const makeLink = (selection, link, openInNewTab) => {
  // TODO async wait for input

  let selectedText = selection.extractContents()
  let a = document.createElement('a')
  a.appendChild(selectedText)
  if (openInNewTab) {
    a.setAttribute('target', '_blank')
  }
  a.href = link
  selection.insertNode(a)
}

type LeftButtonGroupProps = {
  makeNewBlock?: (str, num) => void
  focus?: number
  setFocus?: (n) => void
  updateBlock?: (x) => void
  blocks?: any
}

export const LeftButtonGroup: FC<LeftButtonGroupProps> = ({
  makeNewBlock,
  focus,
  setFocus,
  updateBlock,
  blocks,
}) => {
  // states for creating links
  const [linkValue, setLinkValue] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(false)
  const [linkSelection, setLinkSelection] = useState<Range>()

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
      <Dropdown.Root>
        <Tooltip text="Add block">
          <Dropdown.Trigger>
            <Button size="small" icon={<IconPlus />} />
          </Dropdown.Trigger>
        </Tooltip>
        <Dropdown.Items>
          <Dropdown.Item
            icon={<IconHeading />}
            onClick={() => {
              makeNewBlock('heading', focus)
              setFocus(focus + 1)
            }}
          >
            Heading
          </Dropdown.Item>
          <Dropdown.Item
            icon={<IconText />}
            onClick={() => {
              makeNewBlock('paragraph', focus)
              setFocus(focus + 1)
            }}
          >
            Paragraph
          </Dropdown.Item>
          <Dropdown.Item
            icon={<IconListBullet />}
            onClick={() => {
              makeNewBlock('list', focus)
              setFocus(focus + 1)
            }}
          >
            List
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              makeNewBlock('html', focus)
              setFocus(focus + 1)
            }}
          >
            Custom HTML
          </Dropdown.Item>
          <Dropdown.Item
            icon={<IconUnfoldMore />}
            onClick={() => {
              makeNewBlock('space', focus)
              setFocus(focus + 1)
            }}
          >
            Space
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
      <Button
        onClick={() => {
          makeTextDefault()
          updateBlock(focus)
        }}
        size="small"
        light
        color="neutral"
        icon={<IconText />}
      />
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
          textAlign('left', blocks, focus)
          updateBlock(focus)
        }}
        size="small"
        light
        color="neutral"
        icon={<IconFormatAlignLeft />}
      />
      <Button
        onClick={() => {
          textAlign('center', blocks, focus)
          updateBlock(focus)
        }}
        size="small"
        light
        color="neutral"
        icon={<IconFormatAlignCenter />}
      />
      <Button
        onClick={() => {
          textAlign('right', blocks, focus)
          updateBlock(focus)
        }}
        size="small"
        light
        color="neutral"
        icon={<IconFormatAlignRight />}
      />
      <Button
        onClick={() => {
          textAlign('justify', blocks, focus)
          updateBlock(focus)
        }}
        size="small"
        light
        color="neutral"
        icon={<IconFormatAlignJustify />}
      />

      <Modal.Root>
        <Modal.Trigger>
          <Button
            onClick={() => {
              let selection = window.getSelection().getRangeAt(0)
              setLinkSelection(selection)
              // makeLink('snurp')
              // updateBlock(focus)
            }}
            size="small"
            light
            color="neutral"
            icon={<IconLink />}
          />
        </Modal.Trigger>
        <Modal.Content>
          {({ close }) => (
            <>
              <Modal.Title>Set a link</Modal.Title>
              <Modal.Body>
                <Input
                  type="text"
                  placeholder="https://..."
                  value={linkValue}
                  onChange={(v) => setLinkValue(v)}
                />
                <Input
                  type="checkbox"
                  title="Open in new window"
                  value={openInNewTab}
                  onChange={(v) => setOpenInNewTab(v)}
                />
              </Modal.Body>

              <Modal.Actions>
                <Button onClick={close} color="system">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    makeLink(linkSelection, linkValue, openInNewTab)
                    close()
                    // reset these link states
                    setLinkSelection(null)
                    setLinkValue('')
                    setOpenInNewTab(false)
                  }}
                  color="primary"
                >
                  Save
                </Button>
              </Modal.Actions>
            </>
          )}
        </Modal.Content>
      </Modal.Root>
    </Row>
  )
}
