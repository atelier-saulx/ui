import React, { useEffect, useState } from 'react'
import { OptionCardGroup } from './index.js'

export default {
  title: 'OptionCardGroup',
  component: OptionCardGroup,
}

export const Two = () => {
  const [value, setValue] = useState('one')

  return (
    <OptionCardGroup
      value={value}
      onChange={setValue}
      options={[
        { label: 'Option', icon: 'grid', value: 'one' },
        { label: 'Option', icon: 'grid', value: 'two' },
      ]}
    />
  )
}

export const Three = () => {
  const [value, setValue] = useState('one')

  return (
    <OptionCardGroup
      value={value}
      onChange={setValue}
      options={[
        { label: 'Option', icon: 'grid', value: 'one' },
        { label: 'Option', icon: 'grid', value: 'two' },
        { label: 'Option', icon: 'grid', value: 'three' },
      ]}
    />
  )
}

export const Four = () => {
  const [value, setValue] = useState('four')

  return (
    <OptionCardGroup
      value={value}
      onChange={setValue}
      options={[
        { label: 'Option', icon: 'grid', value: 'one' },
        { label: 'Option', icon: 'grid', value: 'two' },
        { label: 'Option', icon: 'grid', value: 'three' },
        { label: 'Option', icon: 'grid', value: 'four', disabled: true },
      ]}
    />
  )
}
