import React, { FC, useState } from 'react'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { useTooltip } from '../../hooks/useTooltip'
import { useWindowResize } from '../../hooks/useWindowResize'

const StyledBgSlider = styled('div', {
  backgroundColor: genColor('action', 'neutral', 'subtleNormal'),
  borderRadius: 4,
  height: 6,
  width: '100%',
  position: 'absolute',
  bottom: 0,
})

const StyledStepProgress = styled('div', {
  backgroundColor: genColor('action', 'primary', 'normal'),
  height: 6,
  borderRadius: 4,
  width: '20%',
  position: 'absolute',
  bottom: 0,
})

const StyledThumb = styled('div', {
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: genColor('content', 'inverted', 'primary'),
  border: `5px solid ${genColor('action', 'primary', 'normal')} `,
  cursor: 'pointer',
  position: 'absolute',
  right: '-4px',
  bottom: '-6px',
})

type SliderProps = {
  data?: { id: string; title: string; index: number }[]
  min?: number
  max?: number
  value?: number | { id: string; title: string; index: number }
  steps?: number
  style?: Style
}

// TODO: put tooltip as slider label

export const Slider: FC<SliderProps> = ({
  data,
  min,
  max,
  value,
  steps,
  style,
}) => {
  const [sliderLabel, setSliderLabel] = useState('Hallow daar hew')

  const sliderTooltipLabel = useTooltip(sliderLabel, 'top-right')

  return (
    <styled.div style={{ width: '100%', position: 'relative', minWidth: 340 }}>
      <StyledBgSlider />
      <StyledStepProgress>
        <StyledThumb {...sliderTooltipLabel} />
      </StyledStepProgress>
    </styled.div>
  )
}
