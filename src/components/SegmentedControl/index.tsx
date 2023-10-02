import React, { FC, useState } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'

type SegmentedControlProps = {
  data?: (string | number)[]
  onChange?: (value: number) => void
  style?: Style
}

const StyledSegmentOption = styled('div', {
  alignItems: 'center',
  borderRadius: 4,
  cursor: 'pointer',
  display: 'flex',
  padding: '4px 12px',

  '&:focus': {
    backgroundColor: genColor('action', 'neutral', 'subtleActive'),
  },
})

export const SegmentedControl: FC<SegmentedControlProps> = ({
  data = [],
  onChange,
  style,
  // iundex
}) => {
  const [activeOption, setActiveOption] = useState(0)
  const calc = (100 / data.length) * activeOption

  return (
    <styled.div
      style={{
        position: 'relative',
        alignItems: 'center',
        backgroundColor: genColor('action', 'neutral', 'subtleNormal'),
        borderRadius: 8,
        display: 'grid',
        gridTemplateColumns: `repeat(${data.length}, 1fr)`,
        gridColumnGap: '4px',
        padding: 4,
        maxWidth: 'fit-content',
        // gap: '4px',
        // width: 'fit-content',
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
          width: 'calc(100% / 4 - 8px)',
          marginLeft: '4px',
          marginRight: '4px',
          position: 'absolute',
          maxWidth: '25%',
          backgroundColor: genColor('standalone', 'foreground', 'default'),
          borderRadius: 4,
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
            // todo change this color
            // backgroundColor:
            //   activeOption === idx
            //     ? genColor('standalone', 'foreground', 'default')
            //     : '',
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
