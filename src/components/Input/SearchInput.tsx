import React from 'react'
import { TextInput, TextInputProps } from './TextInput'
import { IconSearch } from '../../icons'
import { color } from '../../varsUtilities'

export type SearchInputProps = Omit<TextInputProps, 'beforeIcon'>

export function SearchInput(props: SearchInputProps) {
  return (
    <TextInput
      style={{
        backgroundColor: color('action', 'neutral', 'subtleNormal'),
        border: 'none',
        '&:hover': {
          backgroundColor: color('action', 'neutral', 'subtleHover'),
          border: 'none',
        },
        '&:focus-within': {
          border: `1px solid ${color('inputBorder', 'active', 'default')}`,
          boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
          backgroundColor: 'transparent',
        },
      }}
      beforeIcon={<IconSearch />}
      {...props}
    />
  )
}
