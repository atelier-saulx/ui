import React, { FC, ReactNode } from 'react'
import { ComponentDef, PropType } from './types'
import { styled } from 'inlines'
import { Text } from '../src'

const Prop: FC<{
  name: string
  prop: PropType
  state: any
}> = ({ name, prop, state }) => {
  if (Array.isArray(prop.type)) {
    //options
    const options = []

    console.info(name, state)

    return <styled.div>: {state[name]}</styled.div>
  }

  return <styled.div>This is a prop</styled.div>
}

export const PropsEditor: FC<{
  component: ComponentDef
  state: any
  index: number
  updateState: (fields: { [key: string]: any }) => void
}> = ({ component, state, index, updateState }) => {
  console.info(component)
  const example = component.examples[index]
  const propsFromExample = example.props

  // color exclude

  const parsedProps: ReactNode[] = []

  for (const p in component.properties) {
    parsedProps.push(
      <Prop state={state} name={p} key={p} prop={component.properties[p]} />
    )
  }

  return (
    <styled.div
      style={{
        padding: 12,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      {parsedProps}
    </styled.div>
  )
}
