import { LineGraphData, LineGraphDataInput, Point } from './types'

export const getMinMax = (data: Point[]) => {
  let maxY: number
  let minY: number
  let maxX: number
  let minX: number

  for (let i = 0; i < data.length; i++) {
    const { x, y } = data[i]
    if (maxY === undefined || y > maxY) {
      maxY = y
    }
    if (minY === undefined || y < minY) {
      minY = y
    }
    if (maxX === undefined || x > maxX) {
      maxX = x
    }
    if (minX === undefined || x < minX) {
      minX = x
    }
  }
  return { minX, maxX, minY, maxY }
}

export const averageData = ({
  data,
  lineStepSize,
  width,
  targetStepSize = 10,
}: {
  data: Point[]
  lineStepSize: number
  width: number
  targetStepSize?: number
}) => {
  const dX = targetStepSize / lineStepSize
  const condenseAmount = Math.round(dX)
  const newStepSize = width / Math.floor((data.length - 1) / condenseAmount)
  const newData: Point[] = []
  const minData: Point[] = []
  const maxData: Point[] = []

  for (let i = 0; i < data.length; i += condenseAmount) {
    let totalX = 0
    let totalY = 0
    let minY: number
    let maxY: number
    let pointsTraversed = 0

    for (let j = 0; j < condenseAmount; j++) {
      const item = data[i + j]
      if (item) {
        pointsTraversed++
        if (minY === undefined || item.y < minY) minY = item.y
        if (maxY === undefined || item.y > maxY) maxY = item.y
        totalX += item.x
        totalY += item.y
      }
    }

    newData.push({
      x: totalX / pointsTraversed,
      y: totalY / pointsTraversed,
    })
    minData.push({
      x: totalX / pointsTraversed,
      y: minY,
    })
    maxData.push({
      x: totalX / pointsTraversed,
      y: maxY,
    })
  }
  return { data: newData, minData, maxData, stepSize: newStepSize }
}

export const getGlobalMinMax = (data: LineGraphData) => ({
  globalMinX: Math.min(...Object.values(data).map((l) => l.minX)),
  globalMaxX: Math.max(...Object.values(data).map((l) => l.maxX)),
  globalMinY: Math.min(...Object.values(data).map((l) => l.minY)),
  globalMaxY: Math.max(...Object.values(data).map((l) => l.maxY)),
})

export const processData = ({
  dataInput,
}: {
  dataInput: LineGraphDataInput
}) => {
  // Unify data format
  let data: LineGraphData
  if (Array.isArray(dataInput)) {
    data = { '': { data: dataInput } }
  } else if (Array.isArray(dataInput[Object.keys(dataInput)[0]])) {
    data = Object.keys(dataInput).reduce(
      (newData, key) => ({ ...newData, [key]: { data: dataInput[key] } }),
      {}
    )
  } else {
    data = dataInput as LineGraphData
  }

  // calculate mins and maxs
  for (const key in data) {
    const { minX, maxX, minY, maxY } = getMinMax(data[key].data)
    data[key].minX = minX
    data[key].maxX = maxX
    data[key].minY = minY
    data[key].maxY = maxY
  }
  return data
}

export const generatePoints = ({
  data,
  paddingLeft,
  width,
  lineStepSize,
  ySpread,
  globalMinY,
  pxValue,
}: {
  data: Point[]
  paddingLeft: number
  width: number
  lineStepSize: number
  ySpread: number
  globalMinY: number
  pxValue: number
}) =>
  data.map((dataItem, index) => {
    return {
      x: paddingLeft * width + lineStepSize * index,
      y: (ySpread - (dataItem.y - globalMinY)) / pxValue,
    }
  })
