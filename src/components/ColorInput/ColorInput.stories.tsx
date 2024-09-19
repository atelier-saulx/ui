import React, { useState } from 'react'
import { ColorInput } from './index.js'

export default {
  title: 'ColorInput',
  component: ColorInput,
}

export const Default = () => {
  const [value, setValue] = useState<string>()
  return <ColorInput value={value} onChange={setValue} />
}
