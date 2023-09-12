import { FC } from 'react'

type PropTypeAtomic =
  | string
  | { value: string | number }
  | { array: PropTypeAtomic }

export type PropType = {
  optional?: boolean
  type: PropTypeAtomic | PropTypeAtomic[]
}

export type Example = {
  description?: string
  name?: string
  customRenderer?: FC<any>
  props: {
    [key: string]: any
  }
}

export type ComponentDef = {
  name: string
  properties: {
    [key: string]: PropType
  }
  description: string
  component: FC<any>
  examples: Example[]
}
