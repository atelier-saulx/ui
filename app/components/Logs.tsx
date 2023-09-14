import React from 'react'
import { Logs } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Logs',
  description: '',
  // TODO  yves ,change to LogsProps once genprops works again
  properties: props.props.ScrollAreaProps.props,
  component: Logs,
  examples: [
    {
      props: {
        // data: [
        //   { msg: '🪵 Log 1', ts: 21241425 },
        //   { msg: '🪵 Log 2', ts: 2143241425 },
        // ],
      },
      customRenderer: () => {
        let logData = [
          { msg: '🪵 Log 1', ts: 21241425 },
          { msg: '🪵 Log 1', ts: 21241425 },
          { msg: '🪵 Log 1', ts: 21241425 },
          { msg: '🪵 Log 1', ts: 21241425 },
          { msg: '🪵 Log 1', ts: 21241425 },
        ]

        return <Logs data={logData} />
      },
    },
  ],
}

export default example
