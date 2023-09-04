import React, { useState } from 'react'
import { styled, Slider } from '../../'

export const BarGraph = () => {
  const [data, setData] = useState(61)
  const [data1, setData1] = useState(19)
  const [data2, setData2] = useState(15)

  const barData = [
    {
      label: 'Wow lavel 1',
      value: data1,
    },
    {
      label: 'Wow label 2????',
      value: data,
    },
    {
      label: 'Wow label 3?????',
      value: data2,
    },
  ]

  return (
    <styled.div>
      <BarGraph data={barData} color="magenta" />
      <styled.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          marginTop: '300px',
        }}
      >
        <Slider onChange={setData1} max={100} min={0} steps={1} />
        <Slider onChange={setData} max={100} min={0} steps={1} />
        <Slider onChange={setData2} max={100} min={0} steps={1} />
      </styled.div>
    </styled.div>
  )
}
