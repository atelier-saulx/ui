import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import {
  color,
  Text,
  useTooltip,
  styled,
  ColorNonSemanticBackgroundColors,
  Button,
} from '../../'
import { prettyNumber } from '@based/pretty-number'

type BarGraphProps = {
  data?: {
    value: number | { [key: string]: number }
    label: string
    color?: ColorNonSemanticBackgroundColors
  }[]
  label?: string
  description?: string
  value?: number
  legend?: { [key: string]: string } | string[]
  style?: CSSProperties
  color?: ColorNonSemanticBackgroundColors
  scale?: number
  percentage?: boolean
  thingyProp?: boolean
}

export const BarGraphTest: FC<BarGraphProps> = ({
  data = [],
  label,
  description,
  value,
  legend = null,
  style,
  color: colorProp = 'purple',
  scale,
  // percentage = true,
  thingyProp = true,
}) => {
  if (!data) {
    return null
  }
  const [percentage, setPercentage] = useState(false)

  let highestVal,
    normalizedData,
    totalPerObject,
    normalizedDataPerObject,
    subValuesPerObject,
    legendValues,
    subLabelsPerObject,
    percentageOfTotal

  if (typeof data?.[0]?.value === 'object') {
    subValuesPerObject = data.map((item) => Object.values(item.value))
    subLabelsPerObject = data.map((item) => Object.keys(item.value))

    totalPerObject = data.map((item) =>
      Object.values(item.value).reduce((t, value) => t + value, 0)
    )
    scale ? (highestVal = scale) : (highestVal = Math.max(...totalPerObject))
    normalizedData = totalPerObject.map((item) => (item / highestVal) * 100)

    normalizedDataPerObject = data.map((item, idx) =>
      Object.values(item.value).map((value) =>
        (+(value / totalPerObject[idx]) * 100).toFixed(1)
      )
    )
  } else if (
    typeof data?.[0]?.value === 'number' ||
    typeof data?.[0]?.value === 'string'
  ) {
    scale
      ? (highestVal = scale)
      : (highestVal = Math.max(...data.map((item) => +item.value)))

    normalizedData = data.map((item) => (+item.value / highestVal) * 100)
    console.log('===---------------->', data)
    const sumValues = data.reduce(
      //@ts-ignore
      (value, currentValue) => value + currentValue.value,
      0
    )
    percentageOfTotal = data.map((item) => (+item.value / sumValues) * 100)
  }
  console.log(percentageOfTotal)
  // console.log(
  //   'highestVal:',
  //   highestVal,
  //   'normalizedData:',
  //   normalizedData,
  //   'totalPerObject:',
  //   totalPerObject,
  //   'normalizedDataPerObject:',
  //   normalizedDataPerObject,
  //   'subValuesPerObject:',
  //   subValuesPerObject,
  //   'legendValues:',
  //   legendValues,
  //   'subLabelsPerObject:',
  //   subLabelsPerObject
  // )

  // little legend check
  if (legend && typeof legend === 'object') {
    legendValues = Object.values(legend)
  } else if (legend && Array.isArray(legend)) {
    legendValues = legend
  } else {
    legendValues = undefined
  }

  const themeColorArray = [] as Array<string>

  for (let i = 0; i < data.length; i++) {
    // if (colorProp) {
    //   themeColorArray.push(color('content', colorProp, 'primary'))
    // } else {
    themeColorArray.push(color('content', 'brand', 'primary'))
    // }
  }

  const hexToRgba = (hex: string) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16))
    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  // check if there are sub label colors:
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].color) {
  //       if (data[i].color?.includes('#')) {
  //         // convert to rgba and then push
  //         //@ts-ignore
  //         themeColorArray[i] = hexToRgba(data[i].color)
  //       }
  //     }
  //   }
  //TODO Icon percentage
  return (
    <styled.div>
      {/* <Button onClick={() => setPercentage(!percentage)}>Percentage</Button> */}
      <Text selectable="none">
        {label} ,,,,,,,,,,,,,, {description}
      </Text>
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          border: '1px solid red',
          ...style,
        }}
      >
        {data.map((item, idx) => (
          <styled.div
            key={idx}
            style={{ display: 'flex', width: '100%', alignItems: 'center' }}
          >
            <styled.div
              style={{
                width: '100%',
                height: 32,
                borderRadius: 4,
                // backgroundColor: color('border'),
                position: 'relative',
                display: 'flex',
                margin: '4px auto',
              }}
            >
              {/* parent wrapper bar */}
              <styled.div
                style={{
                  width: `${normalizedData[idx]}%`,
                  height: 32,
                  borderRadius: 4,
                  backgroundColor:
                    // typeof item.value !== 'object'
                    //   ? colorProp
                    //     ? color('content', colorProp, 'primary')
                    color('nonSemanticBackground', colorProp, 'muted'),
                  //   : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  position: 'relative',
                }}
              >
                {item.label || value ? (
                  <styled.div style={{ minWidth: 200, paddingRight: 24 }}>
                    <Text selectable="none">{item.label}</Text>
                  </styled.div>
                ) : null}

                {typeof item.value === 'object' && (
                  <styled.div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    <Text selectable="none" color="default">
                      {prettyNumber(totalPerObject[idx], 'number-short')} (
                      {normalizedData[idx].toFixed(1) + '%'})
                      {/* ({(+item.value / (total / 100)).toFixed(1)}%) */}
                    </Text>
                  </styled.div>
                )}

                {/* // bar segments */}
                {typeof item.value === 'object' && (
                  <styled.div
                    style={{
                      position: 'absolute',
                      left: 0,
                      display: 'flex',
                      width: '100%',
                      '& > div:first-child': {
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: '4px',
                      },
                      '& > div:last-child': {
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                      },
                    }}
                  >
                    {normalizedDataPerObject[idx].map((item, key) => (
                      <BarSegment
                        key={key}
                        id={key}
                        width={item}
                        legend={legendValues && legendValues[key]}
                        value={prettyNumber(
                          subValuesPerObject[idx][key],
                          'number-short'
                        )}
                        label={subLabelsPerObject[idx][key]}
                        // bgColor={themeColorArray[idx]}
                        bgColor={'red'}
                      />
                    ))}
                  </styled.div>
                )}
              </styled.div>
            </styled.div>
            {typeof item.value !== 'object' && (
              <Text
                selectable="none"
                color="default"
                style={{ marginLeft: '10px', marginRight: 4 }}
              >
                {!percentage
                  ? prettyNumber(item.value, 'number-short')
                  : thingyProp
                  ? percentageOfTotal[idx].toFixed(1) + '%'
                  : normalizedData[idx].toFixed(1) + '%'}
              </Text>
            )}
          </styled.div>
        ))}
      </styled.div>
    </styled.div>
  )
}

type BarSegmentProps = {
  id: number | string
  width: number
  value: string | number
  style?: CSSProperties
  label?: string
  bgColor?: string
  legend?: ReactNode
}

export const BarSegment: FC<BarSegmentProps> = ({
  width,
  style,
  value,
  legend,
  label,
  bgColor,
  id,
  ...props
}) => {
  const barGraphToolTip = (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 164,
        padding: '8px',
      }}
    >
      {/* otherwise div with border doesnt work */}
      {legend && (
        <styled.div
          style={{
            borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
            marginBottom: 8,
          }}
        >
          <Text selectable="none" style={{ marginBottom: 8 }}>
            {legend}
          </Text>
        </styled.div>
      )}

      {!legend && label && (
        <styled.div
          style={{
            borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
            marginBottom: 8,
          }}
        >
          <Text selectable="none" style={{ marginBottom: 8 }}>
            {label}
          </Text>
        </styled.div>
      )}

      <styled.div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text selectable="none">{value}</Text>
        <Text selectable="none" color="brand">
          {(+width).toFixed(0) + '%'}
        </Text>
      </styled.div>
    </styled.div>
  )
  const tooltipListeners = useTooltip(barGraphToolTip, 'bottom')

  return (
    <styled.div
      style={{
        height: 32,
        display: 'block',
        width: width + '%',
        backgroundColor: bgColor || color('background', 'brand', 'strong'),
        opacity: `calc(1 - 0.${(id as any) * 2})`,
        ...style,
        '@media (hover: hover)': {
          '&:hover': {
            opacity: 0.5,
            backgroundColor: bgColor,
          },
        },
      }}
      {...props}
      {...tooltipListeners}
    >
      {/* {width} */}
    </styled.div>
  )
}
