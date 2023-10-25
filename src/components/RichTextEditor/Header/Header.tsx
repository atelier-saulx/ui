import React, { useState } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../../Button'
import { Row } from '../../Styled'
import { IconDelete, IconChevronTop, IconChevronDown } from '../../../icons'
import { Dropdown } from '../..'
import { Tooltip } from '../..'
import { Input } from '../..'
import { LeftButtonGroup } from './LeftButtonGroup'
import { CenterButtonGroup } from './CenterButtonGroup'

export const Header = ({
  makeNewBlock,
  deleteBlock,
  focus,
  setFocus,
  blocks,
  setBlocks,
  updateBlock,
}) => {
  return (
    <Row
      style={{
        justifyContent: 'space-between',
      }}
    >
      <LeftButtonGroup
        makeNewBlock={makeNewBlock}
        blocks={blocks}
        focus={focus}
        setFocus={setFocus}
        updateBlock={updateBlock}
      />
      <CenterButtonGroup
        focus={focus}
        blocks={blocks}
        setBlocks={setBlocks}
        updateBlock={updateBlock}
        setFocus={setFocus}
      />
      {/* center buttons */}

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
