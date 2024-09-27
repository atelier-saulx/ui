import React, { useState } from 'react'
import { ScrollArea } from './index.js'

export default {
  title: 'ScrollArea',
  component: ScrollArea,
}

export const Default = () => {
  return (
    <div style={{ height: 500, width: 500 }}>
      <ScrollArea>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            style={{
              height: 200,
              width: 2500,
              border: '1px solid yellow',
              background: 'red',
            }}
          >
            random long & tall list item {i}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
