import React, { FC, ReactNode } from 'react'
import { ComponentDef, PropType } from './types'
import { styled } from 'inlines'
import { Input, Text, border, color, ScrollArea, Popover } from '../src'
import { parseProps } from './parseProps'
import * as colors from '../src/vars'
import * as ui from '../src'
import { AllIcons } from './components/Icon'

const IconsWrapped: FC<{ onSelect: any }> = ({ onSelect }) => {
  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        height: '90vh',
        overflowX: 'hidden',
      }}
    >
      <AllIcons onSelect={onSelect} />
    </ScrollArea>
  )
}

const Icons: FC<{
  update: (value: any) => void
  value?: FC
  name?: string
}> = ({ update, value, name }) => {
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
        {name}
      </Text>
      <Popover.Trigger>
        <styled.div
          // onClick={onClick}
          style={{
            cursor: 'pointer',
            '&:hover': {
              border: border(1, 'brand'),
            },
            marginLeft: 16,
            padding: 16,
            border: border(1),
            borderRadius: 8,
          }}
        >
          {value ?? <ui.IconPlaceholder style={{ opacity: 0.1 }} />}
        </styled.div>
      </Popover.Trigger>
      <Popover.Content
        forceMount
        side="right"
        sticky="partial"
        style={{
          width: 300,
          padding: 0,
          // backgroundColor: 'transparent',
          marginTop: '5vh',
          marginBottom: '5vh',
        }}
      >
        {/*@ts-ignore*/}
        {({ close }) => (
          <IconsWrapped
            onSelect={(icon) => {
              close()
              update(() => React.createElement(ui[icon]))
            }}
          />
        )}
      </Popover.Content>
    </styled.div>
  )
}

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
  parsedProps: any
  update: (value: any) => void
}> = ({ name, prop, parsedProps, update, example }) => {
  if (
    (name.includes('icon') || name.includes('Icon')) &&
    prop.type === 'ReactNode'
  ) {
    return <Icons update={update} value={parsedProps[name]} name={name} />
  }

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
            if (v === '') {
              update(undefined)
            } else {
              update(v)
            }
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

  if (
    name === 'children' ||
    prop.type === 'string' ||
    prop.type === 'number' ||
    prop.type === 'ReactNode'
  ) {
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
  parsedProps: any
  index: number
  updateState: (fields: { [key: string]: any }) => void
}> = ({ parsedProps, component, state, index, updateState }) => {
  const example = component.examples[index]
  const parsedPropsDef: ReactNode[] = []
  const parsedPropsBoolean: ReactNode[] = []
  const pasedPropsEvents: ReactNode[] = []

  for (const p in component.properties) {
    const prop = component.properties[p]
    if (prop.type !== 'boolean' && p !== 'color' && !/on[A-Z]+/.test(p)) {
      parsedPropsDef.push(
        <Prop
          parsedProps={parsedProps}
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
          parsedProps={parsedProps}
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
          parsedProps={parsedProps}
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
    <Popover.Root>
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
              parsedProps={parsedProps}
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
          {parsedPropsDef}
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
    </Popover.Root>
  )
}
