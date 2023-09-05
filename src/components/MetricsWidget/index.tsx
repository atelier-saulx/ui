import React, { FC } from 'react'
import { styled, Style } from '../..'

type MetricsWidgetProps = {
  style?: Style
}

export const MetricsWidget: FC<MetricsWidgetProps> = ({ style }) => {
  return <styled.div style={{ ...style }}>Metrics yo</styled.div>
}
