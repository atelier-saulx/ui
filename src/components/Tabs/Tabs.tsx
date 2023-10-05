import React, {
  FC,
  ReactNode,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  ReactElement,
} from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { BpTablet } from '../../utils/'
import { usePropState } from 'src/hooks'

export type TabsProps = {
  children: ReactNode
  style?: Style
  active?: number
  setActiveTab?: (index: number) => void
  sameHeight?: boolean
  borderColor?: 'primary' | 'neutral'
}

const TabWrapper: FC<{
  children: ReactNode | ReactNode[] | ReactElement | Symbol | Object | any
  activeTab: number
  index: number
  setActiveTab: Dispatch<SetStateAction<number>>
  borderColor?: 'primary' | 'neutral'
}> = ({
  children,
  index,
  activeTab,
  setActiveTab,
  borderColor = 'primary',
}) => {
  const icon = children?.props?.icon
  //TODO WHY IS THIS A STRING??
  console.log(index, activeTab)
  return (
    <styled.div
      style={{
        borderTop: '1px solid transparent',
        height: '28px',
        padding: '12px 12px 14px 12px',
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        borderBottom:
          index === parseInt(activeTab)
            ? `3px solid ${genColor('action', borderColor, 'normal')}`
            : '3px solid transparent',
        '&:hover': {
          borderBottom:
            index !== parseInt(activeTab) &&
            `3px solid ${genColor('action', 'neutral', 'subtleHover')}`,
        },
        [BpTablet]: {
          '&:hover': {
            borderBottom:
              index === parseInt(activeTab)
                ? `3px solid ${genColor('action', 'primary', 'normal')}`
                : '3px solid transparent',
          },
        },
        '&:active': {
          borderBottom:
            index !== parseInt(activeTab) &&
            `3px solid ${genColor('action', 'neutral', 'subtleActive')}`,
        },
      }}
      onClick={() => {
        setActiveTab(index)
      }}
      key={index}
    >
      {icon && (
        <styled.div
          style={{
            marginRight: 10,
          }}
        >
          {icon}
        </styled.div>
      )}

      {typeof children === 'string' ? (
        <Text
          selectable="none"
          weight={index === activeTab ? 'strong' : 'medium'}
        >
          {children}
        </Text>
      ) : (
        <Text
          size={16}
          selectable="none"
          weight={index === activeTab ? 'strong' : 'medium'}
        >
          {children.props.label}
        </Text>
      )}
    </styled.div>
  )
}

export const Tabs: FC<TabsProps> = ({
  children,
  style,
  active = 0,
  sameHeight,
  borderColor = 'primary',
  ...props
}) => {
  const arrayChildren: Object[] = React.Children.toArray(children)
  // this is weird
  console.log(arrayChildren)
  const [activeTab, setActiveTab] = usePropState(active)
  const elem = useRef<HTMLElement>(null)

  const tabRef = useRef<HTMLDivElement>(null)
  const tabRefHeight = tabRef.current?.clientHeight

  return (
    <>
      <styled.div
        style={{
          borderBottom: `3px solid tranparent`,
          position: 'relative',

          ...style,
        }}
        {...props}
      >
        <styled.div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 16,
          }}
          ref={elem}
        >
          {arrayChildren.map((child, index) => (
            <TabWrapper
              borderColor={borderColor}
              key={index}
              index={index}
              activeTab={activeTab}
              setActiveTab={setActiveTab as any}
            >
              {child}
            </TabWrapper>
          ))}
        </styled.div>
      </styled.div>

      <styled.div
        ref={tabRef}
        style={{
          flex: 1,
          height: sameHeight ? tabRefHeight : null,
          display: 'flex',
        }}
      >
        {children?.[activeTab]}
      </styled.div>
    </>
  )
}
