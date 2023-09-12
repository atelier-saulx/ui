import React, { FC, ReactNode } from 'react'
import { ComponentDef, PropType } from './types'
import { styled } from 'inlines'
import { Input, Text, border, color } from '../src'
import { parseProps } from './parseProps'
import * as colors from '../src/vars'

const genColorGroupOptions = (colorGroup: string): any[] => {
  const p = colorGroup.replace(/Color(.*?)Colors/, '$1')
  const x = p[0].toLowerCase() + p.slice(1)
  const options: any[] = []
  const colorsOptions = colors.vars[x]

  if (colorsOptions) {
    const colorKeys = Object.keys(colorsOptions)
    for (const c of colorKeys) {
      if (c === '_') {
        continue
      }
      options.push({
        value: c,
        label: (
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <styled.div
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                border: border(1),
                marginRight: 8,
                backgroundColor: color(
                  // @ts-ignore
                  x,
                  c
                ),
              }}
            />
            <Text>{c}</Text>
          </styled.div>
        ),
      })
    }
  }
  return options
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

  if (name === 'color') {
    const options: any[] = [{ label: <Text light>No color</Text>, value: '' }]
    if (Array.isArray(prop.type)) {
      for (const colorGroup of prop.type) {
        if (typeof colorGroup === 'string') {
          options.push(...genColorGroupOptions(colorGroup))
        }
      }
    } else if (typeof prop.type === 'string') {
      options.push(...genColorGroupOptions(prop.type))
    }

    return (
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          paddingBottom: 16,
          marginBottom: 8,
          paddingTop: 8,
          paddingLeft: 16,
          borderBottom: border(1),
        }}
      >
        <Text style={{ width: 100 }} weight="strong">
          Color
        </Text>
        <Input
          placeholder={`Select ${name}`}
          value={parsedProps.color}
          style={{ marginLeft: 16, maxWidth: 400 }}
          type="select"
          options={options}
          onChange={(v) => {
            update(v)
          }}
        />
      </styled.div>
    )
  }

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
          paddingBottom: 16,
          marginBottom: 8,
          paddingTop: 8,
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
          paddingBottom: 16,
          paddingTop: 8,
          marginBottom: 8,
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
    if (prop.type !== 'boolean' && p !== 'color' && !/on[A-Z]+/.test(p)) {
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
    if (prop.type === 'boolean' && p !== 'color' && !/on[A-Z]+/.test(p)) {
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

  const hasColor = !!component.properties.color

  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
      }}
    >
      {hasColor ? (
        <styled.div
          style={{
            display: 'flex',
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <Prop
            example={example}
            update={(value) => {
              updateState({ props: { color: value } })
            }}
            state={state}
            name={'color'}
            prop={component.properties.color}
          />
        </styled.div>
      ) : null}

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
