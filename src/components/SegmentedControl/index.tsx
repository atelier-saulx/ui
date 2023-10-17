import React, { FC, useEffect, useState } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { usePropState } from '../../hooks'

type SegmentedControlProps = {
  data?: (string | number)[]
  onChange?: (value: number) => void
  active?: number
  style?: Style
}

const StyledSegmentOption = styled('div', {
  alignItems: 'center',
  borderRadius: 4,
  display: 'flex',
  padding: '4px 12px',
  cursor: 'pointer',
  '&:focus': {
    backgroundColor: genColor('action', 'neutral', 'subtleActive'),
  },
})

export const SegmentedControl: FC<SegmentedControlProps> = ({
  data = [],
  onChange,
  style,
  active = 0,
  // iundex
}) => {
  const [activeOption, setActiveOption] = usePropState(
    active >= data.length ? data.length - 1 : active < 0 ? 0 : active
  )

  const calc = (100 / data.length) * activeOption

  return (
    <styled.div
      style={{
        flexShrink: 0,
        position: 'relative',
        alignItems: 'center',
        backgroundColor: genColor('action', 'neutral', 'subtleNormal'),
        borderRadius: 8,
        display: 'grid',
        gridTemplateColumns: `repeat(${data.length}, 1fr)`,
        // gridTemplateColumns: `repeat(${data.length}, minmax(40px, 1fr))`,
        gridColumnGap: '4px',
        padding: 4,
        minWidth: 'fit-content',

        ...style,
      }}
    >
      <styled.div
        style={{
          top: 4,
          bottom: 4,
          right: 0,
          left: `${calc}%`,
          transition: 'all 0.2s',
          width: `calc(100% / ${data.length} - 8px)`,
          marginLeft: '4px',
          marginRight: '4px',
          position: 'absolute',
          // maxWidth: '25%',
          backgroundColor: genColor('standalone', 'foreground', 'default'),
          borderRadius: 4,
          cursor: 'default',
        }}
      />
      {data?.map((item, idx) => (
        <StyledSegmentOption
          key={idx}
          onClick={() => {
            setActiveOption(idx)
            onChange && onChange(idx)
          }}
          style={{
            transform: 'translate3d(0px,0px,0px)',
            whiteSpace: 'nowrap',
            boxShadow:
              activeOption === idx
                ? '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)'
                : 'none',
            '&:hover': {
              backgroundColor:
                activeOption !== idx &&
                genColor('action', 'neutral', 'subtleHover'),
            },
          }}
        >
          <Text
            align="center"
            selectable="none"
            size={14}
            weight="medium"
            style={{
              transition: 'color 0.25s',
              color: activeOption === idx ? '#1b242c' : 'inherit',
              width: '100%',
            }}
          >
            {item}
          </Text>
        </StyledSegmentOption>
      ))}
    </styled.div>
  )
}
