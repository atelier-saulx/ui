import React from 'react'

import { Input } from '~/components/Input'
import { AudioIcon } from '~/icons/AudioIcon'
export const KylesPlayground = () => {
  let width, height
  const paramsStart = ['h=' + undefined, 'w=' + undefined]
  const params = ['h=' + height, 'w=' + width]
  const newParams = []
  for (let i = 0; i < params.length; i++) {
    if (params[i] !== paramsStart[i]) {
      newParams.push(params[i])
    }
  }
  console.log(newParams)
  // join() with & inbetween

  return (
    <div>
      <Input
        type="digest"
        onChange={(e) => console.log(e)}
        style={{ width: '800px' }}
        // ghost
        // icon={<AudioIcon />}
        value="asdasd"
        // label="asdfasdf"
        // description="asdasd"
        // style={{ border: '1px solid red' }}
      />
    </div>
  )
}
//  not everything in the bar chart be set to 100% based on highest value,
// if there is only 1 value per set u still have to put it in an object or the color will just be default
// if you move the color picker too fast it gives a weird value
