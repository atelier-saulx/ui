import React, { useState, useRef } from 'react'
import {
  ColorActionColors,
  color,
  Text,
  useThrottledCallback,
  useGraphHover,
} from '../..'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'
import { LineGraphData, LineXGraphFormat } from './types'

type LegendValues = {
  key: string
  x: number
  y: number
  color?: ColorActionColors
  svgX: number
  svgY: number
  valueFormat?: NumberFormat
}[]
const Legend = ({
  isHover,
  x,
  values,
  xFormat,
}: {
  isHover: boolean
  x: number
  values: LegendValues
  xFormat: LineXGraphFormat
}) => {
  if (!values[0]?.svgX) return null

  return (
    <div
      style={{
        opacity: x && isHover ? 1 : 0,
        transition: 'opacity 0.5s',
        transform: x
          ? `translate3d(${values[0].svgX}px,0px,0px)`
          : 'translate3d(0px,0px,0px)',
        width: '1px',
        height: '100%',
        backgroundColor: color('content', 'default', 'primary'),
      }}
    >
      <div
        style={{
          position: 'relative',
          transform: `translate3d(${-7.5}px, ${values[0].svgY - 7.5}px, 0px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            borderRadius: '50%',
            width: 15,
            border: `2px solid ${color('inputBorder', 'normal', 'default')} `,
            backgroundColor: color('content', 'brand', 'primary'),
            //   backgroundColor: color(values[0].color || 'content','brand','default'),
            height: 15,
          }}
        />
        {values.slice(1).map((value, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              transform: `translate3d(${0}px, ${
                value.svgY - values[0].svgY
              }px, 0px)`,
              borderRadius: '50%',
              width: 15,
              border: `2px solid ${color('content', 'default', 'primary')} `,
              backgroundColor: color('action', 'primary', 'normal'),
              //   backgroundColor: color(value.color || 'accent'),
              height: 15,
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            left: isFlippedX ? -110 : 24,
            padding: 8,
            backgroundColor: color('background', 'default', 'muted'),
            border: `1px solid ${color('inputBorder', 'normal', 'default')}`,
            boxShadow: 'rgb(0 0 0 / 12%) 0px 4px 10px',
            borderRadius: 4,
            width: 'auto',
            top: -30,
            minWidth: 100,
            transform: 'translateX(0%)',
          }}
        >
          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Text weight="strong">
              <span style={{ color: color('action', 'primary', 'normal') }}>
                &#x2022;{' '}
              </span>
              {prettyNumber(
                values[0].y,
                values[0].valueFormat || 'number-short'
              )}
            </Text>
            {values.slice(1).map((value, i) => (
              <Text key={i} weight="strong">
                <span style={{ color: color('action', 'primary', 'normal') }}>
                  &#x2022;{' '}
                </span>
                {prettyNumber(value.y, value.valueFormat || 'number-short')}
              </Text>
            ))}
            <Text>
              x:{' '}
              {xFormat === 'date-time-human'
                ? prettyDate(values[0].x, 'date-time-human')
                : xFormat === 'date'
                ? prettyDate(values[0].x, 'time-precise') +
                  ' - ' +
                  prettyDate(values[0].x, 'date')
                : prettyNumber(values[0].x, 'number-short')}
            </Text>
            {/* {extraInfo} */}
          </div>
        </div>
      </div>
    </div>
  )
}

let isFlippedX = false

const findPointAt = (path: SVGGeometryElement, x: number) => {
  let from = 0
  let to = path.getTotalLength()
  let current = (from + to) / 2
  let point = path.getPointAtLength(current)

  let count = 0
  while (Math.abs(point.x - x) > 0.5 && count < 10) {
    count++
    if (point.x < x) from = current
    else to = current
    current = (from + to) / 2
    point = path.getPointAtLength(current)
  }

  return { point, position: current / path.getTotalLength() }
}

const getY = ({
  x,
  width,
  isHover,
  data,
  lineRefs,
  xFormat,
}: {
  x: number
  width: number
  r: React.MutableRefObject<any>
  isHover: boolean
  data: LineGraphData
  isStacked: boolean
  legend: boolean
  ySpread: number
  lineRefs: { [key: string]: React.MutableRefObject<SVGGeometryElement> }
  xFormat: LineXGraphFormat
}) => {
  if (x < 0) return null

  const values = Object.keys(data)
    .reduce<LegendValues>((previous, key) => {
      if (!lineRefs[key]?.current) return previous

      const box = lineRefs[key].current.getBBox()
      if (x < box.x || x > box.x + box.width) {
        return previous
      }
      const { point } = findPointAt(lineRefs[key].current, x)

      return previous.concat({
        key,
        x: data[key].data[Math.floor((point.x / width) * data[key].data.length)]
          .x,
        y: data[key].data[Math.floor((point.x / width) * data[key].data.length)]
          .y,
        color: data[key].color,
        svgX: point.x,
        svgY: point.y,
        valueFormat: data[key].valueFormat,
      })
    }, [])
    .sort((a, b) => b.y - a.y)

  return (
    <Legend
      // legend={legend}
      // isStacked={isStacked}
      isHover={isHover}
      x={x}
      // p={p}
      // xInfo={xInfo}
      // selected={selected}
      values={values}
      xFormat={xFormat}
    />
  )
}

const Overlay = ({
  isHover,
  x,
  width,
  data,
  r,
  isStacked,
  legend,
  ySpread,
  lineRefs,
  xFormat,
}: {
  isHover: boolean
  x: number
  width: number
  data: LineGraphData
  r: React.MutableRefObject<any>
  isStacked: boolean
  legend: boolean
  ySpread: number
  lineRefs: { [key: string]: React.MutableRefObject<SVGGeometryElement> }
  xFormat: LineXGraphFormat
}) => {
  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {x
        ? getY({
            x,
            width,
            r,
            isHover,
            data,
            isStacked,
            legend,
            ySpread,
            lineRefs,
            xFormat,
          })
        : null}
    </div>
  )
}

export default ({
  width,
  height,
  labelHeight = 0,
  labels,
  children,
  data,
  isStacked,
  legend,
  ySpread,
  lineRefs,
  xFormat,
}) => {
  const [mouseX, setMouseX] = useState()

  const [hover, isHover] = useGraphHover()

  const ref = useRef<any>()

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
      }}
      // @ts-ignore TODO fix
      onMouseMove={useThrottledCallback((event) => {
        const { x } = event.currentTarget.getBoundingClientRect()
        const mousePosX = event.clientX

        if (window.innerWidth - mousePosX < 200) {
          isFlippedX = true
        } else {
          isFlippedX = false
        }

        // @ts-ignore
        setMouseX(event.pageX - x)
      }, [])}
      {...hover}
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        <path
          d={`M0,0L${width},1`}
          stroke={color('background', 'default', 'strong')}
        />
        {labels.map((v, i) => {
          const y = (i + 1) * labelHeight
          return (
            <path
              key={i}
              d={`M0,${y}L${width},${y}`}
              stroke={color('background', 'default', 'strong')}
            />
          )
        })}
        {children}
      </svg>
      <Overlay
        isStacked={isStacked}
        legend={legend}
        isHover={isHover}
        x={mouseX}
        width={width}
        data={data}
        r={ref}
        ySpread={ySpread}
        lineRefs={lineRefs}
        xFormat={xFormat}
      />
    </div>
  )
}
