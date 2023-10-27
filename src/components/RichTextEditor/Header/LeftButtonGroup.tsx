import React, { useState, FC } from 'react'
import { Button } from '../../Button'
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
  IconEmojiSmile,
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
  if (
    //TODO or color, span color
    selection.commonAncestorContainer.parentElement.localName === 'b' ||
    selection.commonAncestorContainer.parentElement.localName === 'i' ||
    selection.commonAncestorContainer.parentElement.localName === 'a'
  ) {
    let justText = selection.commonAncestorContainer.parentElement.outerText
    selection.commonAncestorContainer.parentElement.outerHTML = justText
  } else {
    // get selection
    let selectedTexttoString = selection.toString()
    let extractText = selection.extractContents()
    let stringNode = document
      .createRange()
      .createContextualFragment(selectedTexttoString)
    selection.insertNode(stringNode)
  }
}

const makeTextBold = () => {
  let selection = window.getSelection().getRangeAt(0)
  let selectedText = selection.extractContents()
  if (selectedText.firstChild.textContent.trim() !== '') {
    let b = document.createElement('b')
    b.appendChild(selectedText)
    selection.insertNode(b)
  } else {
    selection.insertNode(selectedText)
  }
}

const makeTextItalic = () => {
  let selection = window.getSelection().getRangeAt(0)
  let selectedText = selection.extractContents()
  if (selectedText.firstChild.textContent.trim() !== '') {
    let i = document.createElement('i')
    i.appendChild(selectedText)
    selection.insertNode(i)
  } else {
    selection.insertNode(selectedText)
  }
}

const textAlign = (alignment: string, blocks: any, focus: number) => {
  checkForParent(window.getSelection().anchorNode.parentElement, alignment)
  blocks[focus].data.alignment = alignment
}

const makeLink = (selection, link, openInNewTab) => {
  let selectedText = selection.extractContents()
  if (selectedText.firstChild.textContent.trim() !== '') {
    let a = document.createElement('a')
    a.appendChild(selectedText)
    if (openInNewTab) {
      a.setAttribute('target', '_blank')
    }
    a.href = link
    selection.insertNode(a)
  } else {
    selection.insertNode(selectedText)
  }
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

  const [textColor, setTextColor] = useState('rgba(0,0,0,1)')
  const [textBgColor, setTextBgColor] = useState('rgba(255,255,255,1)')

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
            <Button size="small" icon={<IconPlus />} light />
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
      <Tooltip text="Clear style">
        <Button
          onClick={() => {
            makeTextDefault()
            updateBlock(focus)
          }}
          size="small"
          light
          color="system"
          icon={<IconEmojiSmile />}
        />
      </Tooltip>
      <Tooltip text="Bold text">
        <Button
          onClick={() => {
            makeTextBold()
            updateBlock(focus)
          }}
          size="small"
          light
          color="system"
          icon={<IconFormatBold />}
        />
      </Tooltip>
      <Tooltip text="Italic text">
        <Button
          onClick={() => {
            makeTextItalic()
            updateBlock(focus)
          }}
          size="small"
          light
          color="system"
          icon={<IconFormatItalic />}
        />
      </Tooltip>
      <Tooltip text="Align left">
        <Button
          onClick={() => {
            textAlign('left', blocks, focus)
            updateBlock(focus)
          }}
          size="small"
          light
          color="system"
          icon={<IconFormatAlignLeft />}
        />
      </Tooltip>
      <Tooltip text="Align center">
        <Button
          onClick={() => {
            textAlign('center', blocks, focus)
            updateBlock(focus)
          }}
          size="small"
          light
          color="system"
          icon={<IconFormatAlignCenter />}
        />
      </Tooltip>
      <Tooltip text="Align right">
        <Button
          onClick={() => {
            textAlign('right', blocks, focus)
            updateBlock(focus)
          }}
          size="small"
          light
          color="system"
          icon={<IconFormatAlignRight />}
        />
      </Tooltip>
      <Tooltip text="Justify text">
        <Button
          onClick={() => {
            textAlign('justify', blocks, focus)
            updateBlock(focus)
          }}
          size="small"
          light
          color="system"
          icon={<IconFormatAlignJustify />}
        />
      </Tooltip>

      {/* make link */}
      <Modal.Root>
        <Tooltip text="Create link">
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
              color="system"
              icon={<IconLink />}
            />
          </Modal.Trigger>
        </Tooltip>
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

                    updateBlock(focus)
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
      {/* make color */}
      <Modal.Root>
        <Tooltip text="Color text">
          <Modal.Trigger>
            <Button
              onClick={() => {
                let selection = window.getSelection().getRangeAt(0)
                let selectedText = selection.extractContents()
                let span = document.createElement('span')
                span.appendChild(selectedText)
                span.classList.add('snurpColor')
                selection.insertNode(span)
              }}
              size="small"
              light
              color="system"
              icon={<IconText style={{ color: textColor }} />}
            />
          </Modal.Trigger>
        </Tooltip>
        <Modal.Content
          onEscapeKeyDown={() => {
            let snurp: HTMLElement = document.querySelector('.snurpColor')
            snurp.style.color = null
            snurp.style.backgroundColor = null
            snurp.classList.remove('snurpColor')
          }}
          onPointerDownOutside={() => {
            let snurp: HTMLElement = document.querySelector('.snurpColor')
            snurp.style.color = null
            snurp.style.backgroundColor = null
            snurp.classList.remove('snurpColor')
          }}
        >
          {({ close }) => (
            <>
              <Modal.Title>Set some colors</Modal.Title>
              <Modal.Body>
                <Input
                  label="Text Color"
                  type="color"
                  onChange={(v) => {
                    let snurp: HTMLElement =
                      document.querySelector('.snurpColor')
                    snurp.style.color = v
                    setTextColor(v)
                  }}
                  value={textColor}
                />
                <Input
                  label="BackgroundColor"
                  type="color"
                  onChange={(v) => {
                    let snurp: HTMLElement =
                      document.querySelector('.snurpColor')
                    snurp.style.backgroundColor = v
                    setTextBgColor(v)
                  }}
                  value={textBgColor}
                />
              </Modal.Body>

              <Modal.Actions>
                <Button
                  onClick={() => {
                    let snurp: HTMLElement =
                      document.querySelector('.snurpColor')
                    snurp.style.color = null
                    snurp.style.backgroundColor = null
                    snurp.classList.remove('snurpColor')
                    close()
                  }}
                  color="system"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    close()
                    // reset these  states
                    let snurp: HTMLElement =
                      document.querySelector('.snurpColor')
                    snurp.classList.remove('snurpColor')

                    updateBlock(focus)
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
