/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react'
import { SelectPill, SelectPillProps } from './Select'

import { styled, Style } from 'inlines'
import { BooleanPill, BooleanPillProps } from './Boolean'

export type CommonInputProps = {
  prefix?: string
  style?: Style
  onChange: (value) => void
}

export type InputProps =
  | (CommonInputProps & { type: 'select' } & SelectPillProps)
  | ({ type: 'boolean' } & BooleanPillProps)
  | ({ type: 'multi' } & SelectPillProps)

export function Pill(props: InputProps) {
  switch (props.type) {
    case 'select': {
      const { type, ...narrowedProps } = props
      return <SelectPill {...narrowedProps} />
    }
    case 'boolean': {
      const { type, ...narrowedProps } = props
      return <BooleanPill {...narrowedProps} />
    }
    // case 'multi': {
    //   const { type, ...narrowedProps } = props
    //   return (

    //       <MultiPill {...narrowedProps} />

    //   )
    // }

    default:
      //@ts-ignore
      expectNever(props)
  }
}

const expectNever = (value: never): never => {
  throw new TypeError('Unexpected value: ' + JSON.stringify(value))
}
