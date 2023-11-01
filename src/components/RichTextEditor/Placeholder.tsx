import React from 'react'
import { styled } from 'inlines'
import { color } from '../../varsUtilities'

type PlaceholderProps = {
  children?: string
}

export function Placeholder({ children }: PlaceholderProps) {
  return (
    <styled.div
      style={{
        position: 'absolute',
        top: 55,
        left: 17,
        pointerEvents: 'none',
      }}
    >
      <p
        className="rte-p"
        style={{ color: color('content', 'default', 'secondary') }}
      >
        {children}
      </p>
    </styled.div>
  )
}
