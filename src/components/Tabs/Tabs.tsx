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

export type TabsProps = {
  children: ReactNode
  style?: Style
  activeTab?: number
  setActiveTab?: (index: number) => void
  sameHeight?: boolean
  borderColor?: 'primary' | 'neutral'
}

const TabWrapper: FC<{
  children: ReactNode | ReactNode[] | ReactElement | Symbol | Object | any
  activeTabState: number
  index: number
  setActiveTabInternal: Dispatch<SetStateAction<number>>
  setHoverTab: Dispatch<SetStateAction<number>>
  borderColor?: 'primary' | 'neutral'
}> = ({
  children,
  index,
  activeTabState,
  setHoverTab,
  setActiveTabInternal,
  borderColor = 'primary',
}) => {
  const icon = children?.props?.icon

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
          index === activeTabState
            ? `3px solid ${genColor('action', borderColor, 'normal')}`
            : '3px solid transparent',
        '&:hover': {
          borderBottom:
            index !== activeTabState &&
            `3px solid ${genColor('action', 'neutral', 'subtleHover')}`,
        },
        [BpTablet]: {
          '&:hover': {
            borderBottom:
              index === activeTabState
                ? `3px solid ${genColor('action', 'primary', 'normal')}`
                : '3px solid transparent',
          },
        },
        '&:active': {
          borderBottom:
            index !== activeTabState &&
            `3px solid ${genColor('action', 'neutral', 'subtleActive')}`,
        },
      }}
      onClick={() => {
        setHoverTab(-1)
        setActiveTabInternal(index)
      }}
      onMouseEnter={useCallback(() => {
        setHoverTab(index)
      }, [])}
      onMouseLeave={useCallback(() => {
        setHoverTab(-1)
      }, [])}
      key={index}
    >
      {icon && (
        <styled.div
          style={{
            marginRight: 10,
            '& svg': {
              fill: 'currentColor',
            },
          }}
        >
          {icon}
        </styled.div>
      )}

      {typeof children === 'string' ? (
        <Text
          selectable="none"
          weight={index === activeTabState ? 'strong' : 'medium'}
        >
          {children}
        </Text>
      ) : (
        <Text
          size={16}
          selectable="none"
          weight={index === activeTabState ? 'strong' : 'medium'}
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
  activeTab = 0,
  setActiveTab,
  sameHeight,
  borderColor = 'primary',
  ...props
}) => {
  const arrayChildren: Object[] = React.Children.toArray(children)
  let activeTabState: number = activeTab
  let setActiveTabInternal = setActiveTab
  if (!setActiveTab) {
    ;[activeTabState, setActiveTabInternal] = useState(activeTab)
  } else {
    useState(null)
  }
  const [hoverTab, setHoverTab] = useState(-1)
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
              activeTabState={activeTabState}
              setHoverTab={setHoverTab}
              setActiveTabInternal={setActiveTabInternal as any}
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
        {children?.[activeTabState]}
      </styled.div>
    </>
  )
}
