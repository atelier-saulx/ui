import React, { CSSProperties, FC } from 'react'
import { color } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Link, useRoute } from 'kabouter'
import { Text } from '../Text'
import { Color } from '~/types'

type StepsProps = {
  style?: CSSProperties
  selected?: string
  prefix?: string
  data?: {
    [key: string]: string
  }
  color?: Color
}

export const Steps: FC<StepsProps> = ({
  style,
  data = {},
  prefix = '',
  selected,
  color: colorProp = 'accent',
  ...props
}) => {
  const route = useRoute()
  if (selected) {
    selected = prefix + selected
  } else {
    selected = route.location
  }

  return (
    <div style={style} {...props}>
      {Object.keys(data).map((key, index) => {
        const href = prefix + data[key]
        const isActive = hrefIsActive(href, selected)
        return (
          <Link
            href={href}
            key={index}
            style={{
              alignItems: 'center',
              backgroundColor: isActive
                ? color(colorProp, 'active', true)
                : null,
              borderRadius: 8,
              display: 'flex',
              height: 48,
              marginBottom: 8,
              padding: '0 16px',
            }}
          >
            <Text
              color={colorProp}
              style={{
                backgroundColor: color(colorProp, 'contrast'),
                borderRadius: 13,
                height: 26,
                lineHeight: '26px',
                marginRight: 16,
                textAlign: 'center',
                width: 26,
              }}
            >
              {index + 1}
            </Text>
            <Text>{key}</Text>
          </Link>
        )
      })}
    </div>
  )
}
