import React from 'react'
import { useRoute } from 'kabouter'
import { FC } from 'react'
import { styled } from 'inlines'
import { ComponentDef } from './types'
import { Text, border, IconArrowUpRight, IconArrowDownLeft } from '../src'
import { parseProps } from './parseProps'

export const OverviewComponent: FC<{
  component: ComponentDef
}> = ({ component }) => {
  const route = useRoute()
  const isExpanded = route.query.expand === component.name

  return (
    <styled.div
      style={{
        minWidth: isExpanded ? 'calc(100vw - 48px - 62px)' : 400,
        padding: 24,
        borderRadius: 4,
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
          padding: 24,
          marginTop: 12,
          border: border(1),
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {React.createElement(
          component.component,
          parseProps(component.examples[0])
        )}
      </styled.div>
    </styled.div>
  )
}
