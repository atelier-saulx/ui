import React, { FC } from 'react'
import { styled, color as genColor } from '../../'

export const Dimmer = () => {
  return (
    <styled.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: genColor('standalone', 'dimmer', 'default'),
      }}
    />
  )
}
