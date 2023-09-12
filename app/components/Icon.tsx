import React from 'react'
import { Input, Text, IconBolt } from '../../src'
import { Icon } from '../../src/icons/Icon'
import props from '../props.json'
import { ComponentDef } from '../types'
import * as ui from '../../src'

const example: ComponentDef = {
  name: 'Icon',
  properties: props.props.IconProps.props,
  component: Icon,
  description: 'Icons are generated from figma directly',
  examples: [
    {
      name: 'Large Icons',
      customRenderer: (props) => {
        const icons = []
        for (const key in ui) {
          if (key.startsWith('Icon') && !key.startsWith('IconSmall')) {
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
