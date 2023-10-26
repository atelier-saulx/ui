import React, { FC, useRef, useEffect, useState } from 'react'
import DOMPurify = require('dompurify')
import { Style, styled } from 'inlines'
import { color } from '../../../varsUtilities'
import { Input } from '../../Input'
import { Row } from '../../Styled'

type SpaceBlockProps = {
  data: {
    data?: {
      space?: number
      spaceFormat?: string
    }
  }
  setFocus?: (v) => void
  blocks?: any
  style?: Style
  idx?: number
  focus?: number
}

export const SpaceBlock: FC<SpaceBlockProps> = ({
  data,
  setFocus,
  blocks,
  focus,
  idx,
  style,
}) => {
  const blockData = data.data

  const [spaceNumber, setSpaceNumber] = useState(blockData.space || 32)
  const [spaceFormat, setSpaceFormat] = useState(blockData.spaceFormat || 'px')

  const numberRef = useRef<HTMLInputElement>()

  if (focus === idx) {
    setTimeout(() => {
      let x = numberRef.current.firstChild.firstChild.firstChild as HTMLElement
      x.focus()
    }, 50)
  }

  return (
    <Row
      style={{ paddingLeft: 13, marginBottom: 12, ...style }}
      onClick={() => setFocus(idx)}
      className="spacing"
    >
      <styled.div
        style={{
          width: '100%',
          backgroundColor: color('background', 'neutral', 'surface'),
          height: `${spaceNumber}${spaceFormat}`,
          borderTop:
            idx === focus
              ? '1px dashed #bfbfbf'
              : `1px solid ${color('background', 'neutral', 'surface')}`,
          borderBottom:
            idx === focus
              ? '1px dashed #bfbfbf'
              : `1px solid ${color('background', 'neutral', 'surface')}`,
        }}
      />

      <Row style={{ maxWidth: 172, gap: 8, marginLeft: 8 }} ref={numberRef}>
        <Input
          style={{ maxWidth: 112 }}
          type="number"
          value={spaceNumber}
          onChange={(v) => {
            setSpaceNumber(v)
            blocks[idx].data.space = v
          }}
          onFocus={() => setFocus(idx)}
        />
        <Input
          style={{ maxWidth: 46 }}
          type="select"
          value={spaceFormat}
          onChange={(v) => {
            setSpaceFormat(v)
            blocks[idx].data.spaceFormat = v
          }}
          options={[
            { value: 'px', label: 'px' },
            { value: 'vh', label: 'vh' },
            { value: 'em', label: 'em' },
          ]}
        />
      </Row>
    </Row>
  )
}
