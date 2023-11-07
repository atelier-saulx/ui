import React, { FC, useState } from 'react'
import { Input, Text, IconBolt, styled } from '../../src'
import { Icon } from '../../src/icons/Icon'
import props from '../props.json'
import { ComponentDef } from '../types'
import * as ui from '../../src'

export const AllIcons: FC<{ onSelect: any }> = (props) => {
  const icons = []

  const [filter, setFilter] = useState('')

  for (const key in ui) {
    if (
      key.startsWith('Icon') &&
      !key.startsWith('IconSmall') &&
      (!filter || key.toLowerCase().includes(filter.toLowerCase()))
    ) {
      icons.push(
        // @ts-ignore
        <div
          key={key}
          style={{
            display: 'flex',
            width: 300,
            cursor: props.onSelect ? 'pointer' : 'auto',
            alignItems: 'center',
          }}
          onClick={() => {
            if (props.onSelect) {
              props.onSelect(key)
            }
          }}
        >
          {React.createElement(ui[key], props)}
          <Text
            selectable={props.onSelect ? 'none' : 'all'}
            light
            style={{ marginLeft: 20 }}
          >
            {key}
          </Text>
        </div>
      )
    }
  }
  return (
    <div
      style={{
        gap: 12,
        display: 'flex',
        flexWrap: 'wrap',
        // width: '100%',
      }}
    >
      <styled.div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Input
          clearButton
          style={{
            width: '100%',
            maxWidth: 350,
            marginBottom: 16,
          }}
          placeholder="Filter..."
          type="search"
          value={filter}
          onChange={(v) => {
            setFilter(v)
          }}
        />
      </styled.div>

      {icons}
    </div>
  )
}

const example: ComponentDef = {
  name: 'Icon',
  properties: props.props.IconProps.props,
  component: Icon,
  description: 'Stylable SVG icons that are generated from figma',
  examples: [
    {
      name: 'Large Icons',
      customRenderer: AllIcons,
      props: {
        color: 'brand',
      },
    },
    {
      name: 'Small icons',
      customRenderer: (props) => {
        const icons = []
        for (const key in ui) {
          if (key.startsWith('IconSmall')) {
            icons.push(
              // @ts-ignore
              <div
                key={key}
                style={{
                  display: 'flex',
                  width: 300,
                  alignItems: 'center',
                }}
              >
                {React.createElement(ui[key], props)}
                <Text light style={{ marginLeft: 20 }}>
                  {key}
                </Text>
              </div>
            )
          }
        }
        return (
          <div
            style={{
              gap: 12,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {icons}
          </div>
        )
      },
      props: {
        color: 'brand',
      },
    },
    {
      name: 'Clickable Icon',
      description:
        'When onClick is provided will add a hover state and larger hitbox',
      customRenderer: IconBolt,
      props: {
        onClick: () => {
          alert('bla')
        },
      },
    },
  ],
}

export default example
