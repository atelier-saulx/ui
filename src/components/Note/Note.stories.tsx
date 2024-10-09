import React from 'react'
import { Note } from './index.js'
import { Button } from '../Button/index.js'

export default {
  title: 'Note',
  component: Note,
}

export const Default = {
  args: {
    title: 'Title',
    description: 'Description',
    children: <Button>Button</Button>,
  },
}

export const Red = {
  args: {
    title: 'Title',
    description: 'Description',
    children: <Button>Button</Button>,
    color: 'red',
  },
}

export const Orange = {
  args: {
    title: 'Title',
    description: 'Description',
    children: <Button>Button</Button>,
    color: 'orange',
  },
}

export const Green = {
  args: {
    title: 'Title',
    description: 'Description',
    children: <Button>Button</Button>,
    color: 'green',
  },
}

export const Blue = {
  args: {
    title: 'Title',
    description: 'Description',
    children: <Button>Button</Button>,
    color: 'blue',
  },
}
