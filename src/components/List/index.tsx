import React, { useState } from 'react'
import { Style, styled } from 'inlines'
import { Text } from '../Text'
import { color } from '../../varsUtilities'
import { IconArrowheadRight } from 'src/icons'
import { Button } from '../Button'

export const List = () => {
  const [open, setOpen] = useState(false)

  return (
    <styled.div
      style={{
        width: '100%',
        display: 'flex',
        borderLeft: `1px solid ${color('inputBorder', 'neutralNormal')}`,
        paddingLeft: 12,
      }}
    >
      <Text
        weight="strong"
        style={{ display: 'flex', gap: 4, alignItems: 'center' }}
      >
        Title{' '}
        <Button
          hideFocusState
          size="small"
          light
          color="system"
          onClick={() => setOpen(!open)}
          icon={
            <IconArrowheadRight
              color="default"
              style={{
                transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: '0.2s all',
              }}
            />
          }
        />{' '}
      </Text>
    </styled.div>
  )
}
