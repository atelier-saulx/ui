import React, { ReactNode, useState, useRef, useEffect, FC } from 'react'
import { Color, Icon } from '~/types'
import { Style, styled } from 'inlines'
import {
  Text,
  renderOrCreateElement,
  color as colorFn,
  ChevronDownIcon,
  ScrollArea,
} from '~'
import dayjs from 'dayjs'

type NewLogsObject = {
  status?: string
  type?: string
  ts?: number
  msg?: string
  subType?: ReactNode | string
  color?: Color
  icon?: Icon
  customComponent?: FC
}[]

type LogGroupsProps = {
  data?: NewLogsObject
  groupByTime?: number
}

type SingleLogProps = {
  msg: any
  style?: Style
  ts?: number
  type?: string
  idx?: number
}

const VerticalLine = styled('div', {
  height: '100%',
  width: '1px',
  backgroundColor: colorFn('border'),
  position: 'absolute',
  left: 12,
  top: 0,
  bottom: 0,
  zIndex: 0,
})

const StatusDotBorder = styled('div', {
  height: 24,
  width: 24,
  borderRadius: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colorFn('red'),
})

const StatusDot = styled('div', {
  height: 14,
  width: 14,
  borderRadius: 24,
  backgroundColor: colorFn('background2'),
})

// groupby -> groupbytime, type, status,
// if within time and is same type... group m
// TODO: Scroll direction bottom to top, top to bottom
// TODO: counter for logs per block.

const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === 'desc'
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
      }
      return acc
    }, 0)
  )

export const LogGroups = ({ data, groupByTime }: LogGroupsProps) => {
  const groupByTimeInMilliSeconds = groupByTime * 60000

  const orderedByTypeAndTime = orderBy(data, ['type', 'ts'], ['desc', 'desc'])

  const checkIfThereAreSameTypeAndWithinRange = (obj, obj2) => {
    const tsResult = Math.abs(obj.ts - obj2?.ts)
    if (
      obj.type === obj2?.type &&
      obj.subType === obj2?.subType &&
      tsResult < groupByTimeInMilliSeconds
    ) {
      return true
    }
  }

  const pairs = []

  for (let i = 0; i < orderedByTypeAndTime.length; i++) {
    if (
      checkIfThereAreSameTypeAndWithinRange(
        orderedByTypeAndTime[i],
        orderedByTypeAndTime[i + 1]
      )
    ) {
      pairs.push([i, i + 1])
    } else {
      pairs.push([i, i])
    }
  }

  const result = []

  let item
  for (let i = 0; i < pairs.length; i++) {
    const arr = pairs[i]
    if (!item) {
      item = arr
      result.push(item)
    }
    const next = pairs[i + 1]
    if (next && item[1] === next[0]) {
      item[1] = next[1]
    } else {
      item = null
    }
  }

  const finalArr = []

  for (let i = 0; i < result.length; i++) {
    finalArr.splice(result[i][0], result[i][1] + 1)
    finalArr.push(orderedByTypeAndTime.slice(result[i][0], result[i][1] + 1))
  }

  const finalOrderBy = (arr, props, orders) =>
    [...arr].sort((a, b) =>
      props.reduce((acc, prop, i) => {
        if (acc === 0) {
          const [p1, p2] =
            orders && orders[i] === 'desc'
              ? [b[0][prop], a[0][prop]]
              : [a[0][prop], b[0][prop]]
          acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
        }
        return acc
      }, 0)
    )

  const finalFinalOrderedArr = finalOrderBy(finalArr, ['ts'], ['desc'])

  return (
    <styled.div style={{ width: '100%' }}>
      {finalFinalOrderedArr.map((item, idx) => {
        return (
          <GroupedLogs
            key={idx}
            color={item[0].color}
            ts={item[0].ts}
            msg={item[0].msg}
            type={item[0].type}
            status={item[0]?.status}
            subType={item[0]?.subType}
            subItems={item}
          />
        )
      })}
    </styled.div>
  )
}

const GroupedLogs = ({ ts, msg, color, type, status, subType, subItems }) => {
  const [expanded, setExpanded] = useState(false)

  // Scroll logic
  const [isAtBottom, setIsAtBottom] = useState(true)

  const ref = useRef<HTMLDivElement>()

  const scrollHandler = (e: Event) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement
    const newIsAtBottom = scrollTop + clientHeight >= scrollHeight
    setIsAtBottom(newIsAtBottom)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', scrollHandler)
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [ref])

  return (
    <styled.div style={{ display: 'flex', position: 'relative' }}>
      <VerticalLine />

      <styled.div
        style={{
          display: 'flex',
          backgroundColor: colorFn('background'),
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          zIndex: 1,
          position: 'relative',
          marginLeft: -4,
          marginTop: 4,
        }}
      >
        <StatusDotBorder
          style={{
            backgroundColor:
              colorFn(color, undefined, true) ??
              (status === 'error'
                ? colorFn('lightred')
                : status === 'succes'
                ? colorFn('lightgreen')
                : status === 'info'
                ? colorFn('lightaccent')
                : colorFn('background2')),
          }}
        >
          <StatusDot
            style={{
              backgroundColor:
                colorFn(color) ??
                (status === 'error'
                  ? colorFn('red')
                  : status === 'succes'
                  ? colorFn('green')
                  : status === 'info'
                  ? colorFn('accent')
                  : colorFn('background2')),
            }}
          />
        </StatusDotBorder>
      </styled.div>

      <div style={{ marginBottom: 20, width: '100%' }}>
        <styled.div
          style={{
            borderRadius: 8,
            padding: '12px 6px',
            width: '100%',
            // '&:hover': {
            //   backgroundColor: '#eeeffd7d',
            // },
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <GroupedLogsHeader
            ts={ts}
            color={color}
            type={type}
            status={status}
            subType={subType}
            msg={msg}
          />

          {/* map throug single logs that belong togehter // show them in a scroll area */}
          {expanded && (
            <styled.div
              ref={ref}
              style={{
                maxWidth: '100%',
                '&::-webkit-scrollbar': {
                  backgroundColor: 'rgba(0,0,0,0)',
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: colorFn('background'),
                  borderRadius: '12px',
                },
              }}
            >
              {msg.length || msg.includes('\n') > 74 ? (
                <SingleLog msg={msg} style={{ marginTop: 16 }} />
              ) : null}
              <ScrollArea>
                {subItems.map((item, idx) =>
                  idx !== 0 ? (
                    <SingleLog
                      msg={item.msg}
                      key={idx}
                      ts={item.ts}
                      type={item.type}
                      idx={idx}
                    />
                  ) : null
                )}
              </ScrollArea>
            </styled.div>
          )}
          {!expanded && subItems.length > 1 ? (
            <styled.div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 4,
                marginLeft: 8,
                cursor: 'pointer',
                '& svg': {
                  '& path': {
                    strokeWidth: 3,
                  },
                },
              }}
            >
              <ChevronDownIcon
                color="accent"
                style={{ marginRight: 8 }}
                size={12}
              />
              <Text color="accent" typography="caption600">
                Show {subItems.length - 1} more logs
              </Text>
            </styled.div>
          ) : null}
        </styled.div>
      </div>
    </styled.div>
  )
}

const GroupedLogsHeader = ({ ts, color, type, status, subType, msg }) => {
  return (
    <styled.div>
      <styled.div style={{ display: 'flex', marginBottom: 4 }}>
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <styled.div
            style={{
              display: 'flex',
              backgroundColor: colorFn('background2'),
              padding: '2px 8px',
              borderRadius: type ? ' 12px 0px 0px 12px' : '12px',
              borderRight: `1px solid ${colorFn('border')}`,
            }}
          >
            <Text typography="caption500">{dayjs(ts).format('HH:mm:ss')} </Text>
            <Text
              typography="caption500"
              color="text2"
              style={{ marginLeft: 4 }}
            >
              {dayjs(ts).format('DD/MM/YYYY')}
            </Text>
          </styled.div>
          {type ? (
            <styled.div
              style={{
                display: 'flex',
                backgroundColor: colorFn('background2'),
                padding: '2px 8px',
                borderRadius: ' 0px 12px 12px 0px',
              }}
            >
              <Text typography="caption500">{type}</Text>
            </styled.div>
          ) : null}
        </styled.div>
      </styled.div>

      {msg[0] === '{' ? (
        <pre
          style={{
            color: colorFn('text2'),
            boxSizing: 'inherit',
            display: 'inherit',
            userSelect: 'text',
            padding: 0,
            margin: 0,
            marginLeft: 8,
            marginTop: 8,
            border: undefined,
            lineHeight: '18px',
            fontSize: 14,
            fontFamily: 'Fira Code',
            wordBreak: 'break-all',
            whiteSpace: 'break-spaces',
            overflowWrap: 'break-word',
            position: 'relative',
          }}
          dangerouslySetInnerHTML={{ __html: msg }}
        ></pre>
      ) : (
        <Text
          selectable
          style={{
            marginBottom: 12,
            marginTop: 8,
            marginLeft: 8,
            cursor: 'pointer',
          }}
          typography="subtext600"
          color={status === 'error' ? 'red' : 'text'}
        >
          {msg.split('\n')[0].substring(0, 74)}
        </Text>
      )}

      {subType ? (
        <styled.div style={{ marginBottom: 8 }}>
          {typeof subType === 'string' ? (
            <Text color="text2" typography="caption500">
              {subType}
            </Text>
          ) : (
            renderOrCreateElement(subType)
          )}
        </styled.div>
      ) : null}
    </styled.div>
  )
}

const SingleLog = ({ msg, style, ts, type, idx }: SingleLogProps) => {
  return (
    <styled.div
      style={{
        background: colorFn('background'),
        marginBottom: 8,
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {idx === 0 && ts && (
        <styled.div style={{ display: 'flex' }}>
          <styled.div
            style={{
              display: 'flex',
              backgroundColor: colorFn('background2'),
              padding: '2px 8px',
              borderRadius: ' 12px 0px 0px 12px',
              borderRight: `1px solid ${colorFn('border')}`,
            }}
          >
            <Text typography="caption500">{dayjs(ts).format('HH:mm:ss')} </Text>
            <Text
              typography="caption500"
              color="text2"
              style={{ marginLeft: 4 }}
            >
              {dayjs(ts).format('DD/MM/YYYY')}
            </Text>
          </styled.div>
          <styled.div
            style={{
              display: 'flex',
              backgroundColor: colorFn('background2'),
              padding: '2px 8px',
              borderRadius: ' 0px 12px 12px 0px',
            }}
          >
            <Text typography="caption500">{type}</Text>
          </styled.div>
        </styled.div>
      )}

      {idx !== 0 && msg[0] !== '{' && (
        <pre
          style={{
            color: colorFn('text2'),
            boxSizing: 'inherit',
            display: 'inherit',
            userSelect: 'text',
            padding: 0,
            margin: 0,
            marginLeft: 8,
            marginTop: 10,
            border: undefined,
            lineHeight: '18px',
            fontSize: 14,
            fontFamily: 'Fira Code',
            wordBreak: 'break-all',
            whiteSpace: 'break-spaces',
            overflowWrap: 'break-word',
            position: 'relative',
          }}
          // dangerouslySetInnerHTML={{ __html: msg }}
        >
          {msg}
        </pre>
      )}
    </styled.div>
  )
}
