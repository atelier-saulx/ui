import React, { FC } from 'react'
import { useContextState, Breadcrumbs, Row, border } from '~'

export const Footer: FC<{ name: string }> = ({ name }) => {
  const [field, setField] = useContextState<string[]>('field', [])

  if (field.length === 0) {
    return null
  }

  const data = field.reduce(
    (data, key) => {
      data[key] = key
      return data
    },
    {
      name,
    }
  )

  return (
    <Row
      style={{
        borderTop: border(1),
        padding: '16px 32px ',
        height: 56,
      }}
    >
      <Breadcrumbs
        active={field[field.length - 1]}
        onChange={(key) => setField(field.slice(0, field.indexOf(key) + 1))}
        data={data}
      />
    </Row>
  )
}
