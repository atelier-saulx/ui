import React, { FC, ReactNode } from 'react'
import { IconHourglass, border, color } from '../src'

export const Viewer: FC<{
  title: string
  component: FC
  props: {
    [key: string]: {
      name?: string
      description?: string
      values?: any[]
      type?: 'boolean' | 'string' | 'number'
    }
  }
}> = ({ title, component, props }) => {
  const p: ReactNode[] = []

  for (const key in props) {
    const property = props[key]
    p.push(
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconHourglass />
        <div
          style={{
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          {property.name ?? key}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <div
            style={{
              minWidth: 400,
              marginBottom: 24,
            }}
          >
            {title}
          </div>
          <div
            style={{
              padding: 24,
              display: 'flex',
              justifyContent: 'center',
              border: border(1),
              borderRadius: 4,
              background: color('standalone', 'dimmer', 'default'),
            }}
          >
            {React.createElement(component)}
          </div>
          <div
            style={{
              marginTop: 24,
            }}
          >
            {p}
          </div>
        </div>
      </div>
    </div>
  )
}
