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
  data,
  onChange,
  style,
}) => {
  const [activeOption, setActiveOption] = useState(0)

  return (
    <styled.div
      style={{
        alignItems: 'center',
        backgroundColor: genColor('action', 'neutral', 'subtleNormal'),
        borderRadius: 8,
        display: 'flex',
        padding: 4,
        gap: '4px',
        width: 'fit-content',
        ...style,
      }}
    >
      {data?.map((item, idx) => (
        <StyledSegmentOption
          key={idx}
          onClick={() => {
            setActiveOption(idx)
            onChange && onChange(idx)
          }}
          style={{
            // todo change this color
            backgroundColor:
              activeOption === idx
                ? genColor('standalone', 'foreground', 'default')
                : '',
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
          <Text size={14} weight="medium">
            {item}
          </Text>
        </StyledSegmentOption>
      ))}
    </styled.div>
  )
}
