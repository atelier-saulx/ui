import React from 'react'
import { Button } from '../../Button'
import { Row } from '../../Styled'
import { IconDelete } from '../../../icons'
import { Tooltip } from '../..'
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
    <>
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
        <Tooltip text="Delete Block">
          <Button
            onClick={() => deleteBlock(focus)}
            size="small"
            light
            color="alert"
            style={{ marginLeft: 'auto' }}
            icon={<IconDelete />}
          />
        </Tooltip>
      </Row>
    </>
  )
}
