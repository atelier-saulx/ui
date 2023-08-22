import React, { ReactNode } from 'react'
import { FC } from 'react'
import { styled } from 'inlines'
import { ComponentDef, PropType } from './types'
import useLocalStorage from '@based/use-local-storage'
import {
  Text,
  border,
  color,
  Code,
  IconArrowUpRight,
  IconArrowDownLeft,
  Menu,
  IconArrowDown,
  Button,
  IconChevronDown,
  IconChevronRight,
  IconChevronRightSmall,
  IconChevronDownSmall,
} from '../src'
import { parseProps } from './parseProps'
import { deepCopy, deepMerge } from '@saulx/utils'
import { propsToCode, toComponent } from './objectToCode'

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

  return propType.type
}

export const Props: FC<{ component: ComponentDef }> = ({ component }) => {
  const p: ReactNode[] = []
  for (const key in component.properties) {
    const prop = component.properties[key]
    p.push(
      <styled.div
        style={{
          padding: 16,
          display: 'flex',
        }}
      >
        <Text size={12} style={{ minWidth: 200 }} weight="strong">
          {key}
        </Text>
        <Text size={12} style={{ flexGrow: 1 }}>
          {displayType(prop)}
        </Text>
        <Text
          size={12}
          color="default"
          light
          style={{ minWidth: 150, justifyContent: 'flex-end' }}
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

  let objState = state ?? {}
  const parsedProps = parseProps(example.props)

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
          backgroundColor: color('background', 'neutral', 'surface'), // add extra bg color...
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <styled.div
          style={{
            padding: 32,
          }}
        >
          {React.createElement(component.component, parsedProps)}
        </styled.div>
        <styled.div
          style={{
            // padding: 4,

            width: '100%',
            transition: 'height 0.2s',
            borderTop: objState.expanded ? '1px solid transparent' : border(1),
          }}
        >
          <styled.div
            style={{
              width: '100%',
              backgroundColor: color('background', 'brand', 'surface'),
              borderBottomRightRadius: objState.expanded ? 0 : 8,
              borderBottomLeftRadius: objState.expanded ? 0 : 8,
            }}
          >
            <Button
              onClick={() => {
                console.info('xxx')
                const x = deepCopy(objState)
                deepMerge(x, { expanded: !objState.expanded })
                setState(x)
              }}
              style={{ margin: 4 }}
              color="system"
              icon={
                objState.expanded ? (
                  <IconChevronDownSmall />
                ) : (
                  <IconChevronRightSmall />
                )
              }
            >
              Code editor
            </Button>
          </styled.div>
          {objState.expanded ? (
            <Code
              value={toComponent(
                component.name,
                example.props,
                propsToCode(component.name, parsedProps).propsHeader
              )}
            />
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
        return <ComponentViewer index={index + 1} component={component} />
      })}
    </styled.div>
  )
}
