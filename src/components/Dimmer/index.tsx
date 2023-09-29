import React, { FC } from 'react'
import { color as genColor } from '../../varsUtilities'
import { styled } from 'inlines'

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
