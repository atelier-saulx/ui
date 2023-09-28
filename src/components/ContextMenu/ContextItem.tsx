import React, {
  ReactNode,
  FunctionComponent,
  FC,
  useState,
  SyntheticEvent,
} from 'react'
import { removeOverlay, Text } from '../../components'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'
import { renderOrCreateElement } from '../../utils/renderOrCreateElement'
import { IconWarning, IconAlarmClock } from '../../icons'

const StyledContextItem = styled('div', {
  display: 'flex',
  height: '32px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
  '&:active': {
    backgroundColor: color('background', 'default', 'surface'),
  },
  '&:focus': {
    backgroundColor: color('background', 'default', 'surface'),
  },
})

export type ContextItemProps = {
  style?: Style
  color?: any
  // color?: Color
  onClick?: PropsEventHandler
  icon?: FunctionComponent<any> | ReactNode
  iconRight?: FunctionComponent<any> | ReactNode
  inset?: boolean
  noFocus?: boolean
  tabIndex?: number
  children?: ReactNode
}

type PropsEventHandler<E = SyntheticEvent, P = any> = (
  e?: E,
  props?: P
) => void | Promise<void> | boolean | Promise<boolean>

export const ContextDivider = styled('div', {
  marginTop: 4,
  borderTop: `1px solid ${color('border', 'default', 'strong')}`,
  marginBottom: 4,
})

export const ContextItem: FC<ContextItemProps> = ({
  onClick,
  style,
  color: colorProps,
  children,
  icon,
  inset,
  tabIndex = 0,
  noFocus,
  iconRight,
}) => {
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState(false)

  if (onClick) {
    const onClickOriginal = onClick
    // @ts-ignore - this is a hack to make the onClick work, async is very important
    onClick = async (e) => {
      setErrored(false)
      // @ts-ignore
      e.preventDefault()
      // @ts-ignore
      e.stopPropagation()
      setLoading(true)
      try {
        if (!(await onClickOriginal(e))) {
          removeOverlay()
        }
      } catch (err) {
        console.error(err)
        setErrored(true)
      }
      setLoading(false)
    }
  }

  let child: ReactNode

  if (icon) {
    child = (
      <Text
        color={colorProps}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {renderOrCreateElement(
          errored && icon ? (
            <IconWarning color="negative" />
          ) : loading && icon ? (
            <IconAlarmClock />
          ) : (
            icon
          ),
          {
            size: 16,
            style: { marginRight: 8 },
          }
        )}
        {children}
      </Text>
    )
  } else {
    child = (
      <Text color={colorProps} style={inset ? { paddingLeft: 24 } : undefined}>
        {loading && !icon ? 'processing...' : children}
      </Text>
    )
  }

  if (noFocus) {
    return (
      <StyledContextItem onClick={onClick} style={style}>
        {child}
        {renderOrCreateElement(icon, {
          size: 16,
          style: { marginLeft: 8 },
        })}
      </StyledContextItem>
    )
  }

  return (
    <StyledContextItem
      data-aviato-context-item
      tabIndex={tabIndex}
      onMouseEnter={({ currentTarget }) => currentTarget.focus()}
      onMouseLeave={({ currentTarget }) => currentTarget.blur()}
      onClick={onClick}
      style={style}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter') {
                if (onClick) {
                  onClick(e)
                }
              }
            }
          : null
      }
    >
      {child}
      {renderOrCreateElement(iconRight, {
        size: 16,
        style: { marginLeft: 8 },
      })}
    </StyledContextItem>
  )
}
