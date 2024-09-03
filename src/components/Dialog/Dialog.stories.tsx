import React from 'react'
import { Button } from '../Button/index.js'
import { useDialog } from './index.js'

export default {
  title: 'Dialog',
  component: () => {},
}

export const Default = () => {
  const dialog = useDialog()
  return (
    <>
      <Button
        onClick={() => {
          dialog({
            title: 'Title',
            description:
              "This is the window's description which can hold a bit more text.",
            dismissButtonLabel: 'Got it',
          })
        }}
      >
        Open dialog 1
      </Button>
      <Button
        onClick={() => {
          dialog({
            title: 'Title',
            description:
              "This is the window's description which can hold a bit more text.",
            dismissButtonLabel: 'Got it',
            actionButtonLabel: 'Action',
            onAction: () => {
              console.log('action button clicked')
            },
          })
        }}
      >
        Open dialog 2
      </Button>
      <Button
        onClick={() => {
          dialog({
            title: 'Delete 8 games',
            description:
              'This is action is permanent and irreversible. All deleted games will be unpublished from their respective platforms.',
            dismissButtonLabel: 'Cancel',
            actionButtonLabel: 'Delete',
            onAction: () => {
              console.log('delete button clicked')
            },
            color: 'red',
          })
        }}
      >
        Open dialog 3
      </Button>
    </>
  )
}
