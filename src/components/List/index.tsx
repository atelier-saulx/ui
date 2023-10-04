import React, { FC, useState, ReactNode } from 'react'
import { IconChevronRight } from '../../icons'
import { styled, Style } from 'inlines'
import { RowSpaced, Row, Column } from '../Styled'
import { Text } from '../Text'
import { border, color as genColor } from '../../varsUtilities'
import { ClickHandler } from 'src/types'

export type ListProps<T = any> = {
  style?: Style
  filter?: boolean
  label?: ReactNode
  description?: ReactNode
  data: T[]
  onClick?: (data: T) => void | Promise<void>
  action?: ReactNode
  headers?: string[]
}

export const List: FC<ListProps> = ({
  style,
  label,
  description,
  onClick,
  action,
}) => {
  return <styled.div>LIST</styled.div>
}
