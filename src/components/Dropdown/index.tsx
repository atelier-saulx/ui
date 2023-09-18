import React, { FC, ReactNode } from 'react'
import { color, Style, styled } from '~'
import { DropDownItem, DropDownItemProps } from './DropDownItem'

export type DropDownProps = {
  style?: Style
  children?: ReactNode
  data?: DropDownItemProps[]
}

export const Dropdown: FC<DropDownProps> = ({ style, children, data }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '8px',
        backgroundColor: color('background', 'default', 'surface'),
        border: `1px solid ${color('border', 'default', 'strong')}`,
        borderRadius: 8,
        boxShadow:
          '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
        minHeight: 40,
        minWidth: 258,
        ...style,
      }}
    >
      {children}
      {data?.map((item, idx) => (
        <DropDownItem
          key={idx}
          label={item.label}
          caption={item.caption}
          icon={item.icon}
          type={item.type}
          value={item.value}
          data={item.data}
        />
      ))}
    </styled.div>
  )
}
