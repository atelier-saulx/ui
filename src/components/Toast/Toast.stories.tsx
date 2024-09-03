import React from 'react'
import { useToast } from './index.js'
import { Button } from '../Button/index.js'

export default {
  title: 'Toast',
  component: () => {},
}

export const Default = () => {
  const toast = useToast()
  return (
    <>
      <Button
        onClick={() => {
          toast('Title', {
            description: 'Description',
            icon: 'date',
            secondaryButtonLabel: 'Undo',
            onSecondaryClick: () => {
              console.log('secondary clicked')
            },
          })
        }}
      >
        Show undo
      </Button>
      <Button
        onClick={() => {
          toast('Title', {
            description: 'Description',
            icon: 'date',
            secondaryButtonLabel: 'Dismissive action',
            onSecondaryClick: () => {
              console.log('secondary clicked')
            },
            primaryButtonLabel: 'Affermative action',
            onPrimaryClick: () => {
              console.log('primary clicked')
            },
          })
        }}
      >
        Show permanent
      </Button>
    </>
  )
}
