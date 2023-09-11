import React, { ReactNode, useState } from 'react'
import { FC } from 'react'
import { styled } from 'inlines'
import { ComponentDef, PropType } from './types'
import useLocalStorage from '@based/use-local-storage'
import {
  Text,
  border,
  color,
  Code,
  Button,
  IconChevronRightSmall,
  IconChevronDownSmall,
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
        <>
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
        </>
      ))
    }
    return <Text color="brand">{propType.type.value}</Text>
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
        key={key}
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
  const [state, setState] = useLocalStorage('c-' + component.name + '-' + index)
  const updateState = (fields: { [key: string]: any }) => {
    if (!objState.props) {
      objState.props = example.props
    }
    const x = deepCopy(objState)
    deepMerge(x, fields)
    setState(x)
  }

  let objState = state ?? {}
  const sProps = objState.props ?? example.props

  const parsedProps = parseProps(sProps)

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
        <styled.div>
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
          // border: '1px solid red',
        }}
      >
        <styled.div
          style={{
            // border: '1px solid yellow',
            maxWidth: '100%',
            padding: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // overflowX: 'hidden',
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
            borderTop: objState.expanded ? '1px solid transparent' : border(1),
          }}
        >
          <styled.div
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: color('background', 'brand', 'surface'),
              borderBottomRightRadius: objState.expanded ? 0 : 8,
              borderBottomLeftRadius: objState.expanded ? 0 : 8,
            }}
          >
            <Button
              size="xsmall"
              color="neutral"
              light
              onClick={() => updateState({ expanded: !objState.expanded })}
              style={{ margin: 4 }}
              icon={
                objState.expanded ? (
                  <IconChevronDownSmall />
                ) : (
                  <IconChevronRightSmall />
                )
              }
            >
              Editor
            </Button>
          </styled.div>
          {objState.expanded ? (
            <PropsEditor
              component={component}
              index={index}
              updateState={updateState}
              state={objState}
            />
          ) : // <Code
          //   value={toComponent(
          //     component.name,
          //     example.props,
          //     propsToCode(component.name, parsedProps).propsHeader
          //   )}
          // />
          null}
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
