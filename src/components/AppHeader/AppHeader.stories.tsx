import React, { useState } from 'react'
import { AppHeader } from './index.js'
import { Button } from '../Button/index.js'
import { IconButton } from '../IconButton/index.js'
import { Separator } from '../Separator/index.js'
import { Text } from '../Text/index.js'

export default {
  title: 'AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = () => {
  return (
    <div style={{ height: '100svh' }}>
      <AppHeader>
        <AppHeader.Title>Articles</AppHeader.Title>
        <AppHeader.Right>
          <Text variant="display-regular" color="neutral60">
            15 articles
          </Text>
          <AppHeader.Separator />
          <Button variant="ghost" leadIcon="filter">
            Filter
          </Button>
          <Button variant="ghost" leadIcon="sort">
            Sort
          </Button>
          <AppHeader.Separator />
          <IconButton icon="sheet" />
          <Button leadIcon="add">New articles</Button>
        </AppHeader.Right>
      </AppHeader>
    </div>
  )
}
