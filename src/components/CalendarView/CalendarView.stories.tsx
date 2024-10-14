import React, { useState } from 'react'
import { CalendarView } from './index.js'

export default {
  title: 'Calendar',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = () => {
  return (
    <div style={{ height: '100svh' }}>
      <CalendarView />
    </div>
  )
}
