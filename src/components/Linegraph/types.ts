import { DateFormat } from '@based/pretty-date'
import { NumberFormat } from '@based/pretty-number'
import { ColorActionColors } from '../../varsTypes'

export type Point = { x: number; y: number }

export type LineDataInput = {
  data: Point[]
  fill?: boolean
  color?: ColorActionColors
  valueFormat?: NumberFormat
  minMax?: boolean
}
export type LineData = LineDataInput & {
  points?: Point[]
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
  stepSize?: number
  maxData?: Point[]
  maxPoints?: Point[]
  minData?: Point[]
  minPoints?: Point[]
  label?: string
}

export type LineGraphData = {
  [key: string]: LineData
}

export type LineGraphDataInput =
  | Point[]
  | { [key: string]: LineDataInput | Point[] }

export type LineXGraphFormat =
  | 'date'
  | 'number'
  | 'date-time-human'
  | NumberFormat
  | DateFormat
  | false
  | null
