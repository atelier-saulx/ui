import React from 'react'
import { Modal } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Modal',
  properties: props.props.ModalProps.props,
  component: Modal,
  description: 'Must be a dialog example here',
  examples: [{ props: {} }],
}

export default example
