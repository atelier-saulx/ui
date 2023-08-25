import React, {
  forwardRef,
  ElementRef,
  FC,
  ComponentProps,
  ReactNode,
  Fragment,
  useRef,
  useState,
  useEffect,
} from 'react'
import { useDialog } from './useDialog'

import {
  ButtonProps,
  Button,
  styled,
  Style,
  Text,
  ScrollArea,
  color,
  renderOrCreateElement,
} from '../..'

const Container = styled('div', {
  width: 632,
  maxHeight: 'calc(100vh - 30px)',
  maxWidth: 'calc(100vw - 30px)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
  backgroundColor: color('background', 'default', 'surface'),
})

const StyledButtons = styled('div', {
  borderTop: `1px solid ${color('border', 'default', 'strong')}`,
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  padding: 24,
  justifyContent: 'flex-end',
  '@media only screen and (max-width: 680px)': {
    justifyContent: 'space-between',
  },
  backgroundColor: color('background', 'default', 'surface'),
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
})

const Body = ({ children }) => {
  if (typeof children === 'string') {
    return <div>{children}</div>
  } else if (Array.isArray(children)) {
    return (
      <ScrollArea style={{ overflowY: 'hidden', padding: '24px 32px' }}>
        {children.map((child, index) => (
          <styled.div key={index} style={{ marginBottom: 16 }}>
            {child}
          </styled.div>
        ))}
      </ScrollArea>
    )
  } else {
    return <>{children}</>
  }
}

const Buttons = ({ children }) => {
  if (Array.isArray(children)) {
    children = children.map((child, index) => {
      return index ? (
        <styled.div style={{ marginLeft: 24 }} key={index}>
          {child}
        </styled.div>
      ) : (
        child
      )
    })
  }
  return <StyledButtons>{children}</StyledButtons>
}

const Confirm: FC<
  Omit<ButtonProps, 'onClick'> & {
    onConfirm?: ((val?: any) => Promise<void>) | ((val?: any) => void)
  }
> = ({ children = 'OK', onConfirm, ...props }) => {
  const dialog = useDialog()

  const { current: myId } = useRef(dialog._id)

  const onClick = onConfirm
    ? async () => {
        if (!props.disabled && myId === dialog._id) {
          await onConfirm()
          dialog.close(myId)
        }
      }
    : () => {
        if (!props.disabled && myId === dialog._id) {
          dialog.close(myId)
        }
      }

  return (
    <Button
      //   onClick={onClick}
      //   keyboardShortcut="Enter"
      //   displayShortcut
      {...props}
    >
      {children}
    </Button>
  )
}

const Cancel: FC<
  Omit<ButtonProps, 'onClick'> & {
    onCancel?: (() => Promise<void>) | (() => void)
  }
> = ({ children = `Cancel`, onCancel = null, style = null, ...props }) => {
  const dialog = useDialog()
  const { current: myId } = useRef(dialog._id)

  const onClick = onCancel
    ? async () => {
        if (!props.disabled && myId === dialog._id) {
          await onCancel()
          dialog.close(myId)
        }
      }
    : () => {
        if (!props.disabled && myId === dialog._id) {
          dialog.close(myId)
        }
      }

  return (
    <Button
      onClick={onClick}
      //   keyboardShortcut="Esc"
      //   displayShortcut
      color="system"
      style={{
        ...style,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export type DialogProps = {
  children?: ReactNode
  label?: string
  description?: ReactNode
  style?: Style
}

export const Dialog = Object.assign(
  forwardRef<ElementRef<typeof Container>, DialogProps>(
    ({ children, label, description, style, ...props }, forwardedRef) => {
      const [go, setgo] = useState(false)
      useEffect(() => {
        const x = requestAnimationFrame(() => {
          setgo(true)
        })
        return () => {
          cancelAnimationFrame(x)
        }
      }, [])

      console.log(children)

      return (
        <Container
          style={{
            transition: 'transform 0.15s, opacity 0.15s',
            opacity: go ? 1 : 0,
            transform: go ? 'scale(1)' : 'scale(0.9)',
            ...style,
          }}
          ref={forwardedRef}
          {...props}
        >
          {label && (
            <Text
              size={18}
              weight="strong"
              style={{ marginTop: 24, marginLeft: 32, marginRight: 32 }}
            >
              {label}
            </Text>
          )}
          {description && (
            <Text
              size={14}
              weight="medium"
              style={{
                marginTop: 16,
                marginLeft: 32,
                marginRight: 32,
                color: color('content', 'default', 'secondary'),
              }}
            >
              {description}
            </Text>
          )}

          {children}
        </Container>
      )
    }
  ),
  {
    Body,
    Buttons,
    Confirm,
    Cancel,
  }
)
