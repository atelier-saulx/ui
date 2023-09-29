import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { Button } from '../../components/Button'
import { useSidePanel } from '../../hooks/useSidePanel'

export const SidePanel = () => {
  const [primary, setPrimary] = useState(false)

  const { open } = useSidePanel(
    <styled.div
      style={{ width: '100%', height: '100%', padding: '20px' }}
      onClick={() => {}}
    >
      asdfasdf
      {primary && (
        <styled.div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage:
              'url("https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187.jpg?w=1272&h=848")',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </styled.div>,
    'right',
    { textTransform: 'uppercase' },
    'Title asdasdasd',
    { onClick: () => console.log('ligma'), label: 'asdasd' },
    {
      onClick: () => {
        setPrimary(true)
        console.log('ligmaaaa')
        console.log(primary)
      },
      label: 'Primary Action',
    }
  )

  return <Button onClick={(e: any) => open(e)}>Open SidePanel</Button>
}
