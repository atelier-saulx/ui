import React from 'react'
import { Checkbox as CheckboxComponent } from '~'
import ComponentViewer from '../ComponentViewer'

export const Checkbox = () => {
  return (
    <ComponentViewer
      component={CheckboxComponent}
      propsName="CheckboxProps"
      examples={[
        {
          props: {
            label: 'Checkbox label',
            onChange: (event) => {
              console.log('event -> ', event)
            },
          },
        },
        {
          props: {
            label: 'Checkbox checked',
            value: true,
            color: 'green',
            indeterminate: true,
          },
        },
        {
          props: {
            label: 'Check it out',
            description: 'Checkbox description',
            value: true,
            small: true,
          },
        },
        {
          props: {
            label: 'Console log',
            onChange: () => {
              console.log('Checkbox changed')
            },
          },
        },
      ]}
    />
  )
}
