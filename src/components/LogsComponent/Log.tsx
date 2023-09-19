import React from 'react'
import { styled, color as useColor } from '../../'
import { prettyDate } from '@based/pretty-date'

export type Log = {
  service?: string
}

export default ({ service, data, logs, index, multi, filter }) => {
  let log

  if (data.type === 'start') {
    log = 'Start service'
  } else if (data.type === 'update') {
    log = (
      <styled.div
        style={{
          userSelect: 'text',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        Installed
        <styled.div
          style={{
            userSelect: 'text',
            marginLeft: 8,
            color: useColor('background', 'default', 'surface'),
            opacity: 0.5,
            fontSize: 14,
          }}
        >
          {data.log.slice(0, 8)}
        </styled.div>
      </styled.div>
    )
  } else {
    let keep
    log = data.log.split('\n').map((v, i) => {
      if (filter && !filter.find((f) => v.startsWith(f))) {
        return null
      }
      keep = true
      return (
        <styled.div
          key={i}
          style={{
            wordWrap: 'break-word',
            userSelect: 'text',
          }}
          dangerouslySetInnerHTML={{
            __html: v.replace(/\t/, '&nbsp&nbsp').replace(/\s/, '&nbsp'),
          }}
        />
      )
    })
    if (!keep) {
      return null
    }
  }

  if (log === undefined) {
    return null
  }

  // date time human with presicion
  let d =
    service && multi
      ? `${service.name} ${
          service.machine?.domain || service.machine?.publicIp
        }:${service.port} ${prettyDate(
          ~~(data.time / 60e3) * 60e3,
          'date-time'
        )} `
      : prettyDate(~~(data.time / 60e3) * 60e3, 'date-time')

  data._d = d

  if (d === (logs[index - 1] && logs[index - 1]._d)) {
    d = ''
  }

  return (
    <styled.div
      style={{
        // width: '100%',
        userSelect: 'text',
        fontSize: 14,
        color:
          data.type === 'warning'
            ? '#ff9800'
            : data.type === 'start' || data.type === 'update'
            ? 'rgb(150, 180, 246)'
            : useColor(
                'content',
                data.type === 'error' ? 'negative' : 'brand',
                'primary'
              ),
        fontFamily: 'Fira Code',
        display: 'flex',
        border: '1px solid red',
        '&:hover': {
          // background: 'rgba(255,255,255,0.15)',
          background: useColor('action', 'system', 'hover'),
        },
      }}
    >
      {d && (
        <styled.div
          style={{
            // marginTop: 20,
            userSelect: 'text',
            // paddingLeft: 24,
            // fontSize: 12,
            // marginBottom: 8,
            color: useColor('content', 'default', 'secondary'),
          }}
        >
          {d}
        </styled.div>
      )}
      <styled.div
        style={{
          display: 'flex',

          //   paddingTop: ,
          //   paddingBottom: 4,
          paddingLeft: 10,
          //   paddingRight: 24,
        }}
      >
        {service}:{log}
      </styled.div>
    </styled.div>
  )
}
