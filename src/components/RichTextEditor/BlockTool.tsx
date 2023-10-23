import React from 'react'
import { styled } from 'inlines'
import { Button } from '../Button'
import { IconSettings } from '../../icons'
import { Dropdown } from '..'
import { Tooltip } from '..'

export const BlockTool = ({ idx, setBlocks, blocks, snork }) => {
  console.log('incoming blocks --> yo', blocks)
  console.log('Smoreiam? ', snork)
  //
  const convertBlock = (type: string, idx: number, level?: string) => {
    blocks[idx].type = type

    if (type === 'heading') {
      blocks[idx].data.level = level
    }

    console.log(type, idx, blocks)
    setBlocks((blocks) => [...blocks])
  }

  return (
    <styled.div
      style={{
        // position: 'absolute',
        left: '-42px',
        marginBottom: '-40px',
        marginTop: '16px',
        width: '40px',
        position: 'relative',
        top: 4,
        '& button': {
          width: '24px !important',
          height: '24px',
          borderRadius: '2px !important',
        },
        '& svg': {
          width: '15px',
          height: '15px',
          marginTop: '-2px',
        },
      }}
    >
      <Dropdown.Root>
        <Tooltip text="Change block">
          <Dropdown.Trigger>
            <Button
              icon={<IconSettings />}
              size="small"
              color="neutral"
              light
            />
          </Dropdown.Trigger>
        </Tooltip>
        <Dropdown.Items>
          <Dropdown.Item onClick={() => convertBlock('paragraph', idx, blocks)}>
            Paragraph
          </Dropdown.Item>
          <Dropdown.Item onClick={() => convertBlock('heading', idx, 'h1')}>
            H1
          </Dropdown.Item>
          <Dropdown.Item onClick={() => convertBlock('heading', idx, 'h2')}>
            H2
          </Dropdown.Item>
          <Dropdown.Item onClick={() => convertBlock('heading', idx, 'h3')}>
            H3
          </Dropdown.Item>
          <Dropdown.Item onClick={() => convertBlock('heading', idx, 'h4')}>
            H4
          </Dropdown.Item>
          <Dropdown.Item onClick={() => convertBlock('heading', idx, 'h5')}>
            H5
          </Dropdown.Item>
          <Dropdown.Item onClick={() => convertBlock('heading', idx, 'h6')}>
            H6
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
    </styled.div>
  )
}
