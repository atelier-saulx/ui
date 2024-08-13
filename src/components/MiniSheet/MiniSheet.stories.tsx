import React from 'react'
import { MiniSheet } from './index.js'
import { IconButton } from '../IconButton/index.js'

export default {
  title: 'MiniSheet',
  component: () => {},
}

export const Default = () => {
  return (
    <MiniSheet>
      <MiniSheet.Trigger>
        {({ open }) => (
          <IconButton
            icon="text-styling"
            forceHover={open}
            trailChevron="down"
            size="small"
          />
        )}
      </MiniSheet.Trigger>
      <MiniSheet.Items>
        <MiniSheet.Item icon="bold" size="small" />
        <MiniSheet.Item icon="italic" size="small" />
        <MiniSheet.Item icon="underline" size="small" />
        <MiniSheet.Item icon="strikethrough" size="small" />
        <MiniSheet.Separator />
        <MiniSheet.Item icon="numbered-list" size="small" />
        <MiniSheet.Item icon="bulleted-list" size="small" />
      </MiniSheet.Items>
    </MiniSheet>
  )
}
