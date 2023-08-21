import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { useWindowResize } from '../../hooks/useWindowResize'

const StyledBgSlider = styled('div', {
  backgroundColor: genColor('action', 'neutral', 'subtleNormal'),
  borderRadius: 4,
  height: 6,
  width: '100%',
})

const StyledStepProgress = styled('div', {
  backgroundColor: genColor('action', 'primary', 'hover'),
  height: 6,
  borderRadius: 4,
  width: '20%',
})

const StyledThumb = styled('div', {
  width: 4,
  height: 4,
  borderRadius: '50%',
  border: `1px solid ${genColor('content', 'inverted', 'primary')}`,
})

type SliderProps = {
  data?: { id: string; title: string; index: number }[]
  min?: number
  max?: number
  value?: number | { id: string; title: string; index: number }
  steps?: number
  style?: Style
}

export const Slider: FC<SliderProps> = ({
  data,
  min,
  max,
  value,
  steps,
  style,
}) => {
  return (
    <styled.div style={{ width: '100%', position: 'relative' }}>
      <StyledBgSlider />
      <StyledStepProgress />
    </styled.div>
  )
}
