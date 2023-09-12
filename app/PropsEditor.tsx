import React, { FC, ReactNode } from 'react'
import { ComponentDef, PropType } from './types'
import { styled } from 'inlines'
import { Input, Text, border, SelectInputOption } from '../src'
import { parseProps } from './parseProps'

const TypeSwitcher: FC<{
  value: any
  updateValue: (val: any) => void
  type: any
}> = ({ type, updateValue, value }) => {
  if (type === 'string') {
    return (
      <Input
        type="text"
        value={value}
        onChange={(v) => {
          updateValue(v)
        }}
        label={type}
      />
    )
  } else if (type === 'number') {
    return (
      <Input
        type="number"
        value={value}
        onChange={(v) => {
          updateValue(v)
        }}
        label={type}
      />
    )
  } else if (type === 'boolean') {
    return (
      <Input
        type="checkbox"
        value={value}
        onChange={(v) => {
          updateValue(v)
        }}
      />
    )
  }
}

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

  // FIX SELECT
  if (Array.isArray(prop.type)) {
    let typeSwitcher = false

    const options: any[] = [{ label: <Text light>No value</Text>, value: '' }]

    for (const value of prop.type) {
      if (typeof value === 'object' && 'value' in value) {
        options.push(value.value)
      } else {
        typeSwitcher = true
        options.push(value)
      }
    }

    // will do with select
    return (
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          paddingBottom: 16,
          paddingTop: 16,
          paddingLeft: 16,
          borderBottom: border(1),
        }}
      >
        <Text style={{ width: 100 }} weight="strong">
          {name}
        </Text>
        <Input
          placeholder={`Select ${name}`}
          value={
            typeSwitcher && parsedProps[name]
              ? typeof parsedProps[name]
              : parsedProps[name] ?? ''
          }
          style={{ marginLeft: 16, maxWidth: 400 }}
          type="select"
          options={options}
          onChange={(v) => {
            if (typeSwitcher) {
              if (v === 'string') {
                update('Random text')
                return
              }

              if (v === 'boolean') {
                update(true)
                return
              }

              if (v === 'number') {
                update(Math.floor(Math.random() * 100))
                return
              }
            }

            update(v)
          }}
        />
      </styled.div>
    )
  }

  if (name === 'children' || prop.type === 'string' || prop.type === 'number') {
    return (
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          paddingBottom: 16,
          paddingTop: 16,
          paddingLeft: 16,
          borderBottom: border(1),
        }}
      >
        <Text style={{ width: 100 }} weight="strong">
          {name}
        </Text>
        <Input
          value={parsedProps[name]}
          style={{ marginLeft: 16, maxWidth: 400 }}
          type={prop.type === 'number' ? 'number' : 'text'}
          onChange={(v) => {
            update(v)
          }}
        />
      </styled.div>
    )
  }

  if (/on[A-Z]+/.test(name)) {
    return (
      <Input
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 8,
          marginBottom: 8,
        }}
        type="checkbox"
        title={name}
        value={!!parsedProps?.[name]}
        onChange={(v) => {
          update(
            !v
              ? null
              : example.props[name] ??
                  (() => {
                    console.info(name, 'fired!')
                  })
          )
        }}
      />
    )
  }

  if (prop.type === 'boolean') {
    return (
      <Input
        type="checkbox"
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 8,
          marginBottom: 8,
        }}
        title={name}
        value={!!parsedProps?.[name]}
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
  const parsedProps: ReactNode[] = []
  const parsedPropsBoolean: ReactNode[] = []
  const pasedPropsEvents: ReactNode[] = []

  for (const p in component.properties) {
    const prop = component.properties[p]
    if (prop.type !== 'boolean' && !/on[A-Z]+/.test(p)) {
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
  }

  for (const p in component.properties) {
    const prop = component.properties[p]
    if (prop.type === 'boolean' && !/on[A-Z]+/.test(p)) {
      parsedPropsBoolean.push(
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
  }

  for (const p in component.properties) {
    if (/on[A-Z]+/.test(p)) {
      pasedPropsEvents.push(
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
  }

  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
      }}
    >
      <styled.div style={{ display: 'flex', flexDirection: 'column' }}>
        {parsedProps}
      </styled.div>

      <styled.div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          paddingTop: 8,
          paddingBottom: 8,
          borderBottom: parsedPropsBoolean.length ? border(1) : null,
        }}
      >
        {parsedPropsBoolean}
      </styled.div>

      <styled.div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        {pasedPropsEvents}
      </styled.div>
    </styled.div>
  )
}
