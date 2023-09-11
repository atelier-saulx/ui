import React, { FC, ReactNode } from 'react'
import { ComponentDef, PropType } from './types'
import { styled } from 'inlines'
import { Input, Text } from '../src'
import { parseProps } from './parseProps'

const Prop: FC<{
  name: string
  prop: PropType
  example: any
  state: any
  update: (value: any) => void
}> = ({ name, prop, state, update, example }) => {
  let objState = state ?? {}
  const sProps = objState.props ?? example.props
  const parsedProps = parseProps(sProps)

  if (Array.isArray(prop.type)) {
    const options = []
    // will do with select
    return <styled.div>{/* <Text>{name}</Text> */}</styled.div>
  }

  if (name === 'children' || prop.type === 'string' || prop.type === 'number') {
    return (
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginLeft: 16,
        }}
      >
        <Text weight="strong">{name}</Text>
        <Input
          value={parsedProps[name]}
          style={{ marginLeft: 16, maxWidth: 400 }}
          type={prop.type === 'number' ? 'number' : 'text'}
          onChange={(v) => {
            update(v.target.value)
          }}
        />
      </styled.div>
    )
  }

  if (prop.type === 'boolean') {
    return (
      <Input
        type="checkbox"
        style={{
          margin: 16,
        }}
        title={name}
        value={parsedProps?.[name]}
        onChange={update}
      />
    )
  }

  return null
}

export const PropsEditor: FC<{
  component: ComponentDef
  state: any
  index: number
  updateState: (fields: { [key: string]: any }) => void
}> = ({ component, state, index, updateState }) => {
  const example = component.examples[index]
  const propsFromExample = example.props
  const parsedProps: ReactNode[] = []

  for (const p in component.properties) {
    parsedProps.push(
      <Prop
        example={example}
        update={(value) => {
          updateState({ props: { [p]: value } })
        }}
        state={state}
        name={p}
        key={p}
        prop={component.properties[p]}
      />
    )
  }

  return (
    <styled.div
      style={{
        padding: 12,
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {parsedProps}
    </styled.div>
  )
}
