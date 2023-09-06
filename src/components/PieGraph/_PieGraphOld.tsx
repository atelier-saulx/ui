import React, { FC, Fragment, useState, useRef } from 'react'
import { Text, color, styled, Style, ColorActionColors } from '../..'
import { prettyNumber } from '@based/pretty-number'

type PieGraphProps = {
  data?: {
    value: number | { [key: string]: number }
    label: string
    color?: string
  }[]
  value?: number
  size?: number
  color?: ColorActionColors
  style?: Style
}

export const PieGraph: FC<PieGraphProps> = ({
  data = [],
  color: colorProp = 'primary',
  size = 280,
  style,
}) => {
  if (!data) {
    return null
  }

  let total,
    totalPerObject,
    subValuesPerObject,
    subLabelsPerObject,
    totalPercentagesPerObject,
    percentagePerObject,
    anglePercentages

  let tempCounter = 0
  let subTempCounter = 0
  const subPercentages = []
  let anglePercentageCounter = 0
  const angleAddedPercentages = []
  const allLabelsInRowArray = []
  const newColorArr = []

  const themeColorArray = [
    'rgba(61, 83, 231,1)',
    'rgba(89,196,197,1)',
    'rgba(154,82,246,1)',
    'rgba(244,67,54,1)',
    'rgba(86,187,112,1)',
    'rgba(255,0,0,1)',
    'rgba(0,255,0,1)',
    'rgba(0,0,255,1)',
    'rgba(255,255,0,1)',
    'rgba(255,0,255,1)',
    'rgba(0,255,255,1)',
  ]

  const [toolTipIndex, setToolTipIndex] = useState(0)
  const [showMouseLabel, setShowMouseLabel] = useState(false)

  const mouseLabel = useRef<HTMLDivElement>(null)

  const hexToRgba = (hex: string) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16))
    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  //  test if value is an object or number
  if (typeof data[0]?.value === 'object') {
    subValuesPerObject = data.map((item) => Object.values(item.value))
    subLabelsPerObject = data.map((item) => Object.keys(item.value))

    totalPerObject = data.map((item) =>
      Object.values(item.value).reduce((t, value) => t + value, 0)
    )

    total = totalPerObject.reduce((t, value) => t + value, 0)

    totalPercentagesPerObject = totalPerObject.map(
      (item) => +((item / total) * 100)
    )

    for (let i = 0; i < subValuesPerObject.length; i++) {
      for (let j = 0; j < subValuesPerObject[i].length; j++) {
        subPercentages.push(+((subValuesPerObject[i][j] / total) * 100))
      }
    }

    anglePercentages = subPercentages.map((item) => (+item / 100) * 360)

    for (let i = 0; i < anglePercentages.length; i++) {
      anglePercentageCounter += anglePercentages[i]
      angleAddedPercentages.push(anglePercentageCounter)
    }

    //  all labels array
    for (let i = 0; i < totalPercentagesPerObject.length; i++) {
      for (let j = 0; j < subLabelsPerObject[i].length; j++) {
        allLabelsInRowArray.push(subLabelsPerObject[i][j])
      }
    }

    // check if there are sub label colors:
    for (let i = 0; i < data.length; i++) {
      if (data[i].color) {
        if (data[i].color.includes('#')) {
          // convert to rgba and then push
          themeColorArray[i] = hexToRgba(data[i].color)
        }
      }
    }

    const newColorArrayFun = () => {
      for (let i = 0; i < totalPerObject.length; i++) {
        for (let j = 0; j < subValuesPerObject[0]?.length; j++) {
          newColorArr.push(
            themeColorArray[i].slice(0, -2).concat(`${1 - 0.1 * j})`)
          )
        }
      }
    }
    newColorArrayFun()
  } else if (
    typeof data[0]?.value === 'number' ||
    typeof data[0]?.value === 'string'
  ) {
    total = Object.values(data).reduce((t, { value }) => t + +value, 0)
    percentagePerObject = data.map((item) => (+item.value / total) * 100)
  }

  const percentageToDegrees = (percentage: number) => {
    return (percentage * 360) / 100
  }

  const lastIndex = (arr, predicate) =>
    arr.map((item) => predicate(item)).lastIndexOf(true) + 1

  const mousePositionHandler = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.pageX - rect.left
    const y = e.pageY - rect.top
    const centerPoint = rect.width / 2
    const radians = Math.atan2(x - centerPoint, y - centerPoint)
    const flippedAngle = radians * (180 / Math.PI) + 180
    const angle = 360 - flippedAngle

    const indexOfAngle = lastIndex(
      angleAddedPercentages,
      (item) => item < angle
    )

    setToolTipIndex(indexOfAngle)

    if (showMouseLabel) {
      mouseLabel.current.style.left = `${x + 12}px`
      mouseLabel.current.style.top = `${y - 24}px`
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...style,
      }}
      onMouseLeave={() => {
        setShowMouseLabel(false)
      }}
      onMouseEnter={() => {
        setShowMouseLabel(true)
      }}
    >
      {typeof data[0]?.value !== 'object' && (
        <div
          style={{
            width: size,
            height: size,
            marginBottom: 24,
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          {data.map((item, idx) => (
            <Fragment key={idx}>
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  background: colorProp
                    ? `conic-gradient(${color(
                        'action',
                        colorProp,
                        'normal'
                      )} calc(${percentagePerObject[
                        idx
                      ].toFixed()}*1%),#0000 0)`
                    : `conic-gradient(${color(
                        'action',
                        'primary',
                        'normal'
                      )} calc(${percentagePerObject[
                        idx
                      ].toFixed()}*1%),#0000 0)`,
                  transform: `rotate(${percentageToDegrees(tempCounter)}deg)`,
                  opacity: `calc(1 - 0.${idx * 1})`,
                }}
              />

              <span style={{ display: 'none' }}>
                {(tempCounter += +percentagePerObject[idx].toFixed())}
              </span>
            </Fragment>
          ))}
        </div>
      )}

      {typeof data[0]?.value === 'object' && (
        <div
          style={{
            width: size,
            height: size,
            marginBottom: 24,
          }}
          onPointerMove={(e) => mousePositionHandler(e)}
        >
          {data.map((item, index) => (
            <Fragment key={index}>
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  background: 'transparent',
                  transform: `rotate(${percentageToDegrees(tempCounter)}deg)`,
                  opacity: `1`,
                }}
              />

              <span style={{ display: 'none' }}>
                {(tempCounter += +totalPercentagesPerObject[index])}
              </span>
            </Fragment>
          ))}

          {subPercentages.map((value, idx) => (
            <Fragment key={idx}>
              <styled.div
                key={idx}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  background: `conic-gradient(${newColorArr[idx]} calc(${subPercentages[idx]}*1%),#0000 0)`,
                  transform: `rotate(${percentageToDegrees(
                    subTempCounter
                  )}deg)`,
                  opacity: idx === toolTipIndex ? '0.75' : '1',
                }}
              />
              <span style={{ display: 'none' }}>
                {(subTempCounter += +subPercentages[idx])}
              </span>
            </Fragment>
          ))}
          {showMouseLabel ? (
            <div
              ref={mouseLabel}
              style={{
                position: 'absolute',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: '#fff',
                boxShadow: 'rgb(0 0 0 / 12%) 0px 4px 10px',
                border: `1px solid ${color('border', 'default', 'strong')}`,
              }}
            >
              {allLabelsInRowArray[toolTipIndex] +
                ' - ' +
                subPercentages[toolTipIndex].toFixed(1) +
                '%'}
            </div>
          ) : null}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                background:
                  typeof data[0]?.value !== 'object'
                    ? colorProp
                      ? color('action', colorProp, 'normal')
                      : color('action', 'neutral', 'normal')
                    : themeColorArray[idx],
                opacity:
                  typeof data[0]?.value !== 'object'
                    ? `calc(1 - 0.${idx * 1})`
                    : '1',
                marginRight: 12,
                border: `1px solid ${color('border', 'default', 'strong')}`,
              }}
            />
            {typeof data[0]?.value !== 'object' && (
              <Text>
                {item.label} - {prettyNumber(+item.value, 'number-short')} (
                {percentagePerObject[idx].toFixed(0) + '%'})
              </Text>
            )}
            {typeof data[0]?.value === 'object' && (
              <Text>
                {item.label} - (
                {totalPercentagesPerObject[idx].toFixed(0) + '%'})
              </Text>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
