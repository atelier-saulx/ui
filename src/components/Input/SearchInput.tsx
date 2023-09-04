import React from 'react'
import { TextInput, TextInputProps } from './TextInput'
import { IconSearch, color } from '../..'

export type SearchInputProps = Omit<TextInputProps, 'icon'>

export function SearchInput(props: SearchInputProps) {
  return (
    <TextInput
      style={{
        backgroundColor: color('action', 'neutral', 'subtleNormal'),
        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: color('action', 'neutral', 'subtleHover'),
          border: '1px solid transparent',
        },
        '&:focus-within': {
          border: `1px solid ${color('inputBorder', 'active', 'default')}`,
          boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
          backgroundColor: 'transparent',
        },
      }}
      icon={<IconSearch />}
      {...props}
    />
  )
}
