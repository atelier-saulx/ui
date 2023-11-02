import React, { FC, ReactNode } from 'react'
import { Style } from 'inlines'
import { RowSpaced } from '../Styled'
import { Text } from '../Text'
import { ColorContentColors } from '../../varsTypes'

export type SectionHeaderProps = {
  style?: Style
  children?: ReactNode
  action?: ReactNode
  color?: ColorContentColors | 'inherit'
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  style,
  children,
  action,
  color,
}) => {
  return (
    <RowSpaced style={{ marginBottom: 32, ...style }}>
      <Text color={color} size={24} weight="strong">
        {children}
      </Text>
      {action}
    </RowSpaced>
  )
}
