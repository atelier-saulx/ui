import React, { ReactNode, useState, useRef } from 'react'
import { FC } from 'react'
import { styled } from 'inlines'
import { ComponentDef, PropType } from './types'
import {
  Text,
  border,
  color,
  Code,
  Button,
  IconChevronRightSmall,
  IconChevronDownSmall,
  Divider,
} from '../src'
import { parseProps } from './parseProps'
import { deepCopy, deepMerge } from '@saulx/utils'
import { propsToCode, toComponent } from './objectToCode'
import { PropsEditor } from './PropsEditor'
import { BpTablet } from '../src/utils/breakpoints'

const displayType = (propType: PropType): string | number | ReactNode => {
  if (typeof propType.type === 'object') {
    if (Array.isArray(propType.type)) {
      return propType.type.map((type, i) => (
        <React.Fragment key={i}>
          {displayType({ type })}
          {/* @ts-ignore too stupid... */}
          {i !== propType.type.length - 1 ? (
            <Text
              light
              color="default"
              style={{ marginLeft: 4, marginRight: 4 }}
            >
              |
            </Text>
          ) : null}
        </React.Fragment>
      ))
    }
    return (
      <Text color="brand">
        {'value' in propType.type ? propType.type.value : null}
      </Text>
    )
  }
  if (propType.type === 'TSAnyKeyword') {
    propType.type = '*'
  }
  return (
    <Text light color="default" style={{ marginLeft: 4, marginRight: 4 }}>
      {propType.type}
    </Text>
  )
}

export const Props: FC<{ component: ComponentDef }> = ({ component }) => {
  const p: ReactNode[] = []
  for (const key in component.properties) {
    const prop = component.properties[key]
    p.push(
      <styled.div
        key={'__c' + key}
        style={{
          padding: 16,
          display: 'flex',
        }}
      >
        <Text size={12} style={{ minWidth: 200 }} weight="strong">
          {key}
        </Text>
        <styled.div
          size={12}
          style={{
            display: 'flex',
            flexGrow: 1,
            flexWrap: 'wrap',
            overflowWrap: 'anywhere',
          }}
        >
          {displayType(prop)}
        </styled.div>
        <Text
          size={12}
          color="default"
          light
          style={{
            minWidth: 150,
            [BpTablet]: {
              minWidth: 0,
            },
            justifyContent: 'flex-end',
          }}
          weight="strong"
        >
          {!prop.optional ? 'required' : '-'}
        </Text>
      </styled.div>
    )
  }

  return (
    <styled.div
      style={{
        marginTop: 48,
        marginBottom: 32,
        width: '100%',
      }}
    >
      <Text size={18} weight="strong">
        Props
      </Text>
      <styled.div
        style={{
          marginTop: 12,
          padding: 16,
          borderRadius: 8,
          display: 'flex',
          backgroundColor: color('background', 'neutral', 'surface'),
        }}
      >
        <Text size={12} style={{ minWidth: 200 }} weight="strong">
          Name
        </Text>
        <Text size={12} style={{ flexGrow: 1 }}>
          Type
        </Text>
      </styled.div>
      {p}
    </styled.div>
  )
}

const ComponentViewer: FC<{ component: ComponentDef; index: number }> = ({
  component,
  index,
}) => {
  const example = component.examples[index]
  const [, setState] = useState(1)

  const parsedState = useRef<any>(example)

  const updateState = (fields: { [key: string]: any }) => {
    parsedState.current = deepMerge(
      deepCopy(example),
      deepCopy(parsedState.current),
      fields
    )

    if (fields.props) {
      for (const key in fields.props) {
        if (fields.props[key] === undefined) {
          delete parsedState.current.props[key]
        }
      }
    }
    setState((v) => v + 1)
  }

  const sProps = parsedState.current.props
  const parsedProps = parseProps(deepCopy(sProps))

  return (
    <>
      {example.name ? (
        <Text
          style={{ marginTop: 32, marginBottom: example.description ? 0 : -12 }}
          size={18}
          weight="strong"
        >
          {example.name}
        </Text>
      ) : null}
      {example.description ? (
        <styled.div
          style={{
            marginTop: !example.name ? 24 : 0,
          }}
        >
          <Text size={12}>{example.description}</Text>
        </styled.div>
      ) : (
        ''
      )}
      <styled.div
        style={{
          marginTop: 24,
          flexGrow: 1,
          borderRadius: 8,
          flexDirection: 'column',
          display: 'flex',
          backgroundColor: color('background', 'neutral', 'surface'),
          alignItems: 'center',
          justifyContent: 'center',
          overflowX: 'visible',
        }}
      >
        <styled.div
          style={{
            maxWidth: '100%',
            minWidth: 300,
            padding: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.createElement(
            example.customRenderer ?? component.component,
            parsedProps
          )}
        </styled.div>
        <styled.div
          style={{
            width: '100%',
            transition: 'height 0.2s',
            borderTop: parsedState.current.expanded
              ? '1px solid transparent'
              : border(1),
          }}
        >
          <styled.div
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: color('background', 'brand', 'surface'),
              borderBottomRightRadius: parsedState.current.expanded ? 0 : 8,
              borderBottomLeftRadius: parsedState.current.expanded ? 0 : 8,
            }}
          >
            <Button
              size="xsmall"
              color="neutral"
              light
              onClick={() =>
                updateState({ expanded: !parsedState.current.expanded })
              }
              style={{ margin: 4 }}
              icon={
                parsedState.current.expanded ? (
                  <IconChevronDownSmall />
                ) : (
                  <IconChevronRightSmall />
                )
              }
            >
              Editor
            </Button>
          </styled.div>
          {parsedState.current.expanded ? (
            <styled.div>
              <Code
                copy
                value={toComponent(
                  component.name,
                  example.props,
                  propsToCode(component.name, parsedProps).propsHeader
                )}
              />
              <Divider />
              <PropsEditor
                parsedProps={parsedProps}
                component={component}
                index={index}
                updateState={updateState}
                state={parsedState.current}
              />
            </styled.div>
          ) : null}
        </styled.div>
      </styled.div>
    </>
  )
}

export const OverviewComponent: FC<{
  component: ComponentDef
}> = ({ component }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        borderRadius: 4,
        maxWidth: 1000,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size={18} weight="strong">
          {component.name}
        </Text>
      </styled.div>
      <styled.div>
        <Text size={12}>{component.description}</Text>
      </styled.div>
      <ComponentViewer index={0} component={component} />
      <Props component={component} />
      {component.examples.slice(1).map((_, index) => {
        return (
          <ComponentViewer
            key={index}
            index={index + 1}
            component={component}
          />
        )
      })}
    </styled.div>
  )
}
