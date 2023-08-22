import React from 'react'
import { useRoute } from 'kabouter'
import { FC } from 'react'
import { styled } from 'inlines'
import { ComponentDef } from './types'
import {
  Text,
  border,
  color,
  IconArrowUpRight,
  IconArrowDownLeft,
} from '../src'
import { parseProps } from './parseProps'

export const OverviewComponent: FC<{
  component: ComponentDef
}> = ({ component }) => {
  const route = useRoute()
  const isExpanded = route.query.expand === component.name

  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        borderRadius: 4,
        maxWidth: 1000,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size={18} weight="strong">
          {component.name}
        </Text>
        {isExpanded ? (
          <IconArrowDownLeft
            onClick={() => {
              // @ts-ignore
              route.setQuery({ expand: null })
            }}
          />
        ) : (
          <IconArrowUpRight
            onClick={() => {
              route.setQuery({ expand: component.name })
            }}
          />
        )}
      </styled.div>
      <styled.div
        style={{
          padding: 32,
          marginTop: 12,
          flexGrow: 1,
          borderTop: border(1),
          borderRadius: 8,
          display: 'flex',
          backgroundColor: color('background', 'neutral', 'muted'), // add extra bg color...
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <styled.div>
          {React.createElement(
            component.component,
            parseProps(component.examples[0])
          )}
        </styled.div>
      </styled.div>
    </styled.div>
  )
}
