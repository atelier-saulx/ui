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
import { styled, Text, Button, ButtonProps, ScrollArea, color, Style } from '~'

const Container = styled('div', {
  width: 632,
  maxHeight: 'calc(100vh - 30px)',
  maxWidth: 'calc(100vw - 30px)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
  backgroundColor: color('content', 'inverted', 'primary'),
})

const ScrollBody = styled('div', {
  paddingTop: '16px',
  paddingLeft: '32px',
  paddingRight: '32px',
  '--dialogPadding': `32px`,
  '@media only screen and (max-width: 680px)': {
    '--dialogPadding': `16px`,
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  paddingBottom: '0px',

  '&>:last-child': {
    paddingBottom: 'var(--dialogPadding) !important',
  },
})

const StyledButtons = styled('div', {
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  '@media only screen and (max-width: 680px)': {
    justifyContent: 'space-between',
  },
  paddingTop: 'var(--dialogPadding)',
  backgroundColor: color('content', 'inverted', 'primary'),
  paddingBottom: 'var(--dialogPadding)',
})

const ButtonsWithBorder = styled(StyledButtons, {
  borderTop: `1px solid ${color('border', 'default', 'strong')}`,
  marginTop: 48,
  paddingLeft: '32px',
  paddingRight: '32px',
  marginLeft: 'calc(-32px)',
  marginRight: 'calc(-39px)',
  '@media only screen and (max-width: 680px)': {
    paddingLeft: '16px',
    paddingRight: '16px',
    marginLeft: 'calc(-16px)',
    marginRight: 'calc(-16px)',
  },
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
})

const Body = ({ children }) => {
  if (typeof children === 'string') {
    return <div>{children}</div>
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          <Body key={index}>{child}</Body>
        ))}
      </>
    )
  } else {
    return <>{children}</>
  }
}

const Buttons = ({ children, border = null }) => {
  if (Array.isArray(children)) {
    children = children.map((child, index) => {
      return index ? <Fragment key={index}>{child}</Fragment> : child
    })
  }
  return border ? (
    <ButtonsWithBorder>{children}</ButtonsWithBorder>
  ) : (
    <StyledButtons>{children}</StyledButtons>
  )
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
      onClick={onClick}
      keyboardShortcut="Enter"
      displayShortcut
      style={{ marginLeft: 24 }}
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
      light
      keyboardShortcut="Esc"
      displayShortcut
      style={{
        borderColor: color('border', 'default', 'strong'),
        ...style,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export interface DialogProps extends ComponentProps<typeof Container> {
  children?: ReactNode
  label?: ReactNode
  description?: ReactNode
  pure?: boolean
  style?: Style
}

export const Dialog = Object.assign(
  forwardRef<ElementRef<typeof Container>, DialogProps>(
    ({ children, label, description, style, pure, ...props }, forwardedRef) => {
      if (typeof children === 'string') {
        if (!label) {
          label = children
          children = null
        } else {
          children = <Body>{children}</Body>
        }
      }

      const [go, setgo] = useState(false)
      useEffect(() => {
        const x = requestAnimationFrame(() => {
          setgo(true)
        })
        return () => {
          cancelAnimationFrame(x)
        }
      }, [])

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
            <styled.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '24px 32px 8px 32px',
                '@media only screen and (max-width: 680px)': {
                  padding: '24px 16px 8px 16px',
                },
              }}
            >
              <Text size={18} weight="strong">
                {label}
              </Text>
              {description && (
                <Text
                  weight="medium"
                  light
                  style={{
                    marginTop: 24,
                  }}
                >
                  {description}
                </Text>
              )}
            </styled.div>
          )}

          {pure ? (
            children
          ) : (
            <ScrollArea style={{ overflowY: go ? null : 'hidden' }}>
              <ScrollBody>{children}</ScrollBody>
            </ScrollArea>
          )}
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
