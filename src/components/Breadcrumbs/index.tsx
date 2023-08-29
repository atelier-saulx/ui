import React, { FC } from 'react'
import { styled, Style, color } from '../..'

type BreadcrumbsProps = {
  style?: Style
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ style }) => {
  return <styled.div style={{ ...style }}>broodkruimels</styled.div>
}
