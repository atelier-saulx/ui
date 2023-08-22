import { FC } from 'react'

type PropTypeAtomic = string | { value: string | number }

export type PropType = {
  optional?: boolean
  type: PropTypeAtomic | PropTypeAtomic[]
}

export type ComponentDef = {
  name: string
  properties: {
    [key: string]: PropType
  }
  description: string
  component: FC<any>
  examples: { name?: string; customRenderer?: FC<any>; [key: string]: any }[]
}
