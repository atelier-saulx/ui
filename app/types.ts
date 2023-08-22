import { ReactNode, Component, FC } from 'react'

export type PropType = string | { value: string | number }

export type ComponentDef = {
  name: string
  properties: {
    [key: string]: {
      optional?: boolean
      type: PropType | PropType[]
    }
  }
  component: FC<any>
  examples: { [key: string]: any }[]
}
